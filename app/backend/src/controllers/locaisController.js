import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const buscarLocais = async (req, res) => {
    const { nome, cidade, tipo, raio, latitude, longitude } = req.query

    try {
        // Construir objeto de filtro
        const where = {}
        
        if (nome) where.nome = { contains: nome, mode: 'insensitive' }
        if (cidade) where.cidade = { equals: cidade, mode: 'insensitive' }
        if (tipo) where.tipo = { equals: tipo, mode: 'insensitive' }

        // Busca no banco de dados
        const locais = await prisma.local.findMany({
            where,
            include: {
                acessibilidades: true,
                avaliacoes: true
            }
        })

        // Filtro por proximidade (se coordenadas fornecidas)
        if (raio && latitude && longitude) {
            const locaisFiltrados = locais.filter(local => {
                const distancia = calcularDistancia(
                    parseFloat(latitude),
                    parseFloat(longitude),
                    local.latitude,
                    local.longitude
                )
                return distancia <= parseFloat(raio)
            }).sort((a, b) => a.distancia - b.distancia)
            
            return res.status(200).json(locaisFiltrados)
        }

        res.status(200).json(locais)
    } catch (error) {
        console.error('Erro na busca de locais:', error)
        res.status(500).json({ error: 'Erro ao buscar locais' })
    } finally {
        await prisma.$disconnect()
    }
}

// Função auxiliar para cálculo de distância
function calcularDistancia(lat1, lon1, lat2, lon2) {
    // Implementação do cálculo de distância
    // ... (mesma implementação anterior)
}
