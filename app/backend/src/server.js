import express from "express";
import { PrismaClient } from "@prisma/client";
import locaisRoutes from "./routes/locaisRouter.js";
import usuariosRoutes from "./routes/usuariosRoutes.js";
import acessibilidadeRouter from "./routes/acessibilidadeRouter.js";
import acessibilidadeLocalRouter from "./routes/acessibilidadeLocalRouter.js";

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../docs/swaggerConfig'); 

const locaisRoutes = require('./routes/locaisRouter');
const usuariosRoutes = require('./routes/usuariosRoutes');
const acessibilidadeRouter = require('./routes/acessibilidadeRouter');

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());
app.use("/locais", locaisRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/", acessibilidadeRouter);
app.use("/acessibilidade-local", acessibilidadeLocalRouter);

app.get("/usuarios", async (req, res) => {
  const users = await prisma.usuario.findMany();

  res.status(200).json(users);
});

// Rota da documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Servidor funcionando http://localhost:${port}`);
  console.log(`Documentação disponível em http://localhost:${port}/api-docs`);
});
