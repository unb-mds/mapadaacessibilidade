import express from "express";
import {
  cadastrarUsuario,
  loginUsuario,
} from "../controllers/usuariosController.js";

const router = express.Router();

router.post("/usuarios", cadastrarUsuario);
router.post("/usuarios/login", loginUsuario);

export default router;
