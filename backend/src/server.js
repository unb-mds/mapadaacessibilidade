import express from 'express'

import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'


const prisma = new PrismaClient()

 
const app = express()
app.use(express.json())


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
        id: uuidv4(), // gera o ID manualmente
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