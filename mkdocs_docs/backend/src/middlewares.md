# authMiddleware.js

O seguinte arquivo `authMiddleware.js` tem como objetivo centralizar e padronizar a autenticação e autorização de usuários nas rotas protegidas da API do backend. Ele garante que apenas usuários autenticados e com o papel adequado possam acessar determinados recursos do sistema, garantindo que:

* ✅ Apenas usuários autenticados acessem rotas protegidas.

* ✅ Verificação de permissões baseadas no papel (papel) do usuário.

### Verificação do cabeçalho de autenticação

Este trecho garante que a requisição possui o cabeçalho de autenticação no formato Basic. Caso contrário, retorna `erro 401` (não autorizado).

```javascript
if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(401).json({ error: "Autenticação necessária" });
}
```
🔹 Explicação:

* `authHeader`: Verifica se o cabeçalho Authorization existe.

* `authHeader.startsWith("Basic ")`: Garante que o token esteja no formato Basic <credenciais_base64>.

---

### Decodificação das credenciais

Extrai e decodifica as credenciais (email e senha) do cabeçalho **Basic Auth**.

```javascript
const base64Credentials = authHeader.split(" ")[1];
const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
const [email, senha] = credentials.split(":");
```

🔹 Explicação:

* `authHeader.split(" ")[1]`: Pega apenas a parte codificada (ex: `"Basic dXNlckBleGVtcGxvLmNvbToxMjM0NTY=" → "dXNlckBleGVtcGxvLmNvbToxMjM0NTY="`).

* `Buffer.from(...).toString("ascii")`: Converte de Base64 para texto (ex: `"usuario@exemplo.com:123456"`).

* `credentials.split(":")`: Divide em `email` e `senha`.

---

### Busca do usuário no banco de dados

Procura o usuário pelo **email informado**, no banco de dados (via Prisma) para verificar se o usuário existe.

```javascript
const usuario = await prisma.usuario.findUnique({
  where: { email }, // Filtra pelo email
  select: { id: true, email: true, senha_hash: true, papel: true }, // Seleciona apenas campos necessários
});
```

🔹 Explicação:

* `findUnique`: Busca um usuário único pelo `email`.

* `select`: Retorna apenas os campos essenciais `(id, email, senha_hash, papel)`

---

### Validação da senha

Compara o hash da senha informada com o hash armazenado. Se não bater, retorna `erro 401`.

```javascript
const senhaHash = crypto.createHash("sha256").update(senha).digest("hex"); // Gera o hash SHA-256 da senha

if (!usuario || usuario.senha_hash !== senhaHash) {
  return res.status(401).json({ error: "Credenciais inválidas" }); // Erro se usuário não existir ou senha incorreta
}
```

🔹 Explicação:

* `crypto.createHash("sha256")`: Usa **SHA-256** para hashing (deve ser o mesmo método usado no cadastro).

* `usuario.senha_hash !== senhaHash`: Compara o hash da senha enviada com o hash armazenado.

---

### Armazenamento do usuário autenticado na requisição

Se autenticado, armazena o usuário na requisição para uso posterior, em `req.usuario` para uso em rotas protegidas..

```javascript
req.usuario = usuario; // Adiciona o usuário autenticado à requisição
next(); // Passa para o próximo middleware/rota
```

🔹 Explicação:

* `req.usuario`: Permite que outras rotas acessem os dados do usuário (ex: req.usuario.papel para autorização).

* `next()`: Continua o fluxo da requisição.

---

### Resumo

Os seguintes trechos de código combinados implementam a autenticação necessária para proteger as rotas da API, atendendo os seguintes critérios.

* 🔒 Exige autenticação Basic Auth (email + senha).

* 📦 Valida as credenciais no banco de dados.

* 🛡️ Protege rotas contra acesso não autorizado.

* 👤 Disponibiliza o usuário autenticado em req.usuario

---

# errorMiddleware.js

## Função principal

A função `manipuladorErros` centraliza o tratamento de erros do backend, garantindo respostas padronizadas para diferentes tipos de falhas.

---

### Log do erro no servidor

Registra o erro no console para facilitar o diagnóstico durante o desenvolvimento.

