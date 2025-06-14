import express from "express";
import {
  cadastrarUsuario,
  loginUsuario,
  listarUsuarios,
} from "../controllers/usuariosController.js";

const router = express.Router();

router.get("/usuarios", listarUsuarios);
router.post("/usuarios", cadastrarUsuario);
router.post("/usuarios/login", loginUsuario);

export default router;