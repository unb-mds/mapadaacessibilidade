import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const criarAvaliacaoLocal = async (req, res, next) => {
    try {
        const { nota, comentario, fk_usuario_id, fk_local_id } = req.body;

        // Verifica se o usuário já avaliou este local
        const avaliacaoExistente = await prisma.avaliacao.findUnique({
            where: {
                fk_usuario_id_fk_local_id: {
                    fk_usuario_id,
                    fk_local_id
                }
            }
        });

        if (avaliacaoExistente) {
            return res.status(400).json({
                error: "Usuário já avaliou este local"
            });
        }

        const novaAvaliacao = await prisma.avaliacao.create({
            data: {
                nota,
                comentario,
                fk_usuario_id,
                fk_local_id
            },
            include: {
                usuario: { select: { nome: true } },
                local: { select: { nome: true } }
            }
        });

        return res.status(201).json({
            message: "Avaliação criada com sucesso",
            avaliacao: novaAvaliacao
        });
    } catch (error) {
        next(error);
    }
};

export const listarAvaliacoesLocal = async (req, res, next) => {
    try {
        const { local_id } = req.params;

        const avaliacoes = await prisma.avaliacao.findMany({
            where: { fk_local_id: local_id },
            include: {
                usuario: { select: { id: true, nome: true } }
            },
            orderBy: { created_at: 'desc' }
        });

        const local = await prisma.local.findUnique({
            where: { id: local_id },
            select: { id: true, nome: true }
        });

        // Calcular média das avaliações
        const media = avaliacoes.reduce((acc, curr) => acc + curr.nota, 0) / avaliacoes.length;

        return res.status(200).json({
            local,
            media_avaliacoes: media.toFixed(1),
            total_avaliacoes: avaliacoes.length,
            avaliacoes
        });
    } catch (error) {
        next(error);
    }
};

export const obterAvaliacaoUsuarioLocal = async (req, res, next) => {
    try {
        const { usuario_id, local_id } = req.params;

        const avaliacao = await prisma.avaliacao.findUnique({
            where: {
                fk_usuario_id_fk_local_id: {
                    fk_usuario_id: usuario_id,
                    fk_local_id: local_id
                }
            },
            include: {
                usuario: { select: { nome: true } },
                local: { select: { nome: true } }
            }
        });

        if (!avaliacao) {
            return res.status(404).json({
                message: "Avaliação não encontrada"
            });
        }

        return res.status(200).json(avaliacao);
    } catch (error) {
        next(error);
    }
};

export const atualizarAvaliacaoLocal = async (req, res, next) => {
    try {
        const { usuario_id, local_id } = req.params;
        const { nota, comentario } = req.body;

        const avaliacaoAtualizada = await prisma.avaliacao.update({
            where: {
                fk_usuario_id_fk_local_id: {
                    fk_usuario_id: usuario_id,
                    fk_local_id: local_id
                }
            },
            data: { nota, comentario },
            include: {
                usuario: { select: { nome: true } },
                local: { select: { nome: true } }
            }
        });

        return res.status(200).json({
            message: "Avaliação atualizada com sucesso",
            avaliacao: avaliacaoAtualizada
        });
    } catch (error) {
        next(error);
    }
};

export const removerAvaliacaoLocal = async (req, res, next) => {
    try {
        const { usuario_id, local_id } = req.params;

        await prisma.avaliacao.delete({
            where: {
                fk_usuario_id_fk_local_id: {
                    fk_usuario_id: usuario_id,
                    fk_local_id: local_id
                }
            }
        });

        return res.status(200).json({
            message: "Avaliação removida com sucesso"
        });
    } catch (error) {
        next(error);
    }
};

