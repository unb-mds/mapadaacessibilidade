import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../API-SWAGGER/swaggerConfig.js";

// Rotas
import locaisRoutes from "./routes/locaisRouter.js";
import usuariosRoutes from "./routes/usuariosRoutes.js";
import acessibilidadeRouter from "./routes/acessibilidadeRouter.js";
import acessibilidadeLocalRouter from "./routes/acessibilidadeLocalRouter.js";
import fotosRouter from "./routes/fotosRouter.js";
import avaliacaoLocalRouter from './routes/avaliacaoLocalRouter.js';
import eventosRoutes from "./routes/eventosRouter.js";


const prisma = new PrismaClient();
const app = express();
const port = 3000;

// Middlewares
app.use(
  cors({
    origin: ["http://localhost:3001", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

// Rotas
app.use("/locais", locaisRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/", acessibilidadeRouter);
app.use("/acessibilidade-local", acessibilidadeLocalRouter);
app.use("/fotos", fotosRouter);
app.use("/avaliacoes", avaliacaoLocalRouter);
app.use("/eventos", eventosRoutes);

// Rota Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health Check
app.get("/", (req, res) => res.sendStatus(200));

app.listen(port, () => {
  console.log(
    `Servidor Node.js ${process.version} rodando em http://localhost:${port}`,
  );
  console.log(`Swagger UI em http://localhost:${port}/api-docs`);
});
