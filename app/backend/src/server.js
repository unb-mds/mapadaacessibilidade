import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import locaisRoutes from "./routes/locaisRouter.js";
import usuariosRoutes from "./routes/usuariosRoutes.js";
import acessibilidadeRouter from "./routes/acessibilidadeRouter.js";
import acessibilidadeLocalRouter from "./routes/acessibilidadeLocalRouter.js";

const prisma = new PrismaClient();
const app = express();
const port = 3000;


app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use("/locais", locaisRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/", acessibilidadeRouter);
app.use("/acessibilidade-local", acessibilidadeLocalRouter);

app.get("/usuarios", async (req, res) => {
  const users = await prisma.usuario.findMany();

  res.status(200).json(users);
});

app.listen(port, () => {
  console.log(`Servidor funcionando http://localhost:${port}`);
});