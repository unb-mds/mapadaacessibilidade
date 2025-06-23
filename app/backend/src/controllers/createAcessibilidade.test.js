const { createAcessibilidade } = require("../controllers/acessibilidadeController");
const { v4: uuidv4 } = require("uuid");

// Factory para criar instância do controller com dependências injetadas
function createController(dependencies = {}) {
  const defaultDeps = {
    acessibilidadeRepository: {
      findByName: jest.fn(),
      create: jest.fn()
    },
    uuid: { v4: jest.fn(() => "mock-uuid") },
    validator: {
      validateName: (name) => {
        if (!name || typeof name !== 'string') return "Nome é obrigatório e deve ser uma string";
        if (name.trim().length === 0) return "Nome não pode ser vazio ou apenas espaços";
        if (name.length > 50) return "Nome deve ter no máximo 50 caracteres";
        return null;
      }
    }
  };

  const deps = { ...defaultDeps, ...dependencies };
  
  return {
    controller: (req, res, next) => createAcessibilidade(deps)(req, res, next),
    dependencies: deps
  };
}

// Helpers reutilizáveis
const mockReq = (body) => ({ body });
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("createAcessibilidade", () => {
  let controller, dependencies;

  beforeEach(() => {
    const setup = createController();
    controller = setup.controller;
    dependencies = setup.dependencies;
  });

  test.each([
    [null, "Nome é obrigatório e deve ser uma string"],
    [123, "Nome é obrigatório e deve ser uma string"],
    ["     ", "Nome não pode ser vazio ou apenas espaços"],
    ["a".repeat(51), "Nome deve ter no máximo 50 caracteres"]
  ])("deve falhar quando nome é '%s'", async (nome, errorMessage) => {
    const req = mockReq({ nome });
    const res = mockRes();

    await controller(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });

  test("deve falhar se acessibilidade já existir", async () => {
    dependencies.acessibilidadeRepository.findByName.mockResolvedValue({ id: "123" });
    const req = mockReq({ nome: "Banheiro adaptado" });
    const res = mockRes();

    await controller(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      error: "Já existe uma acessibilidade com este nome"
    });
  });

  test("deve criar com sucesso e sanitizar espaços", async () => {
    const mockAcessibilidade = { 
      id: "mock-uuid", 
      nome: "Banheiro adaptado", 
      descricao: "Descrição" 
    };
    
    dependencies.acessibilidadeRepository.create.mockResolvedValue(mockAcessibilidade);
    
    const req = mockReq({ 
      nome: "  Banheiro adaptado  ", 
      descricao: "  Descrição  " 
    });
    const res = mockRes();

    await controller(req, res, jest.fn());

    expect(dependencies.acessibilidadeRepository.create).toHaveBeenCalledWith({
      nome: "Banheiro adaptado",
      descricao: "Descrição"
    });
    
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockAcessibilidade);
  });

  test("deve chamar next() em caso de erro inesperado", async () => {
    dependencies.acessibilidadeRepository.findByName.mockRejectedValue(new Error("DB Error"));
    const next = jest.fn();
    const req = mockReq({ nome: "Banheiro" });

    await controller(req, mockRes(), next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});
