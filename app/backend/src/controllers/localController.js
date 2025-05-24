const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');
const prisma = new PrismaClient();

const createLocal = async (req, res) => {
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
            latitude
        } = req.body;

        // Validação dos campos obrigatórios
        if (!nome) {
            return res.status(400).json({ error: "Nome é obrigatório" });
        }

        // Criação do local
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
                longitude: longitude ? parseFloat(longitude) : null,
                latitude: latitude ? parseFloat(latitude) : null,
                status: 'ativo', // Status padrão conforme schema
                criado_por: req.user.id, // Assumindo que você tem middleware de autenticação
                created_at: new Date(),
                updated_at: new Date()
            }
        });

        return res.status(201).json(novoLocal);
    } catch (error) {
        console.error('Erro ao criar local:', error);
        return res.status(500).json({ error: 'Erro interno ao criar local' });
    }
};

module.exports = {
    createLocal
};