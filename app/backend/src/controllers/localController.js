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

        if (!nome) {
            return res.status(400).json({ error: "Nome é obrigatório" });
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
                longitude,
                latitude,
                status: 'ativo',
                criado_por: 'Caio',
                created_at: new Date('2025-05-25T20:09:29Z'),
                updated_at: new Date('2025-05-25T20:09:29Z')
            }
        });

        return res.status(201).json({
            message: 'Local criado com sucesso',
            local: novoLocal
        });

    } catch (error) {
        console.error('Erro ao criar local:', error);
        return res.status(500).json({
            error: 'Erro interno ao criar local',
            details: error.message
        });
    }
};

module.exports = {
    createLocal
};