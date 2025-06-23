import { createFotos, buscarFotos } from "./fotosController";
import { PrismaClient } from "@prisma/client";

jest.mock("@prisma/client", () => {
  const mockPrisma = {
    foto: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  return { PrismaClient: jest.fn(() => mockPrisma) };
});

describe("fotosController", () => {
  let req, res, prisma;

  beforeEach(() => {
    prisma = new PrismaClient();

    req = { body: {}, query: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  describe("createFotos", () => {
    it("cria múltiplas fotos com sucesso", async () => {
      req.body = [
        {
          url: "http://img1.jpg",
          status: "ativo",
          fk_usuario_id: "user1",
          fk_local_id: "local1",
        },
        {
          url: "http://img2.jpg",
          status: "pendente",
          fk_usuario_id: "user2",
          fk_local_id: "local2",
        },
      ];

      prisma.foto.create
        .mockResolvedValueOnce({ id: "f1", ...req.body[0] })
        .mockResolvedValueOnce({ id: "f2", ...req.body[1] });

      await createFotos(req, res);

      expect(prisma.foto.create).toHaveBeenCalledTimes(2);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "2 fotos criadas com sucesso!",
          fotos: [
            { id: "f1", ...req.body[0] },
            { id: "f2", ...req.body[1] },
          ],
        })
      );
    });

    it("retorna erro se corpo não for array", async () => {
      req.body = {};

      await createFotos(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error:
          "O corpo da requisição deve ser um array de objetos de foto não vazio.",
      });
    });

    it("cria parcialmente com erros mistos", async () => {
      req.body = [
        {
          url: "http://img1.jpg",
          status: "ativo",
          fk_usuario_id: "user1",
          fk_local_id: "local1",
        },
        {
          url: "", // inválido
          status: "pendente",
          fk_usuario_id: "user2",
          fk_local_id: "local2",
        },
      ];

      prisma.foto.create.mockResolvedValueOnce({
        id: "f1",
        ...req.body[0],
      });

      await createFotos(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "1 fotos criadas com sucesso! (1 fotos falharam)",
        fotos: [
          {
            id: "f1",
            ...req.body[0],
          },
        ],
        warnings: ["Foto 2: URL é obrigatória e deve ser uma string válida"],
      });
    });

    it("retorna erro se nenhuma for válida", async () => {
      req.body = [
        {
          url: "",
          status: "",
          fk_usuario_id: "",
          fk_local_id: "",
        },
      ];

      await createFotos(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Nenhuma foto válida foi criada",
        details: expect.any(Array),
      });
    });
  });

  describe("buscarFotos", () => {
    it("busca fotos sem filtros", async () => {
      req.query = {};

      prisma.foto.findMany.mockResolvedValue([
        { id: "f1", url: "http://img1.jpg" },
      ]);

      await buscarFotos(req, res);

      expect(prisma.foto.findMany).toHaveBeenCalledWith({
        where: {},
        include: { usuario: true, local: true },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { id: "f1", url: "http://img1.jpg" },
      ]);
    });

    it("busca fotos com filtros aplicados", async () => {
      req.query = {
        url: "img",
        status: "ativo",
        fk_usuario_id: "user1",
        fk_local_id: "local1",
      };

      prisma.foto.findMany.mockResolvedValue([
        { id: "f1", url: "http://img.jpg" },
      ]);

      await buscarFotos(req, res);

      expect(prisma.foto.findMany).toHaveBeenCalledWith({
        where: {
          url: { contains: "img" },
          status: "ativo",
          fk_usuario_id: "user1",
          fk_local_id: "local1",
        },
        include: { usuario: true, local: true },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { id: "f1", url: "http://img.jpg" },
      ]);
    });

    it("retorna erro interno ao buscar", async () => {
      req.query = {};
      prisma.foto.findMany.mockRejectedValue(new Error("DB Error"));

      await buscarFotos(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Erro ao buscar fotos",
      });
    });
  });
});
