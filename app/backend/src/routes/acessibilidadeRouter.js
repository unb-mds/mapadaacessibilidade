import express from "express";
import acessibilidadeController from "../controllers/acessibilidadeController.js";

const router = express.Router();

router.post("/acessibilidades", acessibilidadeController.createAcessibilidade);

router.use(acessibilidadeController.acessibilidadeErrorHandler);

export default router;
