import express from 'express'
import { PrismaClient } from '@prisma/client'
import  locaisRoutes from './routes/locaisRouter.js'
import usuariosRoutes from './routes/usuariosRoutes.js'
import acessibilidadeRouter from './routes/acessibilidadeRouter.js'




const prisma = new PrismaClient()
const app = express()
const port = 3000;


app.use(express.json())
app.use('/locais', locaisRoutes)
app.use('/usuarios', usuariosRoutes)
app.use('/', acessibilidadeRouter)





app.get('/usuarios', async(req, res) => {
  const users = await prisma.usuario.findMany()

  res.status(200).json(users)

})






app.listen(port, () => {
  console.log(`Servidor funcionando http://localhost:${port}`)
})
