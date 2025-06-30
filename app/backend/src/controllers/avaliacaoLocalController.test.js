import { AvaliacaoLocalController } from '../controllers/avaliacaoLocalController.js';
import { jest } from '@jest/globals';

// Mock do repositório
const mockRepository = {
  avaliacao: {
    findUnique: jest.fn(),
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn()
  },
  local: {
    findUnique: jest.fn()
  }
};

// Configuração do controller para teste
const setupController = () => {
  const controller = new AvaliacaoLocalController(mockRepository);
  
  const mockReq = (params = {}, query = {}, body = {}) => ({ 
    params, 
    query, 
    body 
  });
  
  const mockRes = () => {
    const res = {};
    res.status = jest.fn(() => res);
    res.json = jest.fn(() => res);
    return res;
  };
  
  return { controller, mockReq, mockRes };
};

describe('AvaliacaoLocalController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('criarAvaliacaoLocal', () => {
    it('deve criar uma nova avaliação com dados válidos', async () => {
      const { controller, mockReq, mockRes } = setupController();
      
      const mockAvaliacao = {
        id: 'avaliacao-123',
        nota: 5,
        comentario: 'Ótimo local!',
        fk_usuario_id: 'user-123',
        fk_local_id: 'local-456',
        usuario: { nome: 'Usuário Teste' },
        local: { nome: 'Local Teste' }
      };
      
      mockRepository.avaliacao.findUnique.mockResolvedValue(null);
      mockRepository.avaliacao.create.mockResolvedValue(mockAvaliacao);

      const req = mockReq({}, {}, {
        nota: 5,
        comentario: 'Ótimo local!',
        fk_usuario_id: 'user-123',
        fk_local_id: 'local-456'
      });
      const res = mockRes();

      await controller.criarAvaliacaoLocal(req, res);

      expect(mockRepository.avaliacao.findUnique).toHaveBeenCalledWith({
        where: {
          fk_usuario_id_fk_local_id: {
            fk_usuario_id: 'user-123',
            fk_local_id: 'local-456'
          }
        }
      });
      expect(mockRepository.avaliacao.create).toHaveBeenCalledWith({
        data: {
          nota: 5,
          comentario: 'Ótimo local!',
          fk_usuario_id: 'user-123',
          fk_local_id: 'local-456'
        },
        include: {
          usuario: { select: { nome: true } },
          local: { select: { nome: true } }
        }
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Avaliação criada com sucesso",
        avaliacao: mockAvaliacao
      });
    });

    it('deve retornar erro 400 se usuário já avaliou o local', async () => {
      const { controller, mockReq, mockRes } = setupController();
      
      const mockAvaliacaoExistente = {
        id: 'avaliacao-123',
        nota: 4,
        fk_usuario_id: 'user-123',
        fk_local_id: 'local-456'
      };
      
      mockRepository.avaliacao.findUnique.mockResolvedValue(mockAvaliacaoExistente);

      const req = mockReq({}, {}, {
        nota: 5,
        fk_usuario_id: 'user-123',
        fk_local_id: 'local-456'
      });
      const res = mockRes();

      await controller.criarAvaliacaoLocal(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Usuário já avaliou este local"
      });
    });
  });

  describe('listarAvaliacoesLocal', () => {
    it('deve retornar avaliações de um local com média calculada', async () => {
      const { controller, mockReq, mockRes } = setupController();
      
      const mockAvaliacoes = [
        { id: 'avaliacao-1', nota: 5, fk_usuario_id: 'user-1', fk_local_id: 'local-123', usuario: { id: 'user-1', nome: 'Usuário 1' } },
        { id: 'avaliacao-2', nota: 4, fk_usuario_id: 'user-2', fk_local_id: 'local-123', usuario: { id: 'user-2', nome: 'Usuário 2' } }
      ];
      
      const mockLocal = {
        id: 'local-123',
        nome: 'Local Teste'
      };
      
      mockRepository.avaliacao.findMany.mockResolvedValue(mockAvaliacoes);
      mockRepository.local.findUnique.mockResolvedValue(mockLocal);

      const req = mockReq({ local_id: 'local-123' });
      const res = mockRes();

      await controller.listarAvaliacoesLocal(req, res);

      expect(mockRepository.avaliacao.findMany).toHaveBeenCalledWith({
        where: { fk_local_id: 'local-123' },
        include: {
          usuario: { select: { id: true, nome: true } }
        },
        orderBy: { created_at: 'desc' }
      });
      expect(mockRepository.local.findUnique).toHaveBeenCalledWith({
        where: { id: 'local-123' },
        select: { id: true, nome: true }
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        local: mockLocal,
        media_avaliacoes: '4.5',
        total_avaliacoes: 2,
        avaliacoes: mockAvaliacoes
      });
    });

    it('deve retornar média 0 quando não há avaliações', async () => {
      const { controller, mockReq, mockRes } = setupController();
      
      mockRepository.avaliacao.findMany.mockResolvedValue([]);
      mockRepository.local.findUnique.mockResolvedValue({ id: 'local-123', nome: 'Local Teste' });

      const req = mockReq({ local_id: 'local-123' });
      const res = mockRes();

      await controller.listarAvaliacoesLocal(req, res);

      expect(res.json).toHaveBeenCalledWith({
        local: { id: 'local-123', nome: 'Local Teste' },
        media_avaliacoes: '0.0',
        total_avaliacoes: 0,
        avaliacoes: []
      });
    });
  });

  describe('obterAvaliacaoUsuarioLocal', () => {
    it('deve retornar a avaliação de um usuário para um local específico', async () => {
      const { controller, mockReq, mockRes } = setupController();
      
      const mockAvaliacao = {
        id: 'avaliacao-123',
        nota: 5,
        comentario: 'Excelente!',
        fk_usuario_id: 'user-123',
        fk_local_id: 'local-456',
        usuario: { nome: 'Usuário Teste' },
        local: { nome: 'Local Teste' }
      };
      
      mockRepository.avaliacao.findUnique.mockResolvedValue(mockAvaliacao);

      const req = mockReq({ usuario_id: 'user-123', local_id: 'local-456' });
      const res = mockRes();

      await controller.obterAvaliacaoUsuarioLocal(req, res);

      expect(mockRepository.avaliacao.findUnique).toHaveBeenCalledWith({
        where: {
          fk_usuario_id_fk_local_id: {
            fk_usuario_id: 'user-123',
            fk_local_id: 'local-456'
          }
        },
        include: {
          usuario: { select: { nome: true } },
          local: { select: { nome: true } }
        }
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockAvaliacao);
    });

    it('deve retornar 404 se avaliação não for encontrada', async () => {
      const { controller, mockReq, mockRes } = setupController();
      
      mockRepository.avaliacao.findUnique.mockResolvedValue(null);

      const req = mockReq({ usuario_id: 'user-123', local_id: 'local-456' });
      const res = mockRes();

      await controller.obterAvaliacaoUsuarioLocal(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Avaliação não encontrada"
      });
    });
  });

  describe('atualizarAvaliacaoLocal', () => {
    it('deve atualizar uma avaliação existente', async () => {
      const { controller, mockReq, mockRes } = setupController();
      
      const mockAvaliacaoAtualizada = {
        id: 'avaliacao-123',
        nota: 4,
        comentario: 'Muito bom, mas poderia melhorar',
        fk_usuario_id: 'user-123',
        fk_local_id: 'local-456',
        usuario: { nome: 'Usuário Teste' },
        local: { nome: 'Local Teste' }
      };
      
      mockRepository.avaliacao.update.mockResolvedValue(mockAvaliacaoAtualizada);

      const req = mockReq(
        { usuario_id: 'user-123', local_id: 'local-456' }, 
        {}, 
        { nota: 4, comentario: 'Muito bom, mas poderia melhorar' }
      );
      const res = mockRes();

      await controller.atualizarAvaliacaoLocal(req, res);

      expect(mockRepository.avaliacao.update).toHaveBeenCalledWith({
        where: {
          fk_usuario_id_fk_local_id: {
            fk_usuario_id: 'user-123',
            fk_local_id: 'local-456'
          }
        },
        data: { 
          nota: 4, 
          comentario: 'Muito bom, mas poderia melhorar' 
        },
        include: {
          usuario: { select: { nome: true } },
          local: { select: { nome: true } }
        }
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Avaliação atualizada com sucesso",
        avaliacao: mockAvaliacaoAtualizada
      });
    });

    it('deve retornar 404 se avaliação não for encontrada para atualização', async () => {
      const { controller, mockReq, mockRes } = setupController();
      
      const error = new Error('Not found');
      error.code = 'P2025';
      mockRepository.avaliacao.update.mockRejectedValue(error);

      const req = mockReq(
        { usuario_id: 'user-123', local_id: 'local-456' }, 
        {}, 
        { nota: 4 }
      );
      const res = mockRes();

      await controller.atualizarAvaliacaoLocal(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Avaliação não encontrada para atualização"
      });
    });
  });

  describe('removerAvaliacaoLocal', () => {
    it('deve remover uma avaliação existente', async () => {
      const { controller, mockReq, mockRes } = setupController();
      
      mockRepository.avaliacao.delete.mockResolvedValue({});

      const req = mockReq({ usuario_id: 'user-123', local_id: 'local-456' });
      const res = mockRes();

      await controller.removerAvaliacaoLocal(req, res);

      expect(mockRepository.avaliacao.delete).toHaveBeenCalledWith({
        where: {
          fk_usuario_id_fk_local_id: {
            fk_usuario_id: 'user-123',
            fk_local_id: 'local-456'
          }
        }
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Avaliação removida com sucesso"
      });
    });

    it('deve retornar 404 se avaliação não for encontrada para remoção', async () => {
      const { controller, mockReq, mockRes } = setupController();
      
      const error = new Error('Not found');
      error.code = 'P2025';
      mockRepository.avaliacao.delete.mockRejectedValue(error);

      const req = mockReq({ usuario_id: 'user-123', local_id: 'local-456' });
      const res = mockRes();

      await controller.removerAvaliacaoLocal(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Avaliação não encontrada para remoção"
      });
    });
  });

  describe('listarAvaliacoesFiltradas', () => {
    it('deve retornar avaliações filtradas com paginação', async () => {
      const { controller, mockReq, mockRes } = setupController();
      
      const mockAvaliacoes = [
        { 
          id: 'avaliacao-1', 
          nota: 5, 
          created_at: new Date('2023-01-01'),
          usuario: { nome: 'Usuário 1' },
          local: { nome: 'Local 1' }
        },
        { 
          id: 'avaliacao-2', 
          nota: 4, 
          created_at: new Date('2023-01-02'),
          usuario: { nome: 'Usuário 2' },
          local: { nome: 'Local 1' }
        }
      ];
      
      mockRepository.avaliacao.findMany.mockResolvedValue(mockAvaliacoes);
      mockRepository.avaliacao.count.mockResolvedValue(15);

      const req = mockReq(
        {}, 
        { 
          nota_min: '4', 
          nota_max: '5', 
          data_inicio: '2023-01-01', 
          data_fim: '2023-01-31',
          page: '2',
          limit: '5'
        }
      );
      const res = mockRes();

      await controller.listarAvaliacoesFiltradas(req, res);

      expect(mockRepository.avaliacao.findMany).toHaveBeenCalledWith({
        where: {
          nota: { 
            gte: 4,
            lte: 5
          },
          created_at: { 
            gte: new Date('2023-01-01'), 
            lte: new Date('2023-01-31') 
          }
        },
        skip: 5,
        take: 5,
        include: { 
          usuario: { select: { nome: true } },
          local: { select: { nome: true } }
        },
        orderBy: { created_at: 'desc' }
      });
      expect(mockRepository.avaliacao.count).toHaveBeenCalledWith({
        where: {
          nota: { 
            gte: 4,
            lte: 5
          },
          created_at: { 
            gte: new Date('2023-01-01'), 
            lte: new Date('2023-01-31') 
          }
        }
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        meta: {
          total: 15,
          page: 2,
          limit: 5,
          hasNext: true
        },
        data: mockAvaliacoes
      });
    });
  });
});