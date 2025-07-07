/**
 * @swagger
 * components:
 *   schemas:
 *     Evento:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         nome:
 *           type: string
 *         descricao:
 *           type: string
 *         data_inicio:
 *           type: string
 *           format: date-time
 *         data_fim:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *         url_externa:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         fk_local_id:
 *           type: string
 *           format: uuid
 *         local:
 *           $ref: '#/components/schemas/Local'
 * 
 *     NovoEvento:
 *       type: object
 *       required:
 *         - nome
 *         - status
 *       properties:
 *         nome:
 *           type: string
 *           maxLength: 150
 *         descricao:
 *           type: string
 *         data_inicio:
 *           type: string
 *           format: date-time
 *         data_fim:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *           maxLength: 20
 *         url_externa:
 *           type: string
 *           maxLength: 255
 *         fk_local_id:
 *           type: string
 *           format: uuid
 * 
 *     EventoCriado:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         evento:
 *           $ref: '#/components/schemas/Evento'
 * 
 *     EventoAtualizado:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         evento:
 *           $ref: '#/components/schemas/Evento'
 * 
 *     Erro:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 * 
 *     ErroDetalhado:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *         details:
 *           type: string
 */

import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export const buscarEventos = async (req, res) => {
  const { nome, status, local_id, data_inicio, data_fim } = req.query;

  try {
    // Construir objeto de filtro
    const where = {};

    if (nome) where.nome = { contains: nome, mode: "insensitive" };
    if (status) where.status = { equals: status, mode: "insensitive" };
    if (local_id) where.fk_local_id = local_id;

    // Filtros de data
    if (data_inicio || data_fim) {
      where.data_inicio = {};
      if (data_inicio) {
        where.data_inicio.gte = new Date(data_inicio);
      }
      if (data_fim) {
        where.data_inicio.lte = new Date(data_fim);
      }
    }

    // Busca no banco de dados
    const eventos = await prisma.evento.findMany({
      where,
      include: {
        local: {
          select: {
            id: true,
            nome: true,
            cidade: true,
            estado: true,
            endereco: true
          }
        }
      },
      orderBy: {
        data_inicio: 'asc'
      }
    });

    res.status(200).json(eventos);
  } catch (error) {
    console.error("Erro na busca de eventos:", error);
    res.status(500).json({ error: "Erro ao buscar eventos" });
  } finally {
    await prisma.$disconnect();
  }
};

export const buscarEventoPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const evento = await prisma.evento.findUnique({
      where: { id },
      include: {
        local: {
          select: {
            id: true,
            nome: true,
            cidade: true,
            estado: true,
            endereco: true,
            latitude: true,
            longitude: true
          }
        }
      }
    });

    if (!evento) {
      return res.status(404).json({ error: "Evento não encontrado" });
    }

    res.status(200).json(evento);
  } catch (error) {
    console.error("Erro ao buscar evento:", error);
    res.status(500).json({ error: "Erro ao buscar evento" });
  } finally {
    await prisma.$disconnect();
  }
};

export const createEvento = async (req, res) => {
  try {
    const {
      nome,
      descricao,
      data_inicio,
      data_fim,
      status,
      url_externa,
      fk_local_id
    } = req.body;

    // Validações básicas
    if (!nome || !status) {
      return res.status(400).json({
        error: "Nome e status são obrigatórios"
      });
    }

    // Validar se o local existe (se fornecido)
    if (fk_local_id) {
      const localExiste = await prisma.local.findUnique({
        where: { id: fk_local_id }
      });

      if (!localExiste) {
        return res.status(400).json({
          error: "Local não encontrado"
        });
      }
    }

    // Validar datas (se fornecidas)
    if (data_inicio && data_fim) {
      const inicio = new Date(data_inicio);
      const fim = new Date(data_fim);

      if (inicio >= fim) {
        return res.status(400).json({
          error: "Data de início deve ser anterior à data de fim"
        });
      }
    }

    const novoEvento = await prisma.evento.create({
      data: {
        id: uuidv4(),
        nome,
        descricao,
        data_inicio: data_inicio ? new Date(data_inicio) : null,
        data_fim: data_fim ? new Date(data_fim) : null,
        status,
        url_externa,
        fk_local_id
      },
      include: {
        local: {
          select: {
            id: true,
            nome: true,
            cidade: true,
            estado: true
          }
        }
      }
    });

    return res.status(201).json({
      message: "Evento criado com sucesso",
      evento: novoEvento
    });
  } catch (error) {
    console.error("Erro ao criar evento:", error);
    return res.status(500).json({
      error: "Erro interno ao criar evento",
      details: error.message
    });
  } finally {
    await prisma.$disconnect();
  }
};

