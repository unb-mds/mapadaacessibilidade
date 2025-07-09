import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

// Express 5.1 suporta async/await nativamente com tratamento de erros automático
export const createAcessibilidade = async (req, res, next) => {
  try {
    const { nome, descricao } = req.body;

    // Validações aprimoradas
    if (!nome || typeof nome !== "string") {
      return res.status(400).json({
        error: "Nome é obrigatório e deve ser uma string",
      });
    }

    const nomeTrimmed = nome.trim();

    if (!nomeTrimmed) {
      return res.status(400).json({
        error: "Nome não pode ser vazio ou apenas espaços",
      });
    }

    if (nomeTrimmed.length > 50) {
      return res.status(400).json({
        error: "Nome deve ter no máximo 50 caracteres",
      });
    }

    const acessibilidadeExistente = await prisma.acessibilidade.findFirst({
      where: {
        nome: {
          equals: nomeTrimmed,
          mode: "insensitive",
        },
      },
      select: { id: true },
    });

    if (acessibilidadeExistente) {
      return res.status(409).json({
        error: "Já existe uma acessibilidade com este nome",
      });
    }

    const novaAcessibilidade = await prisma.acessibilidade.create({
      data: {
        id: uuidv4(),
        nome: nomeTrimmed,
        descricao: descricao?.trim() || null,
      },
    });

    return res.status(201).json(novaAcessibilidade);
  } catch (error) {
    next(error);
  }
};

export const acessibilidadeErrorHandler = (err, req, res, next) => {
  console.error("Erro no controller de acessibilidade:", err);

  if (err.code === "P2002") {
    return res.status(409).json({
      error: "Conflito: Já existe um registro com esses dados",
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
  createAcessibilidade,
  acessibilidadeErrorHandler,
};