```javascript
console.error("Erro:", err.stack);
```

🔹 Explicação:

* `err.stack` mostra a mensagem de erro completa junto com a stack trace

* Essencial para **debug** em ambiente de desenvolvimento.

---

### Tratamento de erro de conflito do Prisma

Detecta conflitos de dados únicos no banco (ex: email já cadastrado) e retorna status 409, dessa forma, identificando violações de constraints únicas no banco de dados (código P2002 do Prisma).

```javascript
if (err.code === "P2002") {
  return res.status(409).json({
    error: "Conflito de dados",
    details: "Já existe um registro com esses valores únicos",
  });
}
```

🔹 Explicação:

* Código P2002 indica violação de campo único (ex: email duplicado)

* Retorna status HTTP 409 (Conflict) com mensagem clara

* Exemplo: Tentativa de cadastrar um email já existente

---

### Tratamento de erro de validação

Responde com status 400 quando há dados inválidos enviados pelo usuário.

```javascript
if (err.name === "ValidationError") {
  return res.status(400).json({
    error: "Dados inválidos",
    details: err.errors,
  });
}
```

🔹 Explicação:

* `ValidationError` tipicamente vem de validações de schema (ex: Zod, Joi)

* Retorna status HTTP 400 (Bad Request)

* Inclui detalhes dos campos inválidos em `details`.

---

### Tratamento de erro genérico

Para qualquer outro erro, retorna status 500 e, em ambiente de desenvolvimento, exibe a mensagem detalhada.

```javascript
res.status(500).json({
  error: "Erro interno no servidor",
  details: process.env.NODE_ENV === "development" ? err.message : undefined,
});
```

🔹 Explicação:

* Status HTTP 500 (Internal Server Error) para erros inesperados

* Mostra detalhes do erro apenas em desenvolvimento (segurança em produção)

* Evita expor informações sensíveis em ambiente de produção

---

### Resumo


Esses trechos garantem que a API responda de forma clara e segura a diferentes tipos de erro, facilitando o uso e a manutenção do sistema, seguindo os seguintes critérios.

* ✅ Logs detalhados para desenvolvimento.

* ✅ Respostas padronizadas para diferentes tipos de erro.

* ✅ Tratamento específico para erros comuns (validação, conflitos).

* ✅ Segurança ao não expor detalhes internos em produção.

---

# loginMiddleware.js

Este arquivo implementa middlewares de log para monitoramento de requisições na API, proporcionando visibilidade sobre o fluxo de acessos e performance do sistema.

### Log básico de requisições

Registra no console o método HTTP, caminho e horário de cada requisição recebida pelo servidor.

```javascript
console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
next();
```

🔹 Funcionamento:

* Registra timestamp no formato ISO

* Captura método HTTP (GET, POST, etc.) e caminho da requisição

* Executa antes do processamento da rota `(next())`

---

### Log detalhado de requisições

Registra informações completas após o término da resposta, incluindo método, caminho, status HTTP e duração da requisição em milissegundos, trazendo métricas completas após o término do processamento.

```javascript
const start = Date.now();

res.on("finish", () => {
  const duration = Date.now() - start;
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.path} - ` +
      `Status: ${res.statusCode} - ` +
      `Duração: ${duration}ms`
  );
});

next();
```

🔹 Funcionamento:

* Captura timestamp inicial `(Date.now())`

* Usa evento `finish` do response para registrar dados completos.

* Calcula duração total da requisição em milissegundos.

* Inclui status code da resposta.

---

### 📝 Exemplo de Saída:


```text
[2023-11-15T14:30:45.456Z] POST /api/login - Status: 200 - Duração: 128ms
```

---

### Resumo

Esses middlewares facilitam o monitoramento e o diagnóstico de requisições no backend, auxiliando na identificação de problemas de performance e rastreamento de acessos, tendo os respectivos benefícios.

* ✅ Monitoramento em tempo real das requisições
* ✅ Identificação de problemas de performance (tempos de resposta)
* ✅ Rastreamento completo do fluxo de acessos
* ✅ Suporte a troubleshooting com timestamps precisos