import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const adicionarAcessibilidadeLocal = async (req, res) => {
  const { local_id, acessibilidade_id, presente = true } = req.body;

  const novaAssociacao = await prisma.localacessibilidade.create({
    data: {
      local_id,
      acessibilidade_id,
      presente,
    },
    include: {
      local: { select: { nome: true } },
      acessibilidade: { select: { nome: true, descricao: true } },
    },
  });

  return res.status(201).json({
    message: "Acessibilidade adicionada ao local com sucesso",
    associacao: novaAssociacao,
  });
};

export const removerAcessibilidadeLocal = async (req, res) => {
  const { local_id, acessibilidade_id } = req.params;

  const associacao = await prisma.localacessibilidade.delete({
    where: {
      local_id_acessibilidade_id: {
        local_id,
        acessibilidade_id,
      },
    },
    include: {
      local: { select: { nome: true } },
      acessibilidade: { select: { nome: true } },
    },
  });

  return res.status(200).json({
    message: "Acessibilidade removida do local com sucesso",
    associacao_removida: {
      local: associacao.local.nome,
      acessibilidade: associacao.acessibilidade.nome,
    },
  });
};

export const atualizarAcessibilidadeLocal = async (req, res) => {
  const { local_id, acessibilidade_id } = req.params;
  const { presente } = req.body;

  const associacaoAtualizada = await prisma.localacessibilidade.update({
    where: {
      local_id_acessibilidade_id: {
        local_id,
        acessibilidade_id,
      },
    },
    data: { presente },
    include: {
      local: { select: { nome: true } },
      acessibilidade: { select: { nome: true, descricao: true } },
    },
  });

  return res.status(200).json({
    message: "Status da acessibilidade atualizado com sucesso",
    associacao: associacaoAtualizada,
  });
};

// Listar todas as acessibilidades de um local
export const listarAcessibilidadesLocal = async (req, res) => {
  const { local_id } = req.params;
  const { apenas_presentes } = req.query;

  const where = { local_id };
  if (apenas_presentes === "true") {
    where.presente = true;
  }

  const acessibilidades = await prisma.localacessibilidade.findMany({
    where,
    include: {
      acessibilidade: {
        select: {
          id: true,
          nome: true,
          descricao: true,
        },
      },
    },
    orderBy: {
      data_inclusao: "desc",
    },
  });

  const local = await prisma.local.findUnique({
    where: { id: local_id },
    select: { id: true, nome: true },
  });

  return res.status(200).json({
    local,
    acessibilidades: acessibilidades.map((item) => ({
      ...item.acessibilidade,
      presente: item.presente,
      data_inclusao: item.data_inclusao,
    })),
  });
};

// Listar todos os locais que possuem uma acessibilidade específica
export const listarLocaisAcessibilidade = async (req, res, next) => {
  try {
    const { acessibilidade_id } = req.params;
    const { apenas_presentes } = req.query;

    const where = { acessibilidade_id };
    if (apenas_presentes === "true") {
      where.presente = true;
    }

    const locais = await prisma.localacessibilidade.findMany({
      where,
      include: {
        local: {
          select: {
            id: true,
            nome: true,
            tipo: true,
            endereco: true,
            cidade: true,
            bairro: true,
            estado: true,
          },
        },
      },
      orderBy: {
        data_inclusao: "desc",
      },
    });

    const acessibilidade = await prisma.acessibilidade.findUnique({
      where: { id: acessibilidade_id },
      select: { id: true, nome: true, descricao: true },
    });

    return res.status(200).json({
      acessibilidade,
      locais: locais.map((item) => ({
        ...item.local,
        presente: item.presente,
        data_inclusao: item.data_inclusao,
      })),
    });
  } catch (error) {
    next(error);
  }
};

export const acessibilidadeLocalErrorHandler = (err, req, res, next) => {
  console.error("Erro no controller de acessibilidade-local:", err);

  if (err.code === "P2002") {
    return res.status(409).json({
      error: "Conflito: Esta associação já existe",
    });
  }

  if (err.code === "P2025") {
    return res.status(404).json({
      error: "Registro não encontrado",
    });
  }

  if (err.name === "PrismaClientValidationError") {
    return res.status(400).json({
      error: "Dados inválidos fornecidos",
    });
  }

  res.status(500).json({
    error: "Erro interno no servidor",
    details: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};

export default {
  adicionarAcessibilidadeLocal,
  removerAcessibilidadeLocal,
  atualizarAcessibilidadeLocal,
  listarAcessibilidadesLocal,
  listarLocaisAcessibilidade,
  acessibilidadeLocalErrorHandler,
};
