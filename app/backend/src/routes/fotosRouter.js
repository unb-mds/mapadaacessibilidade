import express from "express";
const router = express.Router();
import { buscarFotos, createFotos } from "../controllers/fotosController.js";

router.get("/", buscarFotos);
router.post("/", createFotos);

export default router;