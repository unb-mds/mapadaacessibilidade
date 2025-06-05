// Validações para usuários
export const validarCadastroUsuario = (req, res, next) => {
  const { nome, email, senha, papel } = req.body;

  if (!nome || nome.length < 3) {
    return res
      .status(400)
      .json({ error: "Nome inválido (mínimo 3 caracteres)" });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Email inválido" });
  }

  if (!senha || senha.length < 6) {
    return res
      .status(400)
      .json({ error: "Senha deve ter pelo menos 6 caracteres" });
  }

  if (!["usuario", "admin"].includes(papel)) {
    return res.status(400).json({ error: "Papel inválido" });
  }

  next();
};

// Validações para login
export const validarLogin = (req, res, next) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  next();
};
