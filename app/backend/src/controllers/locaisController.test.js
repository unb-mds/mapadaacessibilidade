import { LocalController } from "../controllers/locaisController.js";
import { jest } from "@jest/globals";

const mockRepository = {
  findLocais: jest.fn(),
  createLocal: jest.fn(),
  calcularDistancia: jest.fn(),
};

const mockUuid = { v4: jest.fn(() => "mocked-uuid") };

const setup = () => {
  const controller = new LocalController(mockRepository, mockUuid);
  const req = (query = {}, body = {}) => ({ query, body });
  const res = () => {
    const r = {};
    r.status = jest.fn(() => r);
    r.json = jest.fn(() => r);
    return r;
  };
  return { controller, req, res };
};

describe("LocalController", () => {
  beforeEach(() => jest.clearAllMocks());

  describe("buscarLocais", () => {
    it("retorna locais filtrados por nome", async () => {
      const { controller, req, res } = setup();
      const response = res();

      mockRepository.findLocais.mockResolvedValue([
        { id: "1", nome: "Parque Ibirapuera", cidade: "São Paulo" },
      ]);

      await controller.buscarLocais(req({ nome: "Parque" }), response);

      expect(mockRepository.findLocais).toHaveBeenCalledWith({
        nome: { contains: "Parque", mode: "insensitive" },
      });
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith([
        { id: "1", nome: "Parque Ibirapuera", cidade: "São Paulo" },
      ]);
    });

    it("filtra por proximidade quando coordenadas são fornecidas", async () => {
      const { controller, req, res } = setup();
      const response = res();

      mockRepository.findLocais.mockResolvedValue([
        { id: "1", nome: "Local 1", latitude: -23.55, longitude: -46.63 },
      ]);
      mockRepository.calcularDistancia.mockReturnValue(1.5);

      await controller.buscarLocais(
        req({ latitude: "-23.55", longitude: "-46.63", raio: "5" }),
        response,
      );

      expect(mockRepository.calcularDistancia).toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalled();
    });
  });

  describe("createLocal", () => {
    it("cria um novo local com dados válidos", async () => {
      const { controller, req, res } = setup();
      const response = res();
      const mockLocal = {
        id: "mocked-uuid",
        nome: "Novo Local",
        cidade: "São Paulo",
      };

      mockRepository.createLocal.mockResolvedValue(mockLocal);

      await controller.createLocal(
        req(
          {},
          {
            nome: "Novo Local",
            cidade: "São Paulo",
            latitude: -23.55,
            longitude: -46.63,
            criado_por: "user-123",
          },
        ),
        response,
      );

      expect(mockRepository.createLocal).toHaveBeenCalledWith({
        id: "mocked-uuid",
        nome: "Novo Local",
        cidade: "São Paulo",
        latitude: -23.55,
        longitude: -46.63,
        status: "aprovado",
        criado_por: "user-123",
      });
      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalledWith(mockLocal);
    });
  });
});
