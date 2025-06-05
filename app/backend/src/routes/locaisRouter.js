import express from "express";
const router = express.Router();
import { buscarLocais } from "../controllers/locaisController.js";
import { createLocal } from "../controllers/locaisController.js";

router.get("/", buscarLocais);
router.post("/", createLocal);

export default router;
