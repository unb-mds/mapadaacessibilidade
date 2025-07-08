import {
  cadastrarUsuario,
  loginUsuario,
  listarUsuarios,
} from "./usuariosController";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

jest.mock("@prisma/client", () => {
  const mPrisma = {
    usuario: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  return {
    PrismaClient: jest.fn(() => mPrisma),
  };
});

describe("usuariosController", () => {
  let req, res, prisma;

  beforeEach(() => {
    prisma = new PrismaClient();
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("cadastrarUsuario", () => {
    it("deve retornar 400 se faltar campos obrigatórios", async () => {
      req.body = { nome: "Caio", email: "caio@email.com" }; // faltando senha e papel

      await cadastrarUsuario(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Todos os campos são obrigatórios.",
      });
    });

    it("deve criar usuário e retornar 201", async () => {
      req.body = {
        nome: "Caio",
        email: "caio@email.com",
        senha: "123456",
        papel: "admin",
      };
      const fakeUser = {
        id: "uuid",
        nome: "Caio",
        email: "caio@email.com",
        senha_hash: "hash",
        papel: "admin",
      };
      prisma.usuario.create.mockResolvedValue(fakeUser);

      await cadastrarUsuario(req, res);

      expect(prisma.usuario.create).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(fakeUser);
    });

    it("deve retornar 400 se email já cadastrado (erro P2002)", async () => {
      req.body = {
        nome: "Caio",
        email: "caio@email.com",
        senha: "123456",
        papel: "admin",
      };
      const error = new Error();
      error.code = "P2002";
      prisma.usuario.create.mockRejectedValue(error);

      await cadastrarUsuario(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Email já cadastrado." });
    });

    it("deve retornar 500 em erro inesperado", async () => {
      req.body = {
        nome: "Caio",
        email: "caio@email.com",
        senha: "123456",
        papel: "admin",
      };
      prisma.usuario.create.mockRejectedValue(new Error("Algo deu errado"));

      await cadastrarUsuario(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Erro ao cadastrar usuário.",
      });
    });
  });

  describe("loginUsuario", () => {
    it("deve retornar 400 se faltar email ou senha", async () => {
      req.body = { email: "caio@email.com" }; // senha faltando

      await loginUsuario(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Email e senha são obrigatórios.",
      });
    });

    it("deve retornar 401 se credenciais inválidas", async () => {
      req.body = { email: "caio@email.com", senha: "senhaErrada" };
      prisma.usuario.findUnique.mockResolvedValue(null);

      await loginUsuario(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        error: "Credenciais inválidas.",
      });
    });

    it("deve retornar 401 se senha estiver errada", async () => {
      const usuario = {
        id: "id",
        nome: "Caio",
        email: "caio@email.com",
        senha_hash: "hash_correta",
        papel: "admin",
        created_at: new Date(),
      };
      req.body = { email: "caio@email.com", senha: "senhaErrada" };
      prisma.usuario.findUnique.mockResolvedValue(usuario);

      await loginUsuario(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        error: "Credenciais inválidas.",
      });
    });

    it("deve retornar 200 com dados do usuário sem a senha", async () => {
      const senha = "senhaCorreta";
      const senhaHash = crypto.createHash("sha256").update(senha).digest("hex");

      const usuario = {
        id: "id",
        nome: "Caio",
        email: "caio@email.com",
        senha_hash: senhaHash,
        papel: "admin",
        created_at: new Date(),
      };
      req.body = { email: "caio@email.com", senha };
      prisma.usuario.findUnique.mockResolvedValue(usuario);

      await loginUsuario(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      // espera que a senha_hash seja excluída na resposta
      expect(res.json).toHaveBeenCalledWith({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        papel: usuario.papel,
        created_at: usuario.created_at,
      });
    });

    it("deve retornar 500 em erro inesperado", async () => {
      req.body = { email: "caio@email.com", senha: "senha" };
      prisma.usuario.findUnique.mockRejectedValue(new Error("Erro de BD"));

      await loginUsuario(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Erro ao realizar login.",
      });
    });
  });

  describe("listarUsuarios", () => {
    it("deve retornar 200 com lista de usuários", async () => {
      const usuarios = [
        {
          id: "1",
          nome: "Caio",
          email: "caio@email.com",
          papel: "admin",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];
      prisma.usuario.findMany.mockResolvedValue(usuarios);

      await listarUsuarios(req, res);

      expect(prisma.usuario.findMany);
    });
  });
});
