import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

function calcularDistancia(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Raio da Terra em metros
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Função para listar locais com filtros
export const listarLocais = async (req, res) => {
  try {
    const { nome, cidade, tipo, raio, latitude, longitude, limite = 50 } = req.query;

    const where = {};

    if (nome) {
      where.nome = { 
        contains: nome, 
        mode: "insensitive" 
      };
    }

    if (cidade) {
      where.cidade = { 
        equals: cidade, 
        mode: "insensitive" 
      };
    }

    if (tipo) {
      where.tipo = { 
        equals: tipo, 
        mode: "insensitive" 
      };
    }

    const locais = await prisma.local.findMany({
      where,
      include: {
        acessibilidades: true,
        avaliacoes: {
          select: {
            id: true,
            nota: true,
            comentario: true,
            criado_em: true
          }
        }
      },
      take: parseInt(limite)
    });

    if (raio && latitude && longitude) {
      const lat = parseFloat(latitude);
      const lon = parseFloat(longitude);
      const raioMetros = parseFloat(raio);

      const locaisComDistancia = locais.map(local => {
        const distancia = calcularDistancia(
          lat,
          lon,
          local.latitude,
          local.longitude
        );
        return {
          ...local,
          distancia: Math.round(distancia) // Distância em metros
        };
      });

      const locaisFiltrados = locaisComDistancia
        .filter(local => local.distancia <= raioMetros)
        .sort((a, b) => a.distancia - b.distancia);

      return res.status(200).json({
        success: true,
        data: locaisFiltrados,
        total: locaisFiltrados.length,
        filtros: {
          nome: nome || null,
          cidade: cidade || null,
          tipo: tipo || null,
          raio: raioMetros,
          coordenadas: { latitude: lat, longitude: lon }
        }
      });
    }

    res.status(200).json({
      success: true,
      data: locais,
      total: locais.length,
      filtros: {
        nome: nome || null,
        cidade: cidade || null,
        tipo: tipo || null
      }
    });

  } catch (error) {
    console.error("Erro ao listar locais:", error);
    res.status(500).json({ 
      success: false,
      error: "Erro interno do servidor ao listar locais",
      message: error.message 
    });
  } finally {
    await prisma.$disconnect();
  }
};

export const criarLocal = async (req, res) => {
  try {
    const {
      nome,
      descricao,
      tipo,
      endereco,
      cidade,
      bairro,
      estado,
      longitude,
      latitude,
      criado_por
    } = req.body;

    if (!nome || !tipo || !cidade || !latitude || !longitude) {
      return res.status(400).json({
        success: false,
        error: "Campos obrigatórios não informados",
        campos_obrigatorios: ["nome", "tipo", "cidade", "latitude", "longitude"]
      });
    }

    const novoLocal = await prisma.local.create({
      data: {
        id: uuidv4(),
        nome,
        descricao,
        tipo,
        endereco,
        cidade,
        bairro,
        estado,
        longitude: parseFloat(longitude),
        latitude: parseFloat(latitude),
        status: "aprovado",
        criado_por,
        criado_em: new Date()
      },
      include: {
        acessibilidades: true,
        avaliacoes: true
      }
    });

    res.status(201).json({
      success: true,
      message: "Local criado com sucesso",
      data: novoLocal
    });

  } catch (error) {
    console.error("Erro ao criar local:", error);
    res.status(500).json({
      success: false,
      error: "Erro interno do servidor ao criar local",
      details: error.message
    });
  } finally {
    await prisma.$disconnect();
  }
};

export const buscarLocalPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const local = await prisma.local.findUnique({
      where: { id },
      include: {
        acessibilidades: true,
        avaliacoes: {
          include: {
            usuario: {
              select: {
                id: true,
                nome: true
              }
            }
          },
          orderBy: {
            criado_em: 'desc'
          }
        }
      }
    });

    if (!local) {
      return res.status(404).json({
        success: false,
        error: "Local não encontrado"
      });
    }

    res.status(200).json({
      success: true,
      data: local
    });

  } catch (error) {
    console.error("Erro ao buscar local:", error);
    res.status(500).json({
      success: false,
      error: "Erro interno do servidor ao buscar local",
      details: error.message
    });
  } finally {
    await prisma.$disconnect();
  }
};