import express from "express";
const router = express.Router();
import { buscarLocais, createLocal } from "../controllers/locaisController.js";

/**
 * @swagger
 * tags:
 *   name: Locais
 *   description: Gerenciamento de locais acessíveis
 */

/**
 * @swagger
 * /locais:
 *   get:
 *     summary: Busca locais com filtros avançados
 *     tags: [Locais]
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         description: Nome ou parte do nome do local
 *       - in: query
 *         name: cidade
 *         schema:
 *           type: string
 *         description: Cidade do local
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: string
 *         description: Tipo de estabelecimento
 *       - in: query
 *         name: raio
 *         schema:
 *           type: number
 *           format: float
 *         description: Raio de busca em metros (requer coordenadas)
 *       - in: query
 *         name: latitude
 *         schema:
 *           type: number
 *           format: float
 *         description: Latitude para busca por proximidade
 *       - in: query
 *         name: longitude
 *         schema:
 *           type: number
 *           format: float
 *         description: Longitude para busca por proximidade
 *     responses:
 *       200:
 *         description: Lista de locais encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Local'
 *       500:
 *         description: Erro no servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.get("/", buscarLocais);

/**
 * @swagger
 * /locais:
 *   post:
 *     summary: Cria um novo local
 *     tags: [Locais]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoLocal'
 *     responses:
 *       201:
 *         description: Local criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LocalCriado'
 *       500:
 *         description: Erro ao criar local
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroDetalhado'
 */
router.post("/", createLocal);

export default router;
