import express from "express";
const router = express.Router();
import { 
  buscarEventos, 
  buscarEventoPorId, 
  createEvento, 
  atualizarEvento, 
  deletarEvento 
} from "../controllers/eventosController.js";

/**
 * @swagger
 * tags:
 *   name: Eventos
 *   description: Gerenciamento de eventos
 */

/**
 * @swagger
 * /eventos:
 *   get:
 *     summary: Busca eventos com filtros avançados
 *     tags: [Eventos]
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         description: Nome ou parte do nome do evento
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Status do evento
 *       - in: query
 *         name: local_id
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do local onde o evento acontece
 *       - in: query
 *         name: data_inicio
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Data mínima de início dos eventos
 *       - in: query
 *         name: data_fim
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Data máxima de início dos eventos
 *     responses:
 *       200:
 *         description: Lista de eventos encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Evento'
 *       500:
 *         description: Erro no servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.get("/", buscarEventos);

/**
 * @swagger
 * /eventos/{id}:
 *   get:
 *     summary: Busca um evento específico por ID
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID único do evento
 *     responses:
 *       200:
 *         description: Evento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evento'
 *       404:
 *         description: Evento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       500:
 *         description: Erro no servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.get("/:id", buscarEventoPorId);

/**
 * @swagger
 * /eventos:
 *   post:
 *     summary: Cria um novo evento
 *     tags: [Eventos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoEvento'
 *           examples:
 *             evento_basico:
 *               summary: Evento básico
 *               value:
 *                 nome: "Workshop de Acessibilidade"
 *                 status: "ativo"
 *             evento_completo:
 *               summary: Evento completo
 *               value:
 *                 nome: "Feira de Tecnologia Assistiva"
 *                 descricao: "Evento sobre novas tecnologias para acessibilidade"
 *                 data_inicio: "2025-07-15T09:00:00.000Z"
 *                 data_fim: "2025-07-15T18:00:00.000Z"
 *                 status: "ativo"
 *                 url_externa: "https://exemplo.com/evento"
 *                 fk_local_id: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       201:
 *         description: Evento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventoCriado'
 *       400:
 *         description: Dados inválidos ou obrigatórios ausentes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       500:
 *         description: Erro ao criar evento
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroDetalhado'
 */
router.post("/", createEvento);

/**
 * @swagger
 * /eventos/{id}:
 *   put:
 *     summary: Atualiza um evento existente
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID único do evento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoEvento'
 *           examples:
 *             atualizacao_parcial:
 *               summary: Atualização parcial
 *               value:
 *                 status: "cancelado"
 *             atualizacao_completa:
 *               summary: Atualização completa
 *               value:
 *                 nome: "Workshop de Acessibilidade - Atualizado"
 *                 descricao: "Descrição atualizada do evento"
 *                 data_inicio: "2025-08-15T09:00:00.000Z"
 *                 data_fim: "2025-08-15T18:00:00.000Z"
 *                 status: "ativo"
 *     responses:
 *       200:
 *         description: Evento atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventoAtualizado'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       404:
 *         description: Evento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       500:
 *         description: Erro ao atualizar evento
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroDetalhado'
 */
router.put("/:id", atualizarEvento);

/**
 * @swagger
 * /eventos/{id}:
 *   delete:
 *     summary: Remove um evento
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID único do evento
 *     responses:
 *       200:
 *         description: Evento deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Evento deletado com sucesso"
 *       404:
 *         description: Evento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       500:
 *         description: Erro ao deletar evento
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroDetalhado'
 */
router.delete("/:id", deletarEvento);

export default router;