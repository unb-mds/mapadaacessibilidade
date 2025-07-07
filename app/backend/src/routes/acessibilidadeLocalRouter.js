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

// Rotas sem middlewares de validação
router.post("/", adicionarAcessibilidadeLocal);

router.get("/local/:local_id", listarAcessibilidadesLocal);

router.get("/acessibilidade/:acessibilidade_id", listarLocaisAcessibilidade);

router.put("/local/:local_id/acessibilidade/:acessibilidade_id", atualizarAcessibilidadeLocal);

router.delete("/local/:local_id/acessibilidade/:acessibilidade_id", removerAcessibilidadeLocal);

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
 *     security:
 *       - bearerAuth: []
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
 *                 description: ID do local
 *               acessibilidade_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID da acessibilidade
 *     responses:
 *       201:
 *         description: Acessibilidade adicionada com sucesso ao local
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/AcessibilidadeLocal'
 *       400:
 *         description: Requisição inválida - dados obrigatórios ausentes
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Local ou acessibilidade não encontrados
 *       409:
 *         description: Associação já existe
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
 *         description: Lista de acessibilidades do local
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 local:
 *                   $ref: '#/components/schemas/Local'
 *                 acessibilidades:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Acessibilidade'
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
 *         description: Lista de locais com a acessibilidade
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 acessibilidade:
 *                   $ref: '#/components/schemas/Acessibilidade'
 *                 locais:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Local'
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
 *     security:
 *       - bearerAuth: []
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
 *                 enum: [ativo, inativo, em_manutencao]
 *                 description: Novo status da acessibilidade no local
 *               observacoes:
 *                 type: string
 *                 description: Observações sobre a acessibilidade
 *     responses:
 *       200:
 *         description: Associação atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/AcessibilidadeLocal'
 *       400:
 *         description: Requisição inválida
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Local, acessibilidade ou associação não encontrados
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /acessibilidade-local/local/{local_id}/acessibilidade/{acessibilidade_id}:
 *   delete:
 *     summary: Remove a associação de acessibilidade de um local
 *     tags: [AcessibilidadeLocal]
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Local, acessibilidade ou associação não encontrados
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AcessibilidadeLocal:
 *       type: object
 *       properties:
 *         local_id:
 *           type: string
 *           format: uuid
 *         acessibilidade_id:
 *           type: string
 *           format: uuid
 *         status:
 *           type: string
 *           enum: [ativo, inativo, em_manutencao]
 *         observacoes:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */