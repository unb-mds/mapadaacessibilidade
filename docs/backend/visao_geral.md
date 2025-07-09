![capa do backend](../assets/cap_backend.png)

# 🧠 Visão Geral do Backend

O backend do projeto **Mapa da Acessibilidade** é responsável por gerenciar toda a lógica de negócio, autenticação, acesso ao banco de dados e disponibilização das rotas da API. Ele foi desenvolvido com **Node.js** utilizando o framework **Express**, adotando boas práticas de arquitetura e separação de responsabilidades entre controladores, rotas, middlewares e acesso a dados via Prisma ORM.

Entre suas principais responsabilidades estão:

* Gerenciar e disponibilizar os dados dos locais acessíveis e avaliações da comunidade.
* Validar e autenticar usuários por meio de middlewares
* Integrar com o banco de dados **PostgreSQL** via **Prisma**.
* Expor endpoints REST documentados com **Swagger**.
* Permitir o escalonamento e manutenção através de código modular.

O backend está organizado em camadas bem definidas, facilitando a leitura, manutenção e colaboração entre desenvolvedores. Cada entidade do sistema possui seus próprios controladores, rotas e testes automatizados, mantendo o projeto coeso e escalável.

> 💡 Toda a estrutura foi pensada para facilitar a colaboração open source, com padrões claros, testes e documentação integrada.

---

### Exemplo Simplificado

---

## 📋 Fluxo Principal da Aplicação

```
📥 Requisição HTTP
         |
         v
    🔀 Roteamento
         |
         v
┌────────────────────────────────────────────────────────────────┐
│                    📂 ROTAS INDEPENDENTES                      │
├────────────────────────────────────────────────────────────────┤
│  🔀 acessibilidadeRouter.js     🔀 acessibilidadeLocalRouter.js │
│  🔀 avaliacaoLocalRouter.js     🔀 fotosRouter.js              │
│  🔀 locaisRouter.js            🔀 usuariosRoutes.js            │
└────────────────────────────────────────────────────────────────┘
         |
         v
┌────────────────────────────────────────────────────────────────┐
│                  🛡️ MIDDLEWARES (Aplicados conforme necessário)│
├────────────────────────────────────────────────────────────────┤
│  ✅ authMiddleware.js        🚫 errorMiddleware.js             │
│  🔐 loginMiddleware.js       🧾 validationMiddleware.js        │
└────────────────────────────────────────────────────────────────┘
         |
         v
┌────────────────────────────────────────────────────────────────┐
│                    🧠 CONTROLLERS INDEPENDENTES                │
├────────────────────────────────────────────────────────────────┤
│  🧠 acessibilidadeController.js     🧠 acessibilidadeLocalController.js │
│  🧠 avaliacaoLocalController.js     🧠 fotosController.js      │
│  🧠 locaisController.js            🧠 usuariosController.js    │
└────────────────────────────────────────────────────────────────┘
         |
         v
    🗄️ Banco de Dados
   (Prisma + PostgreSQL)
```
