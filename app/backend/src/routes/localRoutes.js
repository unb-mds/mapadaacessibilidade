import express from 'express'
import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()
const router = express.Router()

//  Rota para criar um local


export default router
