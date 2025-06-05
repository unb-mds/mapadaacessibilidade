import express from "express";
const router = express.Router();
import { cadastrarUsuario } from "../controllers/usuariosController.js";

router.post("/", cadastrarUsuario);

export default router;
