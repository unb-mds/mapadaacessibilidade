import { LocalController } from '../controllers/locaisController.js';
import { jest } from '@jest/globals';

// Mock do repositório
const mockRepository = {
  findLocais: jest.fn(),
  createLocal: jest.fn(),
  calcularDistancia: jest.fn()
};

// Mock do UUID
const mockUuid = {
  v4: jest.fn(() => 'mocked-uuid')
};

// Configuração do controller para teste
const setupController = () => {
  const controller = new LocalController(mockRepository, mockUuid);
  
  const mockReq = (query = {}, body = {}) => ({ query, body });
  
  const mockRes = () => {
    const res = {};
    res.status = jest.fn(() => res);
    res.json = jest.fn(() => res);
    return res;
  };
  
  const mockNext = jest.fn();
  
  return { controller, mockReq, mockRes, mockNext };
};

describe('LocalController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('buscarLocais', () => {
    it('deve retornar locais filtrados por nome', async () => {
      const { controller, mockReq, mockRes } = setupController();
      mockRepository.findLocais.mockResolvedValue([
        { id: '1', nome: 'Parque Ibirapuera', cidade: 'São Paulo' }
      ]);

      const req = mockReq({ nome: 'Parque' });
      const res = mockRes();

      await controller.buscarLocais(req, res);

      expect(mockRepository.findLocais).toHaveBeenCalledWith({
        nome: { contains: 'Parque', mode: 'insensitive' }
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { id: '1', nome: 'Parque Ibirapuera', cidade: 'São Paulo' }
      ]);
    });

    it('deve filtrar por proximidade quando coordenadas são fornecidas', async () => {
      const { controller, mockReq, mockRes } = setupController();
      mockRepository.findLocais.mockResolvedValue([
        { id: '1', nome: 'Local 1', latitude: -23.55, longitude: -46.63 }
      ]);
      mockRepository.calcularDistancia.mockReturnValue(1.5);

      const req = mockReq({
        latitude: '-23.55',
        longitude: '-46.63',
        raio: '5'
      });
      const res = mockRes();

      await controller.buscarLocais(req, res);

      expect(mockRepository.calcularDistancia).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe('createLocal', () => {
    it('deve criar um novo local com dados válidos', async () => {
      const { controller, mockReq, mockRes } = setupController();
      const mockLocal = {
        id: 'mocked-uuid',
        nome: 'Novo Local',
        cidade: 'São Paulo'
      };
      mockRepository.createLocal.mockResolvedValue(mockLocal);

      const req = mockReq({}, {
        nome: 'Novo Local',
        cidade: 'São Paulo',
        latitude: -23.55,
        longitude: -46.63,
        criado_por: 'user-123'
      });
      const res = mockRes();

      await controller.createLocal(req, res);

      expect(mockRepository.createLocal).toHaveBeenCalledWith({
        id: 'mocked-uuid',
        nome: 'Novo Local',
        cidade: 'São Paulo',
        latitude: -23.55,
        longitude: -46.63,
        status: 'aprovado',
        criado_por: 'user-123'
      });
      expect(res.status).toHaveBeenCalledWith(201);
    });
  });
});