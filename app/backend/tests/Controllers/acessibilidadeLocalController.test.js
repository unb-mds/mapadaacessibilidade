import {
  adicionarAcessibilidadeLocal,
  removerAcessibilidadeLocal,
  atualizarAcessibilidadeLocal,
  listarAcessibilidadesLocal,
  listarLocaisAcessibilidade,
} from "./acessibilidadeLocalController";

import { PrismaClient } from "@prisma/client";

jest.mock("@prisma/client", () => {
  const mPrisma = {
    localacessibilidade: {
      create: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
    },
    local: {
      findUnique: jest.fn(),
    },
    acessibilidade: {
      findUnique: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  return { PrismaClient: jest.fn(() => mPrisma) };
});

describe("acessibilidadeLocalController", () => {
  let req, res, next, prisma;

  beforeEach(() => {
    prisma = new PrismaClient();
    req = { body: {}, params: {}, query: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("adiciona acessibilidade ao local com sucesso", async () => {
    req.body = {
      local_id: "loc1",
      acessibilidade_id: "acc1",
    };
    const mockData = {
      id: 1,
      local_id: "loc1",
      acessibilidade_id: "acc1",
      presente: true,
      local: { nome: "Local A" },
      acessibilidade: { nome: "Rampa", descricao: "Acesso por rampa" },
    };

    prisma.localacessibilidade.create.mockResolvedValue(mockData);

    await adicionarAcessibilidadeLocal(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Acessibilidade adicionada ao local com sucesso",
      associacao: mockData,
    });
  });

  it("remove acessibilidade do local com sucesso", async () => {
    req.params = {
      local_id: "loc1",
      acessibilidade_id: "acc1",
    };

    prisma.localacessibilidade.delete.mockResolvedValue({
      local: { nome: "Local A" },
      acessibilidade: { nome: "Rampa" },
    });

    await removerAcessibilidadeLocal(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Acessibilidade removida do local com sucesso",
      associacao_removida: {
        local: "Local A",
        acessibilidade: "Rampa",
      },
    });
  });

  it("atualiza status da acessibilidade no local com sucesso", async () => {
    req.params = {
      local_id: "loc1",
      acessibilidade_id: "acc1",
    };
    req.body = { presente: false };

    const mockUpdate = {
      presente: false,
      local: { nome: "Local A" },
      acessibilidade: { nome: "Rampa", descricao: "Desc" },
    };

    prisma.localacessibilidade.update.mockResolvedValue(mockUpdate);

    await atualizarAcessibilidadeLocal(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Status da acessibilidade atualizado com sucesso",
      associacao: mockUpdate,
    });
  });

  it("lista acessibilidades de um local (todas)", async () => {
    req.params.local_id = "loc1";
    req.query = {}; // nenhuma filtragem

    prisma.localacessibilidade.findMany.mockResolvedValue([
      {
        presente: true,
        data_inclusao: "2024-01-01",
        acessibilidade: {
          id: "a1",
          nome: "Rampa",
          descricao: "Desc",
        },
      },
    ]);

    prisma.local.findUnique.mockResolvedValue({
      id: "loc1",
      nome: "Local A",
    });

    await listarAcessibilidadesLocal(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      local: {
        id: "loc1",
        nome: "Local A",
      },
      acessibilidades: [
        {
          id: "a1",
          nome: "Rampa",
          descricao: "Desc",
          presente: true,
          data_inclusao: "2024-01-01",
        },
      ],
    });
  });

  it("lista locais por acessibilidade com filtro", async () => {
    req.params.acessibilidade_id = "acc1";
    req.query.apenas_presentes = "true";

    prisma.localacessibilidade.findMany.mockResolvedValue([
      {
        presente: true,
        data_inclusao: "2024-01-01",
        local: {
          id: "loc1",
          nome: "Local A",
          tipo: "parque",
          endereco: "Rua X",
          cidade: "Brasília",
          bairro: "Centro",
          estado: "DF",
        },
      },
    ]);

    prisma.acessibilidade.findUnique.mockResolvedValue({
      id: "acc1",
      nome: "Rampa",
      descricao: "Acesso por rampa",
    });

    await listarLocaisAcessibilidade(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      acessibilidade: {
        id: "acc1",
        nome: "Rampa",
        descricao: "Acesso por rampa",
      },
      locais: [
        {
          id: "loc1",
          nome: "Local A",
          tipo: "parque",
          endereco: "Rua X",
          cidade: "Brasília",
          bairro: "Centro",
          estado: "DF",
          presente: true,
          data_inclusao: "2024-01-01",
        },
      ],
    });
  });
});
