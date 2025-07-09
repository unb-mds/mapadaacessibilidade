import express from "express";
import acessibilidadeController from "../controllers/acessibilidadeController.js";

const router = express.Router();

router.post("/acessibilidades", acessibilidadeController.createAcessibilidade);

router.use(acessibilidadeController.acessibilidadeErrorHandler);

export default router;

/**
 * @swagger
 * tags:
 *   name: Acessibilidades
 *   description: Gerenciamento de tipos de acessibilidade
 */

/**
 * @swagger
 * /acessibilidades:
 *   post:
 *     summary: Cria um novo tipo de acessibilidade
 *     tags: [Acessibilidades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovaAcessibilidade'
 *     responses:
 *       201:
 *         description: Acessibilidade criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AcessibilidadeCriada'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroDetalhado'
 */
