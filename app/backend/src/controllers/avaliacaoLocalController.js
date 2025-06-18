import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const criarAvaliacaoLocal = async (req, res, next) => {
    try {
        const { nota, comentario, fk_usuario_id, fk_local_id } = req.body;

        // Verifica se o usuário já avaliou este local
        const avaliacaoExistente = await prisma.avaliacao.findUnique({
            where: {
                fk_usuario_id_fk_local_id: {
                    fk_usuario_id,
                    fk_local_id
                }
            }
        });

        if (avaliacaoExistente) {
            return res.status(400).json({
                error: "Usuário já avaliou este local"
            });
        }

        const novaAvaliacao = await prisma.avaliacao.create({
            data: {
                nota,
                comentario,
                fk_usuario_id,
                fk_local_id
            },
            include: {
                usuario: { select: { nome: true } },
                local: { select: { nome: true } }
            }
        });

        return res.status(201).json({
            message: "Avaliação criada com sucesso",
            avaliacao: novaAvaliacao
        });
    } catch (error) {
        next(error);
    }
};

export const listarAvaliacoesLocal = async (req, res, next) => {
    try {
        const { local_id } = req.params;

        const avaliacoes = await prisma.avaliacao.findMany({
            where: { fk_local_id: local_id },
            include: {
                usuario: { select: { id: true, nome: true } }
            },
            orderBy: { created_at: 'desc' }
        });

        const local = await prisma.local.findUnique({
            where: { id: local_id },
            select: { id: true, nome: true }
        });

        // Calcular média das avaliações
        const media = avaliacoes.reduce((acc, curr) => acc + curr.nota, 0) / avaliacoes.length;

        return res.status(200).json({
            local,
            media_avaliacoes: media.toFixed(1),
            total_avaliacoes: avaliacoes.length,
            avaliacoes
        });
    } catch (error) {
        next(error);
    }
};

export const obterAvaliacaoUsuarioLocal = async (req, res, next) => {
    try {
        const { usuario_id, local_id } = req.params;

        const avaliacao = await prisma.avaliacao.findUnique({
            where: {
                fk_usuario_id_fk_local_id: {
                    fk_usuario_id: usuario_id,
                    fk_local_id: local_id
                }
            },
            include: {
                usuario: { select: { nome: true } },
                local: { select: { nome: true } }
            }
        });

        if (!avaliacao) {
            return res.status(404).json({
                message: "Avaliação não encontrada"
            });
        }

        return res.status(200).json(avaliacao);
    } catch (error) {
        next(error);
    }
};

export const atualizarAvaliacaoLocal = async (req, res, next) => {
    try {
        const { usuario_id, local_id } = req.params;
        const { nota, comentario } = req.body;

        const avaliacaoAtualizada = await prisma.avaliacao.update({
            where: {
                fk_usuario_id_fk_local_id: {
                    fk_usuario_id: usuario_id,
                    fk_local_id: local_id
                }
            },
            data: { nota, comentario },
            include: {
                usuario: { select: { nome: true } },
                local: { select: { nome: true } }
            }
        });

        return res.status(200).json({
            message: "Avaliação atualizada com sucesso",
            avaliacao: avaliacaoAtualizada
        });
    } catch (error) {
        next(error);
    }
};

export const removerAvaliacaoLocal = async (req, res, next) => {
    try {
        const { usuario_id, local_id } = req.params;

        await prisma.avaliacao.delete({
            where: {
                fk_usuario_id_fk_local_id: {
                    fk_usuario_id: usuario_id,
                    fk_local_id: local_id
                }
            }
        });

        return res.status(200).json({
            message: "Avaliação removida com sucesso"
        });
    } catch (error) {
        next(error);
    }
};

export const avaliacaoLocalErrorHandler = (err, req, res, next) => {
    console.error("Erro no controller de avaliação local:", err);

    if (err.code === "P2002") {
        return res.status(409).json({
            error: "Conflito: O usuário já avaliou este local"
        });
    }

    if (err.code === "P2025") {
        return res.status(404).json({
            error: "Avaliação não encontrada"
        });
    }

    res.status(500).json({
        error: "Erro interno no servidor",
        details: process.env.NODE_ENV === "development" ? err.message : undefined
    });
};

export default {
    criarAvaliacaoLocal,
    listarAvaliacoesLocal,
    obterAvaliacaoUsuarioLocal,
    atualizarAvaliacaoLocal,
    removerAvaliacaoLocal,
    avaliacaoLocalErrorHandler
};