export const avaliacaoLocalErrorHandler = (err, req, res, next) => {
    console.error("Erro no controller de avaliação local:", err);

    if (err.code === "P2002") {
        return res.status(409).json({
            error: "Conflito: O usuário já avaliou este local"
        });
    }

    if (err.code === "P2025") {
        return res.status(404).json({
            error: "Avaliação não encontrada"
        });
    }

    res.status(500).json({
        error: "Erro interno no servidor",
        details: process.env.NODE_ENV === "development" ? err.message : undefined
    });
};

export const listarAvaliacoesFiltradas = async (req, res, next) => {
  try {
    const { 
      nota_min, 
      nota_max, 
      data_inicio, 
      data_fim, 
      page = 1, 
      limit = 10 
    } = req.query;

    const where = {};
    
    // Filtros de nota
    if (nota_min) where.nota = { gte: parseInt(nota_min) };
    if (nota_max) where.nota = { ...where.nota, lte: parseInt(nota_max) };
    
    // Filtro por data
    if (data_inicio && data_fim) {
      where.created_at = { 
        gte: new Date(data_inicio), 
        lte: new Date(data_fim) 
      };
    }

    // Paginação
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const avaliacoes = await prisma.avaliacao.findMany({
      where,
      skip,
      take,
      include: { 
        usuario: { select: { nome: true } },
        local: { select: { nome: true } }
      },
      orderBy: { created_at: 'desc' }
    });

    // Contagem total para metadados de paginação
    const total = await prisma.avaliacao.count({ where });

    return res.status(200).json({
      meta: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        hasNext: skip + take < total
      },
      data: avaliacoes
    });

  } catch (error) {
    next(error);
  }
};


export default {
    criarAvaliacaoLocal,
    listarAvaliacoesLocal,
    obterAvaliacaoUsuarioLocal,
    atualizarAvaliacaoLocal,
    removerAvaliacaoLocal,
    avaliacaoLocalErrorHandler,
    listarAvaliacoesFiltradas
};
// src/controllers/avaliacaoLocalController.js
export class AvaliacaoLocalController {
  constructor(repository) {
    this.repository = repository;
  }

  async criarAvaliacaoLocal(req, res) {
    try {
      const { nota, comentario, fk_usuario_id, fk_local_id } = req.body;

      // Verifica se avaliação já existe
      const avaliacaoExistente = await this.repository.avaliacao.findUnique({
        where: {
          fk_usuario_id_fk_local_id: {
            fk_usuario_id,
            fk_local_id
          }
        }
      });

      if (avaliacaoExistente) {
        return res.status(400).json({
          error: "Usuário já avaliou este local"
        });
      }

      // Cria nova avaliação
      const novaAvaliacao = await this.repository.avaliacao.create({
        data: {
          nota,
          comentario,
          fk_usuario_id,
          fk_local_id
        },
        include: {
          usuario: { select: { nome: true } },
          local: { select: { nome: true } }
        }
      });

      return res.status(201).json({
        message: "Avaliação criada com sucesso",
        avaliacao: novaAvaliacao
      });

    } catch (error) {
      if (error.code === 'P2002') {
        return res.status(409).json({
          error: "Conflito: O usuário já avaliou este local"
        });
      }
      return res.status(500).json({
        error: "Erro ao criar avaliação",
        details: process.env.NODE_ENV === "development" ? error.message : undefined
      });
    }
  }

  async listarAvaliacoesLocal(req, res) {
    try {
      const { local_id } = req.params;

      const avaliacoes = await this.repository.avaliacao.findMany({
        where: { fk_local_id: local_id },
        include: {
          usuario: { select: { id: true, nome: true } }
        },
        orderBy: { created_at: 'desc' }
      });

      const local = await this.repository.local.findUnique({
        where: { id: local_id },
        select: { id: true, nome: true }
      });

      // Calcula média (retorna 0 se não houver avaliações)
      const media = avaliacoes.length > 0 
        ? avaliacoes.reduce((acc, curr) => acc + curr.nota, 0) / avaliacoes.length
        : 0;

      return res.status(200).json({
        local,
        media_avaliacoes: media.toFixed(1),
        total_avaliacoes: avaliacoes.length,
        avaliacoes
      });

    } catch (error) {
      return res.status(500).json({
        error: "Erro ao listar avaliações",
        details: process.env.NODE_ENV === "development" ? error.message : undefined
      });
    }
  }

