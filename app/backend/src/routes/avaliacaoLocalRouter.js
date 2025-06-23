import express from "express";
const router = express.Router();
import {
    criarAvaliacaoLocal,
    listarAvaliacoesLocal,
    obterAvaliacaoUsuarioLocal,
    atualizarAvaliacaoLocal,
    removerAvaliacaoLocal,
    avaliacaoLocalErrorHandler
} from "../controllers/avaliacaoLocalController.js";

// Criar avaliação para um local
router.post("/", criarAvaliacaoLocal);

// Listar todas as avaliações de um local
router.get("/local/:local_id", listarAvaliacoesLocal);

// Obter avaliação específica de um usuário em um local
router.get("/usuario/:usuario_id/local/:local_id", obterAvaliacaoUsuarioLocal);

// Atualizar avaliação de um usuário em um local
router.put("/usuario/:usuario_id/local/:local_id", atualizarAvaliacaoLocal);

// Remover avaliação de um usuário em um local
router.delete("/usuario/:usuario_id/local/:local_id", removerAvaliacaoLocal);

// Middleware de tratamento de erros
router.use(avaliacaoLocalErrorHandler);

export default router;

/**
 * @swagger
 * tags:
 *   name: Avaliacoes
 *   description: Endpoints para gerenciamento de avaliações de locais
 */

/**
 * @swagger
 * /avaliacoes:
 *   post:
 *     summary: Cria uma nova avaliação para um local
 *     tags: [Avaliacoes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nota
 *               - fk_usuario_id
 *               - fk_local_id
 *             properties:
 *               nota:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 description: Nota da avaliação (1-5)
 *               comentario:
 *                 type: string
 *                 description: Comentário opcional
 *               fk_usuario_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID do usuário que está avaliando
 *               fk_local_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID do local sendo avaliado
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Avaliacao'
 *       400:
 *         description: Dados inválidos ou usuário já avaliou este local
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /avaliacoes/local/{local_id}:
 *   get:
 *     summary: Lista todas as avaliações de um local específico
 *     tags: [Avaliacoes]
 *     parameters:
 *       - in: path
 *         name: local_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do local
 *     responses:
 *       200:
 *         description: Lista de avaliações com média
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 local:
 *                   $ref: '#/components/schemas/LocalBasico'
 *                 media_avaliacoes:
 *                   type: number
 *                   format: float
 *                 total_avaliacoes:
 *                   type: integer
 *                 avaliacoes:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Avaliacao'
 *       404:
 *         description: Local não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /avaliacoes/usuario/{usuario_id}/local/{local_id}:
 *   get:
 *     summary: Obtém a avaliação específica de um usuário para um local
 *     tags: [Avaliacoes]
 *     parameters:
 *       - in: path
 *         name: usuario_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do usuário
 *       - in: path
 *         name: local_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do local
 *     responses:
 *       200:
 *         description: Avaliação encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Avaliacao'
 *       404:
 *         description: Avaliação não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /avaliacoes/usuario/{usuario_id}/local/{local_id}:
 *   put:
 *     summary: Atualiza a avaliação de um usuário para um local
 *     tags: [Avaliacoes]
 *     parameters:
 *       - in: path
 *         name: usuario_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do usuário
 *       - in: path
 *         name: local_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do local
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nota:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comentario:
 *                 type: string
 *     responses:
 *       200:
 *         description: Avaliação atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Avaliacao'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Avaliação não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /avaliacoes/usuario/{usuario_id}/local/{local_id}:
 *   delete:
 *     summary: Remove a avaliação de um usuário para um local
 *     tags: [Avaliacoes]
 *     parameters:
 *       - in: path
 *         name: usuario_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do usuário
 *       - in: path
 *         name: local_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do local
 *     responses:
 *       204:
 *         description: Avaliação removida com sucesso
 *       404:
 *         description: Avaliação não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Avaliacao:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         nota:
 *           type: integer
 *         comentario:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         usuario:
 *           $ref: '#/components/schemas/UsuarioBasico'
 *         local:
 *           $ref: '#/components/schemas/LocalBasico'
 *     UsuarioBasico:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         nome:
 *           type: string
 *     LocalBasico:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         nome:
 *           type: string
 */
