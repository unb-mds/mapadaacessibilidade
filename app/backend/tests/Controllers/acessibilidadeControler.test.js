import { createAcessibilidade } from "./acessibilidadeController"; // ajuste o caminho
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

// Mocks
jest.mock("@prisma/client", () => {
  const mPrisma = {
    acessibilidade: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  return { PrismaClient: jest.fn(() => mPrisma) };
});

jest.mock("uuid", () => ({
  v4: jest.fn(() => "uuid-mockado"),
}));

describe("createAcessibilidade", () => {
  let req, res, next, prisma;

  beforeEach(() => {
    prisma = new PrismaClient();
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("retorna 400 se nome estiver ausente", async () => {
    req.body = { descricao: "Desc" };

    await createAcessibilidade(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Nome é obrigatório e deve ser uma string",
    });
  });

  it("retorna 400 se nome for só espaços", async () => {
    req.body = { nome: "    ", descricao: "desc" };

    await createAcessibilidade(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Nome não pode ser vazio ou apenas espaços",
    });
  });

  it("retorna 400 se nome exceder 50 caracteres", async () => {
    req.body = {
      nome: "a".repeat(51),
      descricao: "desc",
    };

    await createAcessibilidade(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Nome deve ter no máximo 50 caracteres",
    });
  });

  it("retorna 409 se nome já existir (insensitive)", async () => {
    req.body = { nome: "Rampa", descricao: "desc" };
    prisma.acessibilidade.findFirst.mockResolvedValue({ id: "123" });

    await createAcessibilidade(req, res, next);

    expect(prisma.acessibilidade.findFirst).toHaveBeenCalledWith({
      where: {
        nome: {
          equals: "Rampa",
          mode: "insensitive",
        },
      },
      select: { id: true },
    });

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      error: "Já existe uma acessibilidade com este nome",
    });
  });

  it("retorna 201 se dados forem válidos", async () => {
    req.body = { nome: "Rampa", descricao: "desc" };
    prisma.acessibilidade.findFirst.mockResolvedValue(null);
    prisma.acessibilidade.create.mockResolvedValue({
      id: "uuid-mockado",
      nome: "Rampa",
      descricao: "desc",
    });

    await createAcessibilidade(req, res, next);

    expect(prisma.acessibilidade.create).toHaveBeenCalledWith({
      data: {
        id: "uuid-mockado",
        nome: "Rampa",
        descricao: "desc",
      },
    });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      id: "uuid-mockado",
      nome: "Rampa",
      descricao: "desc",
    });
  });

  it("chama next(error) em erro inesperado", async () => {
    req.body = { nome: "Rampa", descricao: "desc" };
    const erro = new Error("Falha inesperada");
    prisma.acessibilidade.findFirst.mockRejectedValue(erro);

    await createAcessibilidade(req, res, next);

    expect(next).toHaveBeenCalledWith(erro);
  });
});
