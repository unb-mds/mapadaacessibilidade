import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

// Middleware de autenticação básica
export const autenticar = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(401).json({ error: "Autenticação necessária" });
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii",
  );
  const [email, senha] = credentials.split(":");

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { email },
      select: { id: true, email: true, senha_hash: true, papel: true },
    });

    const senhaHash = crypto.createHash("sha256").update(senha).digest("hex");

    if (!usuario || usuario.senha_hash !== senhaHash) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    next(error);
  }
};

// Middleware de autorização por papel
export const autorizar = (papel) => {
  return (req, res, next) => {
    if (req.usuario?.papel !== papel) {
      return res.status(403).json({ error: "Acesso não autorizado" });
    }
    next();
  };
};
