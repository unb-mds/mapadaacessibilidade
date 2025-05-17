# Projeto Backend - Mapa de Acessibilidade

## 🚀 Como começar

### Pré-requisitos
- Node.js v18+
- PostgreSQL
- Git

### Instalação
1. Clone o repositório:
```bash
git clone https://github.com/unb-mds/mapadaacessibilidade.git

2. Instale as dependências:
```bash
npm install
```

3. Configure o ambiente:

Edite o `.env` credenciais do banco URL e senha
Ex.:
## 🔧 Variáveis de Ambiente
Crie um arquivo `.env` baseado no `.env.example`:
```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_banco?schema=public"
PORT=3000
```

## 🛠 Comandos Úteis
| Comando                   | Descrição                          |
|---------------------------|------------------------------------|
| `npx prisma generate`     | Gera o cliente do Prisma           |
| `npx prisma studio    `   | Abre interface do banco de dados   |
|`node src/server.js `      | Roda o server com as rotas

Depois de configurar os comandos  conseguir aplicar todas as dependencias, pode fazer testes e implemnetacões.

## 🌐 Endpoints
- `GET /usuarios` - Lista usuários
- `POST /usuarios` - Cria novo usuário

Para testar os endpoints sugiro usaro Thunder Clint - extensao do VScode
