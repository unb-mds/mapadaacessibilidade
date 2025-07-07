import { EventoController } from '../controllers/eventosController.js';
import { jest } from '@jest/globals';

// Mock do repositório
const mockRepository = {
  findEventos: jest.fn(),
  findEventoById: jest.fn(),
  createEvento: jest.fn(),
  updateEvento: jest.fn(),
  deleteEvento: jest.fn()
};

// Mock do UUID
const mockUuid = {
  v4: jest.fn(() => 'mocked-uuid')
};

// Configuração do controller para teste
const setupController = () => {
  const controller = new EventoController(mockRepository, mockUuid);
  
  const mockReq = (query = {}, body = {}, params = {}) => ({ query, body, params });
  
  const mockRes = () => {
    const res = {};
    res.status = jest.fn(() => res);
    res.json = jest.fn(() => res);
    return res;
  };
  
  const mockNext = jest.fn();
  
  return { controller, mockReq, mockRes, mockNext };
};

describe('EventoController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('buscarEventos', () => {
    it('deve retornar eventos filtrados por nome', async () => {
      const { controller, mockReq, mockRes } = setupController();
      mockRepository.findEventos.mockResolvedValue([
        { 
          id: '1', 
          nome: 'Workshop Acessibilidade', 
          status: 'ativo',
          local: { nome: 'Centro Cultural' }
        }
      ]);

      const req = mockReq({ nome: 'Workshop' });
      const res = mockRes();

      await controller.buscarEventos(req, res);

      expect(mockRepository.findEventos).toHaveBeenCalledWith({
        nome: { contains: 'Workshop', mode: 'insensitive' }
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { 
          id: '1', 
          nome: 'Workshop Acessibilidade', 
          status: 'ativo',
          local: { nome: 'Centro Cultural' }
        }
      ]);
    });

    it('deve filtrar por status', async () => {
      const { controller, mockReq, mockRes } = setupController();
      mockRepository.findEventos.mockResolvedValue([
        { id: '1', nome: 'Evento Ativo', status: 'ativo' }
      ]);

      const req = mockReq({ status: 'ativo' });
      const res = mockRes();

      await controller.buscarEventos(req, res);

      expect(mockRepository.findEventos).toHaveBeenCalledWith({
        status: { equals: 'ativo', mode: 'insensitive' }
      });
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('deve filtrar por local_id', async () => {
      const { controller, mockReq, mockRes } = setupController();
      mockRepository.findEventos.mockResolvedValue([
        { id: '1', nome: 'Evento no Local', fk_local_id: 'local-123' }
      ]);

      const req = mockReq({ local_id: 'local-123' });
      const res = mockRes();

      await controller.buscarEventos(req, res);

      expect(mockRepository.findEventos).toHaveBeenCalledWith({
        fk_local_id: 'local-123'
      });
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('deve filtrar por intervalo de datas', async () => {
      const { controller, mockReq, mockRes } = setupController();
      mockRepository.findEventos.mockResolvedValue([
        { 
          id: '1', 
          nome: 'Evento Futuro', 
          data_inicio: new Date('2025-08-01T10:00:00Z')
        }
      ]);

      const req = mockReq({ 
        data_inicio: '2025-07-01T00:00:00Z',
        data_fim: '2025-08-31T23:59:59Z'
      });
      const res = mockRes();

      await controller.buscarEventos(req, res);

      expect(mockRepository.findEventos).toHaveBeenCalledWith({
        data_inicio: {
          gte: new Date('2025-07-01T00:00:00Z'),
          lte: new Date('2025-08-31T23:59:59Z')
        }
      });
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('deve retornar erro 500 quando repository falha', async () => {
      const { controller, mockReq, mockRes } = setupController();
      mockRepository.findEventos.mockRejectedValue(new Error('Database error'));

      const req = mockReq();
      const res = mockRes();

      await controller.buscarEventos(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Erro ao buscar eventos"
      });
    });
  });

  describe('createEvento', () => {
    it('deve criar um novo evento com dados válidos', async () => {
      const { controller, mockReq, mockRes } = setupController();
      const mockEvento = {
        id: 'mocked-uuid',
        nome: 'Novo Evento',
        status: 'ativo',
        data_inicio: new Date('2025-08-01T10:00:00Z'),
        data_fim: new Date('2025-08-01T18:00:00Z')
      };
      mockRepository.createEvento.mockResolvedValue(mockEvento);

      const req = mockReq({}, {
        nome: 'Novo Evento',
        status: 'ativo',
        descricao: 'Descrição do evento',
        data_inicio: '2025-08-01T10:00:00Z',
        data_fim: '2025-08-01T18:00:00Z',
        fk_local_id: 'local-123'
      });
      const res = mockRes();

      await controller.createEvento(req, res);

      expect(mockRepository.createEvento).toHaveBeenCalledWith({
        id: 'mocked-uuid',
        nome: 'Novo Evento',
        status: 'ativo',
        descricao: 'Descrição do evento',
        data_inicio: '2025-08-01T10:00:00Z',
        data_fim: '2025-08-01T18:00:00Z',
        fk_local_id: 'local-123'
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Evento criado com sucesso",
        evento: mockEvento
      });
    });

    it('deve retornar erro 400 quando nome não é fornecido', async () => {
      const { controller, mockReq, mockRes } = setupController();

      const req = mockReq({}, { status: 'ativo' }); // faltando nome
      const res = mockRes();

      await controller.createEvento(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Nome e status são obrigatórios"
      });
    });

    it('deve retornar erro 400 quando status não é fornecido', async () => {
      const { controller, mockReq, mockRes } = setupController();

      const req = mockReq({}, { nome: 'Evento Teste' }); // faltando status
      const res = mockRes();

      await controller.createEvento(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Nome e status são obrigatórios"
      });
    });

    it('deve retornar erro 500 quando repository falha', async () => {
      const { controller, mockReq, mockRes } = setupController();
      mockRepository.createEvento.mockRejectedValue(new Error('Database error'));

      const req = mockReq({}, {
        nome: 'Evento Teste',
        status: 'ativo'
      });
      const res = mockRes();

      await controller.createEvento(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Erro interno ao criar evento",
        details: "Database error"
      });
    });
  });

  describe('atualizarEvento', () => {
    it('deve atualizar um evento existente', async () => {
      const { controller, mockReq, mockRes } = setupController();
      const mockEventoAtualizado = {
        id: 'evento-123',
        nome: 'Evento Atualizado',
        status: 'cancelado'
      };
      mockRepository.updateEvento.mockResolvedValue(mockEventoAtualizado);

      const req = mockReq({}, 
        { nome: 'Evento Atualizado', status: 'cancelado' },
        { id: 'evento-123' }
      );
      const res = mockRes();

      await controller.atualizarEvento(req, res);

      expect(mockRepository.updateEvento).toHaveBeenCalledWith('evento-123', {
        nome: 'Evento Atualizado',
        status: 'cancelado'
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Evento atualizado com sucesso",
        evento: mockEventoAtualizado
      });
    });

    it('deve retornar erro 404 quando evento não existe', async () => {
      const { controller, mockReq, mockRes } = setupController();
      mockRepository.updateEvento.mockResolvedValue(null);

      const req = mockReq({}, 
        { nome: 'Evento Atualizado' },
        { id: 'evento-inexistente' }
      );
      const res = mockRes();

      await controller.atualizarEvento(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Evento não encontrado"
      });
    });

    it('deve retornar erro 500 quando repository falha', async () => {
      const { controller, mockReq, mockRes } = setupController();
      mockRepository.updateEvento.mockRejectedValue(new Error('Database error'));

      const req = mockReq({}, 
        { nome: 'Evento Atualizado' },
        { id: 'evento-123' }
      );
      const res = mockRes();

      await controller.atualizarEvento(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Erro interno ao atualizar evento",
        details: "Database error"
      });
    });
  });

  describe('deletarEvento', () => {
    it('deve deletar um evento existente', async () => {
      const { controller, mockReq, mockRes } = setupController();
      mockRepository.deleteEvento.mockResolvedValue(true);

      const req = mockReq({}, {}, { id: 'evento-123' });
      const res = mockRes();

      await controller.deletarEvento(req, res);

      expect(mockRepository.deleteEvento).toHaveBeenCalledWith('evento-123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Evento deletado com sucesso"
      });
    });

    it('deve retornar erro 404 quando evento não existe', async () => {
      const { controller, mockReq, mockRes } = setupController();
      mockRepository.deleteEvento.mockResolvedValue(false);

      const req = mockReq({}, {}, { id: 'evento-inexistente' });
      const res = mockRes();

      await controller.deletarEvento(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Evento não encontrado"
      });
    });

    it('deve retornar erro 500 quando repository falha', async () => {
      const { controller, mockReq, mockRes } = setupController();
      mockRepository.deleteEvento.mockRejectedValue(new Error('Database error'));

      const req = mockReq({}, {}, { id: 'evento-123' });
      const res = mockRes();

      await controller.deletarEvento(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Erro interno ao deletar evento",
        details: "Database error"
      });
    });
  });
});