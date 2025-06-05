import express from "express";
import { PrismaClient } from "@prisma/client";
import localRoutes from "./routes/localRoutes.js";
import usuariosRoutes from "./routes/usuariosRoutes.js";

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());
app.use(localRoutes);
app.use("/usuarios", usuariosRoutes);

app.get("/usuarios", async (req, res) => {
  const users = await prisma.usuario.findMany();

  res.status(200).json(users);
});

app.get("/locais", async (req, res) => {
  const { nome, cidade, tipo, raio, latitude, longitude } = req.query;

  try {
    const where = {};

    if (nome) {
      where.nome = { contains: nome, mode: "insensitive" };
    }

    if (cidade) {
      where.cidade = { equals: cidade, mode: "insensitive" };
    }

    if (tipo) {
      where.tipo = { equals: tipo, mode: "insensitive" };
    }

    if (raio && latitude && longitude) {
      const radiusInMeters = parseFloat(raio);
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);

      where.geolocalizacao = {
        not: null,
      };
    }

    const locais = await prisma.local.findMany({
      where,
      include: {
        acessibilidades: true,
        avaliacoes: true,
      },
      orderBy: {
        nome: "asc",
      },
    });

    if (raio && latitude && longitude) {
      const locaisComDistancia = locais
        .map((local) => {
          const distancia = calcularDistancia(
            lat,
            lng,
            local.latitude,
            local.longitude
          );
          return { ...local, distancia };
        })
        .filter((local) => local.distancia <= radiusInMeters)
        .sort((a, b) => a.distancia - b.distancia);

      return res.status(200).json(locaisComDistancia);
    }

    res.status(200).json(locais);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar locais." });
  }
});

function calcularDistancia(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

app.listen(port, () => {
  console.log(`Servidor funcionando http://localhost:${port}`);
});
