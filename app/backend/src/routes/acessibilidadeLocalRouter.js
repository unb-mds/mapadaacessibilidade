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
