const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const validateLocal = async (req, res, next) => {
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

        const errors = [];

        // Validação de nome (obrigatório)
        if (!nome || nome.trim() === '') {
            errors.push("Nome é obrigatório");
        }

        // Validação de endereço (obrigatório)
        if (!endereco || endereco.trim() === '') {
            errors.push("Endereço é obrigatório");
        }

        // Validação de cidade (obrigatório)
        if (!cidade || cidade.trim() === '') {
            errors.push("Cidade é obrigatória");
        }

        // Validação de estado (obrigatório)
        if (!estado || estado.trim() === '') {
            errors.push("Estado é obrigatório");
        }

        // Se os campos principais estão presentes, verifica duplicata
        if (nome && cidade && estado) {
            // Verificação de duplicatas considerando nome, cidade e estado
            const localExistente = await prisma.local.findFirst({
                where: {
                    AND: [
                        {
                            nome: {
                                equals: nome.trim(),
                                mode: 'insensitive'
                            }
                        },
                        {
                            cidade: {
                                equals: cidade.trim(),
                                mode: 'insensitive'
                            }
                        },
                        {
                            estado: {
                                equals: estado.trim(),
                                mode: 'insensitive'
                            }
                        }
                    ]
                }
            });

            if (localExistente) {
                errors.push("Já existe um local cadastrado com este nome nesta cidade e estado");
            }
        }

        // Validação de coordenadas (obrigatórias)
        if (!longitude || !latitude) {
            errors.push("Latitude e longitude são obrigatórias");
        } else {
            const longParsed = parseFloat(longitude);
            const latParsed = parseFloat(latitude);

            if (isNaN(longParsed) || isNaN(latParsed)) {
                errors.push("Coordenadas devem ser números válidos");
            }

            // Atualiza valores parseados
            req.body.longitude = longParsed;
            req.body.latitude = latParsed;
        }

        // Sanitização básica
        req.body.nome = nome?.trim();
        req.body.descricao = descricao?.trim();
        req.body.tipo = tipo?.trim();
        req.body.endereco = endereco?.trim();
        req.body.cidade = cidade?.trim();
        req.body.bairro = bairro?.trim();
        req.body.estado = estado?.trim();


        req.body.status = 'ativo';
        req.body.criado_por = 'Caio';
        req.body.created_at = new Date('2025-05-25T20:10:23Z');
        req.body.updated_at = new Date('2025-05-25T20:10:23Z');

        if (errors.length > 0) {
            return res.status(400).json({
                error: "Erro de validação",
                details: errors
            });
        }

        next();
    } catch (error) {
        console.error('Erro no middleware:', error);
        return res.status(500).json({
            error: "Erro interno durante validação"
        });
    }
};

module.exports = {
    validateLocal
};