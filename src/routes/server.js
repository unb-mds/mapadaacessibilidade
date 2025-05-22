import express from 'express'
import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()
const app = express()
app.use(express.json())

// Rota para buscar locais (existente ou nova)
app.get('/locais', async (req, res) => {
  const { nome, cidade, tipo, raio, latitude, longitude } = req.query;

  try {
    // Construir filtros dinâmicos
    const where = {};
    
    if (nome) {
      where.nome = { contains: nome, mode: 'insensitive' };
    }
    
    if (cidade) {
      where.cidade = { equals: cidade, mode: 'insensitive' };
    }
    
    if (tipo) {
      where.tipo = { equals: tipo, mode: 'insensitive' };
    }

    // Busca por proximidade (raio + coordenadas)
    if (raio && latitude && longitude) {
      const radiusInMeters = parseFloat(raio);
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);

      // Filtro geográfico usando extensão PostGIS
      where.geolocalizacao = {
        not: null,
        // ST_DWithin em formato Prisma
        // Nota: Isso pode variar dependendo da sua versão do Prisma/PostgreSQL
      };
    }

    const locais = await prisma.local.findMany({
      where,
      include: {
        acessibilidades: true, // Inclui relacionamentos se necessário
        avaliacoes: true
      },
      orderBy: {
        nome: 'asc' // Ordena por nome
      }
    });

    // Se busca por proximidade, calcular distâncias
    if (raio && latitude && longitude) {
      const locaisComDistancia = locais.map(local => {
        // Calcular distância (simplificado - implementação real depende do PostGIS)
        const distancia = calcularDistancia(
          lat, lng,
          local.latitude, local.longitude
        );
        return { ...local, distancia };
      }).filter(local => local.distancia <= radiusInMeters)
        .sort((a, b) => a.distancia - b.distancia);

      return res.status(200).json(locaisComDistancia);
    }

    res.status(200).json(locais);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar locais.' });
  }
});

// Função auxiliar para cálculo de distância (simplificada)
function calcularDistancia(lat1, lon1, lat2, lon2) {
  // Implementação simplificada - na prática use PostGIS ST_Distance
  const R = 6371e3; // Raio da Terra em metros
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c; // Distância em metros
}

// Suas rotas existentes de usuários...
app.get('/usuarios', async(req, res) => {
  const users = await prisma.usuario.findMany()
  res.status(200).json(users)
})

app.post('/usuarios', async (req, res) => {
  const { nome, email, senha, papel } = req.body;

  if (!nome || !email || !senha || !papel) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  const senhaHash = crypto.createHash('sha256').update(senha).digest('hex');

  try {
    const novoUsuario = await prisma.usuario.create({
      data: {
        id: uuidv4(),
        nome,
        email,
        senha_hash: senhaHash,
        papel
      }
    });

    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error(error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Email já cadastrado.' });
    }
    res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
  }
});

app.listen(3000, () => {
  console.log('Servidor funcionando http://localhost:3000')
})
