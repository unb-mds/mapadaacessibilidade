import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
const prisma = new PrismaClient();

export const buscarFotos = async (req, res) => {
  const { url, status, fk_usuario_id, fk_local_id } = req.query;
  try {
    const where = {};
    if (url) where.url = { contains: url };
    if (status) where.status = status;
    if (fk_usuario_id) where.fk_usuario_id = fk_usuario_id;
    if (fk_local_id) where.fk_local_id = fk_local_id;

    const fotos = await prisma.foto.findMany({
      where,
      include: {
        usuario: true,
        local: true,
      },
    });

    res.status(200).json(fotos);
  } catch (error) {
    console.error("Erro ao buscar fotos:", error);
    res.status(500).json({ error: "Erro ao buscar fotos" });
  } finally {
    await prisma.$disconnect();
  }
};

export const createFotos = async (req, res) => {
  try {
    const fotosData = req.body;

    if (!Array.isArray(fotosData) || fotosData.length === 0) {
      return res.status(400).json({
        error:
          "O corpo da requisição deve ser um array de objetos de foto não vazio.",
      });
    }

    const createdFotos = [];
    const errors = [];

    for (let i = 0; i < fotosData.length; i++) {
      const foto = fotosData[i];
      const { url, status, fk_usuario_id, fk_local_id } = foto;

      if (!url || typeof url !== "string" || url.trim() === "") {
        errors.push(
          `Foto ${i + 1}: URL é obrigatória e deve ser uma string válida`,
        );
        continue;
      }

      if (!status || typeof status !== "string" || status.trim() === "") {
        errors.push(
          `Foto ${i + 1}: Status é obrigatório e deve ser uma string válida`,
        );
        continue;
      }

      if (
        !fk_usuario_id ||
        typeof fk_usuario_id !== "string" ||
        fk_usuario_id.trim() === ""
      ) {
        errors.push(
          `Foto ${i + 1}: ID do usuário é obrigatório e deve ser uma string válida`,
        );
        continue;
      }

      if (
        !fk_local_id ||
        typeof fk_local_id !== "string" ||
        fk_local_id.trim() === ""
      ) {
        errors.push(
          `Foto ${i + 1}: ID do local é obrigatório e deve ser uma string válida`,
        );
        continue;
      }

      try {
        const novaFoto = await prisma.foto.create({
          data: {
            url: url.trim(),
            status: status.trim(),
            fk_usuario_id: fk_usuario_id.trim(),
            fk_local_id: fk_local_id.trim(),
          },
        });
        createdFotos.push(novaFoto);
      } catch (dbError) {
        console.error(`Erro ao criar foto ${i + 1}:`, dbError);
        errors.push(
          `Foto ${i + 1}: Erro ao salvar no banco - ${dbError.message}`,
        );
      }
    }

    if (createdFotos.length === 0) {
      return res.status(400).json({
        error: "Nenhuma foto válida foi criada",
        details: errors,
      });
    }

    const response = {
      message: `${createdFotos.length} fotos criadas com sucesso!`,
      fotos: createdFotos,
    };

    if (errors.length > 0) {
      response.warnings = errors;
      response.message += ` (${errors.length} fotos falharam)`;
    }

    return res.status(201).json(response);
  } catch (error) {
    console.error("Erro geral ao criar fotos:", error);
    return res.status(500).json({
      error: "Erro interno do servidor",
      details:
        process.env.NODE_ENV === "development" ? error.message : "Erro interno",
    });
  }
};
