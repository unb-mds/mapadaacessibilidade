# 🗄️ Banco de Dados - Mapa da Acessibilidade

> Documentação do banco de dados PostgreSQL utilizado no projeto Mapa da Acessibilidade, uma aplicação web que mapeia locais acessíveis de forma colaborativa.

## 📋 Sobre o Banco de Dados

O projeto utiliza PostgreSQL + PostGIS (para geolocalização) através do Supabase como serviço de banco de dados. A estrutura inclui tabelas para usuários, locais, avaliações, fotos e outras funcionalidades da aplicação.

## 🚀 Configuração Rápida

### 1. Pré-requisitos

- Node.js
- PostgreSQL 13+ com PostGIS (para desenvolvimento local)
- Conta no [Supabase](https://supabase.com) (para produção)

### 2. Configuração Local

```bash
# Clone o repositório
git clone https://github.com/unb-mds/mapadaacessibilidade.git
cd mapadaacessibilidade

# Instale as dependências
npm install

# Configure o banco local
createdb mapadaacessibilidade
psql mapadaacessibilidade -c "CREATE EXTENSION IF NOT EXISTS postgis;"
psql -d mapadaacessibilidade -f backend/database/schema.sql
```

### 3. Variáveis de Ambiente

Copie `.env.example` para `.env`:

```env
SUPABASE_URL=sua_url_do_projeto
SUPABASE_API_KEY=sua_chave_anonima
```

## 🛠️ Stack do Projeto

- **Backend**: Node.js + Express
- **Frontend**: React
- **Banco de Dados**: PostgreSQL + PostGIS (via Supabase)
- **ORM**: Prisma (opcional)

## 📊 Estrutura do Banco

O banco possui as seguintes tabelas principais:

- `Usuario`: Gerenciamento de usuários
- `Local`: Informações sobre locais acessíveis
- `Foto`: Imagens dos locais
- `Acessibilidade`: Tipos de acessibilidade
- `Avaliacao`: Avaliações dos usuários
- `Discussao`: Fórum de discussões

Para ver a estrutura completa, consulte `backend/database/schema.sql`.

## 🔗 Conexão com Supabase

```javascript
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_API_KEY,
);
```

## 🤝 Contribuindo

1. Fork o projeto
2. Configure seu ambiente local
3. Faça suas alterações
4. Envie um Pull Request

## 📝 Notas Importantes

- Nunca compartilhe credenciais reais no repositório
- Habilite Row Level Security (RLS) no Supabase
- Use políticas de acesso apropriadas para cada tabela
- Mantenha o schema atualizado no repositório

## 📚 Links Úteis

- [Documentação do Supabase](https://supabase.com/docs)
- [Documentação do PostGIS](https://postgis.net/docs/)

## 📄 Licença

Este projeto está sob a licença MIT.