export const atualizarEvento = async (req, res) => {
  const { id } = req.params;

  try {
    const {
      nome,
      descricao,
      data_inicio,
      data_fim,
      status,
      url_externa,
      fk_local_id
    } = req.body;

    // Verificar se o evento existe
    const eventoExiste = await prisma.evento.findUnique({
      where: { id }
    });

    if (!eventoExiste) {
      return res.status(404).json({ error: "Evento não encontrado" });
    }

    // Validar se o local existe (se fornecido)
    if (fk_local_id) {
      const localExiste = await prisma.local.findUnique({
        where: { id: fk_local_id }
      });

      if (!localExiste) {
        return res.status(400).json({
          error: "Local não encontrado"
        });
      }
    }

    // Validar datas (se fornecidas)
    if (data_inicio && data_fim) {
      const inicio = new Date(data_inicio);
      const fim = new Date(data_fim);

      if (inicio >= fim) {
        return res.status(400).json({
          error: "Data de início deve ser anterior à data de fim"
        });
      }
    }

    // Preparar dados para atualização
    const dataParaAtualizar = {};
    if (nome !== undefined) dataParaAtualizar.nome = nome;
    if (descricao !== undefined) dataParaAtualizar.descricao = descricao;
    if (data_inicio !== undefined) dataParaAtualizar.data_inicio = data_inicio ? new Date(data_inicio) : null;
    if (data_fim !== undefined) dataParaAtualizar.data_fim = data_fim ? new Date(data_fim) : null;
    if (status !== undefined) dataParaAtualizar.status = status;
    if (url_externa !== undefined) dataParaAtualizar.url_externa = url_externa;
    if (fk_local_id !== undefined) dataParaAtualizar.fk_local_id = fk_local_id;

    const eventoAtualizado = await prisma.evento.update({
      where: { id },
      data: dataParaAtualizar,
      include: {
        local: {
          select: {
            id: true,
            nome: true,
            cidade: true,
            estado: true
          }
        }
      }
    });

    return res.status(200).json({
      message: "Evento atualizado com sucesso",
      evento: eventoAtualizado
    });
  } catch (error) {
    console.error("Erro ao atualizar evento:", error);
    return res.status(500).json({
      error: "Erro interno ao atualizar evento",
      details: error.message
    });
  } finally {
    await prisma.$disconnect();
  }
};

export const deletarEvento = async (req, res) => {
  const { id } = req.params;

  try {
    // Verificar se o evento existe
    const eventoExiste = await prisma.evento.findUnique({
      where: { id }
    });

    if (!eventoExiste) {
      return res.status(404).json({ error: "Evento não encontrado" });
    }

    await prisma.evento.delete({
      where: { id }
    });

    return res.status(200).json({
      message: "Evento deletado com sucesso"
    });
  } catch (error) {
    console.error("Erro ao deletar evento:", error);
    return res.status(500).json({
      error: "Erro interno ao deletar evento",
      details: error.message
    });
  } finally {
    await prisma.$disconnect();
  }
};

// Classe controller para injeção de dependências (similar ao seu padrão)
export class EventoController {
  constructor(repository, uuid) {
    this.repository = repository;
    this.uuid = uuid;
  }

  async buscarEventos(req, res) {
    try {
      const { nome, status, local_id, data_inicio, data_fim } = req.query;
      const where = {};

      if (nome) where.nome = { contains: nome, mode: 'insensitive' };
      if (status) where.status = { equals: status, mode: 'insensitive' };
      if (local_id) where.fk_local_id = local_id;

      if (data_inicio || data_fim) {
        where.data_inicio = {};
        if (data_inicio) where.data_inicio.gte = new Date(data_inicio);
        if (data_fim) where.data_inicio.lte = new Date(data_fim);
      }

      const eventos = await this.repository.findEventos(where);
      res.status(200).json(eventos);
    } catch (error) {
      console.error("Erro na busca de eventos:", error);
      res.status(500).json({ error: "Erro ao buscar eventos" });
    }
  }

  async createEvento(req, res) {
    try {
      const { nome, status } = req.body;

      if (!nome || !status) {
        return res.status(400).json({
          error: "Nome e status são obrigatórios"
        });
      }

      const novoEvento = await this.repository.createEvento({
        id: this.uuid.v4(),
        nome,
        status,
        ...req.body
      });

      res.status(201).json({
        message: "Evento criado com sucesso",
        evento: novoEvento
      });
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      res.status(500).json({
        error: "Erro interno ao criar evento",
        details: error.message
      });
    }
  }

  async atualizarEvento(req, res) {
    try {
      const { id } = req.params;
      
      const eventoAtualizado = await this.repository.updateEvento(id, req.body);
      
      if (!eventoAtualizado) {
        return res.status(404).json({ error: "Evento não encontrado" });
      }

      res.status(200).json({
        message: "Evento atualizado com sucesso",
        evento: eventoAtualizado
      });
    } catch (error) {
      console.error("Erro ao atualizar evento:", error);
      res.status(500).json({
        error: "Erro interno ao atualizar evento",
        details: error.message
      });
    }
  }

  async deletarEvento(req, res) {
    try {
      const { id } = req.params;
      
      const resultado = await this.repository.deleteEvento(id);
      
      if (!resultado) {
        return res.status(404).json({ error: "Evento não encontrado" });
      }

      res.status(200).json({
        message: "Evento deletado com sucesso"
      });
    } catch (error) {
      console.error("Erro ao deletar evento:", error);
      res.status(500).json({
        error: "Erro interno ao deletar evento",
        details: error.message
      });
    }
  }
}