  async obterAvaliacaoUsuarioLocal(req, res) {
    try {
      const { usuario_id, local_id } = req.params;

      const avaliacao = await this.repository.avaliacao.findUnique({
        where: {
          fk_usuario_id_fk_local_id: {
            fk_usuario_id: usuario_id,
            fk_local_id: local_id
          }
        },
        include: {
          usuario: { select: { nome: true } },
          local: { select: { nome: true } }
        }
      });

      if (!avaliacao) {
        return res.status(404).json({
          message: "Avaliação não encontrada"
        });
      }

      return res.status(200).json(avaliacao);

    } catch (error) {
      return res.status(500).json({
        error: "Erro ao buscar avaliação",
        details: process.env.NODE_ENV === "development" ? error.message : undefined
      });
    }
  }

  async atualizarAvaliacaoLocal(req, res) {
    try {
      const { usuario_id, local_id } = req.params;
      const { nota, comentario } = req.body;

      const avaliacaoAtualizada = await this.repository.avaliacao.update({
        where: {
          fk_usuario_id_fk_local_id: {
            fk_usuario_id: usuario_id,
            fk_local_id: local_id
          }
        },
        data: { nota, comentario },
        include: {
          usuario: { select: { nome: true } },
          local: { select: { nome: true } }
        }
      });

      return res.status(200).json({
        message: "Avaliação atualizada com sucesso",
        avaliacao: avaliacaoAtualizada
      });

    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({
          error: "Avaliação não encontrada para atualização"
        });
      }
      return res.status(500).json({
        error: "Erro ao atualizar avaliação",
        details: process.env.NODE_ENV === "development" ? error.message : undefined
      });
    }
  }

  async removerAvaliacaoLocal(req, res) {
    try {
      const { usuario_id, local_id } = req.params;

      await this.repository.avaliacao.delete({
        where: {
          fk_usuario_id_fk_local_id: {
            fk_usuario_id: usuario_id,
            fk_local_id: local_id
          }
        }
      });

      return res.status(200).json({
        message: "Avaliação removida com sucesso"
      });

    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({
          error: "Avaliação não encontrada para remoção"
        });
      }
      return res.status(500).json({
        error: "Erro ao remover avaliação",
        details: process.env.NODE_ENV === "development" ? error.message : undefined
      });
    }
  }

  async listarAvaliacoesFiltradas(req, res) {
    try {
      const { 
        nota_min, 
        nota_max, 
        data_inicio, 
        data_fim, 
        page = 1, 
        limit = 10 
      } = req.query;

      const where = {};
      
      // Filtros de nota
      if (nota_min) where.nota = { gte: parseInt(nota_min) };
      if (nota_max) where.nota = { ...where.nota, lte: parseInt(nota_max) };
      
      // Filtro por data
      if (data_inicio && data_fim) {
        where.created_at = { 
          gte: new Date(data_inicio), 
          lte: new Date(data_fim) 
        };
      }

      // Paginação
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const take = parseInt(limit);

      const [avaliacoes, total] = await Promise.all([
        this.repository.avaliacao.findMany({
          where,
          skip,
          take,
          include: { 
            usuario: { select: { nome: true } },
            local: { select: { nome: true } }
          },
          orderBy: { created_at: 'desc' }
        }),
        this.repository.avaliacao.count({ where })
      ]);

      return res.status(200).json({
        meta: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          hasNext: skip + take < total
        },
        data: avaliacoes
      });

    } catch (error) {
      return res.status(500).json({
        error: "Erro ao filtrar avaliações",
        details: process.env.NODE_ENV === "development" ? error.message : undefined
      });
    }
  }
}
