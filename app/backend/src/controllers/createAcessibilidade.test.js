const {
  createAcessibilidade,
} = require("../controllers/acessibilidadeController");
const { prisma } = require("../lib/prisma");
const { v4: uuidv4 } = require("uuid");

// mock do prisma e uuid
jest.mock("../lib/prisma", () => ({
  prisma: {
    acessibilidade: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
  },
}));

jest.mock("uuid", () => ({
  v4: jest.fn(() => "mock-uuid"),
}));

// mocks helpers
const mockReq = (body) => ({ body });
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
const mockNext = jest.fn();

describe("createAcessibilidade", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("deve falhar se nome não for fornecido", async () => {
    const req = mockReq({});
    const res = mockRes();

    await createAcessibilidade(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Nome é obrigatório e deve ser uma string",
    });
  });

  test("deve falhar se nome não for string", async () => {
    const req = mockReq({ nome: 123 });
    const res = mockRes();

    await createAcessibilidade(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Nome é obrigatório e deve ser uma string",
    });
  });

  test("deve falhar se nome for só espaços", async () => {
    const req = mockReq({ nome: "     " });
    const res = mockRes();

    await createAcessibilidade(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Nome não pode ser vazio ou apenas espaços",
    });
  });

  test("deve falhar se nome tiver mais de 50 caracteres", async () => {
    const req = mockReq({ nome: "a".repeat(51) });
    const res = mockRes();

    await createAcessibilidade(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Nome deve ter no máximo 50 caracteres",
    });
  });

  test("deve falhar se acessibilidade já existir", async () => {
    prisma.acessibilidade.findFirst.mockResolvedValue({ id: "123" });

    const req = mockReq({ nome: "Banheiro adaptado" });
    const res = mockRes();

    await createAcessibilidade(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      error: "Já existe uma acessibilidade com este nome",
    });
  });

  test("deve criar acessibilidade com sucesso", async () => {
    prisma.acessibilidade.findFirst.mockResolvedValue(null);
    prisma.acessibilidade.create.mockResolvedValue({
      id: "mock-uuid",
      nome: "Banheiro adaptado",
      descricao: "Descrição",
    });

    const req = mockReq({
      nome: "  Banheiro adaptado  ",
      descricao: "  Descrição  ",
    });
    const res = mockRes();

    await createAcessibilidade(req, res, mockNext);

    expect(prisma.acessibilidade.create).toHaveBeenCalledWith({
      data: {
        id: "mock-uuid",
        nome: "Banheiro adaptado",
        descricao: "Descrição",
      },
    });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      id: "mock-uuid",
      nome: "Banheiro adaptado",
      descricao: "Descrição",
    });
  });
});
