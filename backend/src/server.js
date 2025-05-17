import express from 'express'

import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'


const prisma = new PrismaClient()

 
const app = express()
app.use(express.json())


app.get('/usuarios', async(req, res) => {
  const users = await prisma.usuario.findMany()

  res.status(200).json(users)

})



app.listen(3000, () => {
  console.log('Servidor funcionando http://localhost:3000')
})