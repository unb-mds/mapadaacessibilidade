export const manipuladorErros = (err, req, res, next) => {
  console.error("Erro:", err.stack);

  // Tratamento específico para erros do Prisma
  if (err.code === "P2002") {
    return res.status(409).json({
      error: "Conflito de dados",
      details: "Já existe um registro com esses valores únicos",
    });
  }

  // Erros de validação
  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Dados inválidos",
      details: err.errors,
    });
  }

  // Erro genérico
  res.status(500).json({
    error: "Erro interno no servidor",
    details: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};
