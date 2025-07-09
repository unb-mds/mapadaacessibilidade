![Estrutura](assets/cap_estrutura.png)

## 📁 Diretórios

```plaintext
mapadaacessibilidade
├── CODE_OF_CONDUCT.md
├── Documentação
│   ├── Atas
│   │   ├── modelo-de-ata.md
│   │   ├── sprint-0.md
│   │   ├── sprint-1.1.md
│   │   ├── sprint-1.2.md
│   │   ├── sprint-1.3.md
│   │   ├── sprint-1.md
│   │   ├── sprint-2.md
│   │   ├── sprint-3.md
│   │   ├── sprint-4.md
│   │   ├── sprint-5.md
│   │   └── sprint-6.md
│   ├── Estudos
│   │   ├── Caderno_Caio_Rocha_29-03-2025.md
│   │   ├── Documentação
│   │   │   └── Introdução a documentação.md
│   │   ├── Estudo de git
│   │   ├── Git_GitHub_conceitos_iniciais.md
│   │   ├── Introdução a Requisitos.md
│   │   ├── Introdução a documentação.md
│   │   ├── Manual-da-identidade-visual.md
│   │   ├── Product-backlog.md
│   │   ├── README.md
│   │   ├── Requisitos
│   │   │   ├── Engenharia-de-requisitos.md
│   │   │   └── Introdução a Requisitos.md
│   │   ├── ResumoIssueBackend.md
│   │   └── metodologiaSCRUM.pdf
│   └── databases
│       ├── Backend
│       │   └── Backend.md
│       ├── DER.md
│       ├── DLD.md
│       ├── DLDimage.md
│       └── PostgreSQL
│           ├── mapcom_acess_db.md
│           └── script_fisico.sql
├── LICENSE
├── README.md
├── app
│   ├── backend
│   │   ├── README.md
│   │   ├── db
│   │   │   ├── readme.md
│   │   │   └── schema.sql.sql
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── prisma
│   │   │   └── schema.prisma
│   │   └── src
│   │       ├── controllers
│   │       │   └── usuariosController.js
│   │       ├── routes
│   │       │   ├── localRoutes.js
│   │       │   └── usuariosRoutes.js
│   │       └── server.js
│   └── frontend
│       ├── README.md
│       ├── eslint.config.js
│       ├── images
│       │   ├── Caio.webp
│       │   ├── alberto.webp
│       │   ├── anderson.webp
│       │   ├── lucas.webp
│       │   ├── maria.webp
│       │   └── samuel.webp
│       ├── index.html
│       ├── package-lock.json
│       ├── package.json
│       ├── public
│       │   └── vite.svg
│       ├── sobrenos.html
│       ├── src
│       │   ├── assets
│       │   │   └── react.svg
│       │   ├── img
│       │   │   └── pin.png
│       │   ├── index.css
│       │   ├── main.jsx
│       │   └── pages
│       │       ├── Login
│       │       │   ├── indexLogin.css
│       │       │   ├── indexLogin.jsx
│       │       │   ├── mainLogin.jsx
│       │       │   └── styleLogin.css
│       │       ├── Signup
│       │       │   ├── indexSignup.css
│       │       │   ├── signup.jsx
│       │       │   └── styleSignup.css
│       │       └── mapa
│       │           ├── App.css
│       │           └── Mapa.jsx
│       └── vite.config.js
├── docs
│   ├── Arquitetura
│   │   ├── Arquitetura.md
│   │   └── EscolhaDasStacksBackend.md
│   ├── Database
│   │   ├── DER.md
│   │   ├── DLD.md
│   │   ├── DLDimage.md
│   │   └── PostgreSQL
│   │       ├── mapcom_acess_db.md
│   │       └── script_fisico.sql
│   └── Requisitos
│       └── Engenharia-de-requisitos.md
├── index.html
```

## 🗂️ Pastas

O projeto está dividido em **três grandes frentes**:

* `Documentação/`: Referente a atas, estudos e decisões de projeto.
* `app/`: Código-fonte da aplicação com separação clara entre front-end e back-end.
* `docs/`: Documentação técnica da solução — arquitetura, banco de dados e requisitos.
* `Raiz do projeto`: arquivos globais como README.md, LICENSE, entre outros.

---

## 📌 Principais Diretórios

* `Documentação/`:
Armazena os materiais de apoio e registros de organização interna:

* `Atas/`: Registros de reuniões e sprints realizadas pela a equipe.

* `Estudos/`: Textos e resumos técnicos feitos pelos integrantes sobre Git, SCRUM, requisitos, backlog, identidade visual etc.

* `databases/`: Descrição técnica do banco de dados e seus scripts.

✅ Importância: Alta — essencial para acompanhar a gestão do projeto.

---

* `app/`:
Contém o código-fonte da aplicação web:

* `app/backend/`:
API construída em Node.js com Express.
Estrutura com controllers, rotas e banco de dados (Prisma).
Scripts SQL e arquivos de configuração.

* `app/frontend/`:
Interface criada com React.js.
Componentes, imagens, estilos CSS e arquivos de configuração com Vite.

✅ Importância: Crítica — coração funcional do sistema.

---

* `docs/`:
Contém documentação técnica da solução:

* `Arquitetura/`: Justificativas e definições da arquitetura de software.

* `Database/`: DER, DLD, scripts físicos e documentação do banco de dados.

* `Requisitos/`: Especificação dos requisitos do sistema.

✅ Importância: Alta — descreve o funcionamento da solução em termos técnicos e de projeto.

---

* `README.md`
Arquivo principal do GitHub com informações sobre:
    * Objetivo do projeto.
    * Tecnologias utilizadas.
    * Protótipos, licenças, links úteis.

✅ Importância: Alta — apresentação pública do projeto.

---

* `LICENSE`
Define que o projeto está sob a licença MIT, permitindo livre uso e modificação com atribuição.


## 📦 Dependências por Módulo

* `frontend/` → React.js, Vite, CSS
* `backend/` → Node.js, Express, Prisma ORM, PostgreSQL
* `docs/` → Markdown, (opcionalmente MkDocs)

---

## 🧱 Padrões de Organização

* Pastas iniciando com letras **Maiúsculas** e separadas por `-` ou `_`, em nomes compostos
* Nome de arquivos `kebab-case` no front e back, exemplo: `nome-do-produto, preco-unitario, url-do-site`
* `README.md` em toda pasta relevante explicando seu conteúdo.

---

## 🗃️ Recomendação para Contribuições

* Novas rotas → `app/backend/routes`
* Novos componentes → `app/frontend/src/pages`
* Novos estudos → `Documentação/Estudos`
* Scripts de banco → `databases/PostgreSQL`
* Novas documentações técnicas → `docs/`

---

Essa estrutura visa facilitar a manutenção, aprendizado e contribuição com o projeto **Mapa da Acessibilidade**.
