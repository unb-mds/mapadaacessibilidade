import express from "express";
const router = express.Router();
import {
    adicionarAcessibilidadeLocal,
    removerAcessibilidadeLocal,
    atualizarAcessibilidadeLocal,
    listarAcessibilidadesLocal,
    listarLocaisAcessibilidade,
    acessibilidadeLocalErrorHandler
} from "../controllers/acessibilidadeLocalController.js";

// adicionar acessibilidade a um local
router.post("/", adicionarAcessibilidadeLocal);

// listar todas as acessibilidades de um local específico
router.get("/local/:local_id", listarAcessibilidadesLocal);

// listar todos os locais que possuem uma acessibilidade específica
router.get("/acessibilidade/:acessibilidade_id", listarLocaisAcessibilidade);

// atualizar status de acessibilidade em um local
router.put("/local/:local_id/acessibilidade/:acessibilidade_id", atualizarAcessibilidadeLocal);

// remover acessibilidade de um local
router.delete("/local/:local_id/acessibilidade/:acessibilidade_id", removerAcessibilidadeLocal);

// middleware de tratamento de erros
router.use(acessibilidadeLocalErrorHandler);

export default router;

/**
 * @swagger
 * tags:
 *   name: AcessibilidadeLocal
 *   description: Relacionamento entre acessibilidades e locais
 */

/**
 * @swagger
 * /acessibilidade-local:
 *   post:
 *     summary: Adiciona uma acessibilidade a um local
 *     tags: [AcessibilidadeLocal]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - local_id
 *               - acessibilidade_id
 *             properties:
 *               local_id:
 *                 type: string
 *                 format: uuid
 *               acessibilidade_id:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Acessibilidade adicionada com sucesso ao local
 *       400:
 *         description: Requisição inválida
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /acessibilidade-local/local/{local_id}:
 *   get:
 *     summary: Lista todas as acessibilidades de um local específico
 *     tags: [AcessibilidadeLocal]
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
 *         description: Lista de acessibilidades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Acessibilidade'
 *       404:
 *         description: Local não encontrado
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /acessibilidade-local/acessibilidade/{acessibilidade_id}:
 *   get:
 *     summary: Lista todos os locais que possuem uma acessibilidade específica
 *     tags: [AcessibilidadeLocal]
 *     parameters:
 *       - in: path
 *         name: acessibilidade_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da acessibilidade
 *     responses:
 *       200:
 *         description: Lista de locais
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Local'
 *       404:
 *         description: Acessibilidade não encontrada
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /acessibilidade-local/local/{local_id}/acessibilidade/{acessibilidade_id}:
 *   put:
 *     summary: Atualiza a associação de acessibilidade a um local
 *     tags: [AcessibilidadeLocal]
 *     parameters:
 *       - in: path
 *         name: local_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do local
 *       - in: path
 *         name: acessibilidade_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da acessibilidade
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: Novo status da acessibilidade no local
 *     responses:
 *       200:
 *         description: Associação atualizada com sucesso
 *       400:
 *         description: Requisição inválida
 *       404:
 *         description: Associação não encontrada
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /acessibilidade-local/local/{local_id}/acessibilidade/{acessibilidade_id}:
 *   delete:
 *     summary: Remove a associação de acessibilidade de um local
 *     tags: [AcessibilidadeLocal]
 *     parameters:
 *       - in: path
 *         name: local_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do local
 *       - in: path
 *         name: acessibilidade_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da acessibilidade
 *     responses:
 *       204:
 *         description: Associação removida com sucesso
 *       404:
 *         description: Associação não encontrada
 *       500:
 *         description: Erro no servidor
 */
