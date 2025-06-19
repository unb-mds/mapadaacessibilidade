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
