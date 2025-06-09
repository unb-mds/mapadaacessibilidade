<div text-align="center">
  <img src="https://github.com/user-attachments/assets/1b9be736-7232-40cc-970c-df50c2202028"></img>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=flat&logo=swagger&logoColor=black" />

  <img src="https://img.shields.io/badge/API-0078D4?style=flat" />
</div>


# 📘 Documentação da API — Mapa da Acessibilidade

Este módulo tem como objetivo **documentar as rotas da API** do projeto _Mapa da Acessibilidade_ utilizando o Swagger. A documentação permitirá uma visualização clara dos endpoints e facilitará os testes e a integração com outras equipes do projeto.

---

## ✅ PASSO 1 — Instalação dos pacotes necessários

Execute os comandos abaixo no terminal:

```bash
npm init -y  # (caso ainda não exista um package.json)
npm install express swagger-jsdoc swagger-ui-express
```

O que cada pacote faz:

* express: framework para criação de servidores HTTP.

* swagger-jsdoc: gera documentação a partir de comentários JSDoc.

* swagger-ui-express: exibe a interface do Swagger no navegador.

---

## ✅ PASSO 2 — Criação da pasta de configuração do Swagger


Crie uma pasta chamada API-SWAGGER/ e dentro dela um arquivo swaggerConfig.js com o seguinte conteúdo:

```css
backend/
├── API-SWAGGER/
│   └── swaggerConfig.js
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   │   ├── acessibilidadeRouter.js
│   │   ├── locaisRouter.js
│   │   └── usuariosRoutes.js
│   └── server.js
```

Um arquivo `swaggerConfig.js` com o seguinte conteúdo


```js
// API-SWAGGER/swaggerConfig.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API - Mapa da Acessibilidade',
      version: '1.0.0',
      description: 'Documentação das rotas da API utilizando Swagger',
    },
  },
  apis: ['./src/routes/*.js'], // Caminho relativo aos arquivos de rota
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
```

---

## ✅ PASSO 3 — Integração do Swagger no servidor principal

No arquivo src/server.js, importe e use o Swagger com o seguinte código:

```js
// src/server.js

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../docs/swaggerConfig'); // Ajuste conforme o caminho da sua pasta docs

const locaisRoutes = require('./routes/locaisRouter');
const usuariosRoutes = require('./routes/usuariosRoutes');
const acessibilidadeRouter = require('./routes/acessibilidadeRouter');

const app = express();
const prisma = new PrismaClient();
const port = 3000;

app.use(express.json());

// Rotas da API
app.use('/locais', locaisRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/acessibilidade', acessibilidadeRouter);

// Rota da documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(`Documentação disponível em http://localhost:${port}/api-docs`);
});
```

## ✅ PASSO 4 — Documentar as rotas com Swagger

Acesse cada arquivo dentro de src/routes/ e adicione os comentários Swagger no formato abaixo, antes de cada rota.

Exemplo — `usuariosRoutes.js`:


```js
/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 */
router.get('/', controller.listarUsuarios);
```

Faça isso também nos arquivos locaisRouter.js e acessibilidadeRouter.js.

## ✅ PASSO 5 — Executar o servidor
No terminal, rode:

```bash
node src/server.js
```

Acesse a documentação Swagger no navegador:

```bash
http://localhost:3000/api-docs
```

## DIVISÃO DE TAREFAS

✅ Pessoa 1 – Configuração do Swagger e Estrutura
 Criar a pasta API-SERVER/) com os arquivos:

- [ ] swaggerConfig.js

- [ ] Integrar o Swagger diretamente no server.js

- [ ] Instalar os pacotes necessários:

- [ ] express

- [ ] swagger-jsdoc

- [ ] swagger-ui-express

- [ ] Configurar o endpoint /api-docs para exibir a documentação Swagger

✅ Pessoa 2 – Documentação das Rotas com Swagger (JSDoc)
 Adicionar blocos de comentários Swagger (@swagger) nos seguintes arquivos:

- [ ] usuariosRoutes.js

- [ ] locaisRouter.js

- [ ] acessibilidadeRouter.js

 Garantir que cada rota tenha:

- [ ] summary

- [ ] tags

- [ ] responses com código HTTP (ex: 200)

---

## 📌 Observação

Caso ocorra erro do tipo "rota não encontrada" ou a documentação Swagger não apareça, verifique:

* Se o caminho em apis: `['../src/routes/*.js']` está correto.

* Se as rotas estão exportadas corretamente (module.exports = router).

* Se o servidor está executando na porta correta (3000).

<div align="center"> 
  <footer> &copy; <strong>2025 Mapa da Acessibilidade - Todos os direitos reservados</strong>
  </footer>
</div> 
