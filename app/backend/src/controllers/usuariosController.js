// controllers/usuariosController.js
import { PrismaClient } from "@prisma/client"
import crypto from "crypto"
import { v4 as uuidv4 } from "uuid"


const prisma = new PrismaClient()

export const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha, papel } = req.body
    if(!nome || !email || !senha || !papel) {
        return res.status(400). json({ error: 'Todos os campos são obrigatórios.' })    

    }

    const senhaHash = crypto.createHash("sha256").update(senha).digest("hex")

    try{
        const novoUsuario = await prisma.usuario.create({
            data: {
                id: uuidv4(),
                nome,
                email,
                senha_hash: senhaHash,
                papel
            }
        })
        res.status(201).json(novoUsuario)   
    }catch (error) {
        console.error(error)
        if (error.code === "P2002") {
            return res.status(400).json({ error: "Email já cadastrado." })
        }
        res.status(500).json({ error: "Erro ao cadastrar usuário." })
    }finally {
        await prisma.$disconnect()
    }
}
///rota de login de usuario
export const loginUsuario = async (req, res) => {
    const { email, senha } = req.body
    
    if(!email || !senha) {
        return res.status(400).json({ error: "Email e senha são obrigatórios." })
    }

    try {
        const usuario = await prisma.usuario.findUnique({
            where: { email },
            select: {
                id: true,
                nome: true,
                email: true,
                senha_hash: true,
                papel: true,
                created_at: true
            }
        })

        const senhaHash = crypto.createHash("sha256").update(senha).digest("hex")

        if(!usuario || usuario.senha_hash !== senhaHash) {
            return res.status(401).json({ error: "Credenciais inválidas." })
        }

        
        const { senha_hash, ...usuarioSemSenha } = usuario

        
        res.status(200).json(usuarioSemSenha)

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erro ao realizar login." })
    } finally {
        await prisma.$disconnect()
    }
}
