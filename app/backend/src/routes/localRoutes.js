import express from 'express'
import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()
const router = express.Router()

//  Rota para criar um local
router.post('/local', async (req, res) => {
    const {
      nome,
      descricao,
      tipo,
      endereco,
      cidade,
      bairro,
      estado,
      latitude,
      longitude,
      status,
      criado_por
    } = req.body
  
    try {
      const local = await prisma.local.create({
        data: {
          id: uuidv4(), // Gera o UUID automaticamente
          nome,
          descricao,
          tipo,
          endereco,
          cidade,
          bairro,
          estado,
          latitude,
          longitude,
          status,
          criado_por
        }
      })
      res.status(201).json(local)
    } catch (error) {
      console.error('Erro ao criar local:', error)
      res.status(500).json({ error: 'Erro ao criar local', detalhes: error.message })
    }
  })


export default router
