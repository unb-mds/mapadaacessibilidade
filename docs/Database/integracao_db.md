<div>
 <img src="https://github.com/user-attachments/assets/6737cb91-110e-4797-a21e-f045fa4b2daf">
</div>




# 📃 Documentação de Integração com Supabase (PostgreSQL)

Este documento tem como objetivo instruir a equipe de backend a realizar testes de integração com um banco de dados PostgreSQL hospedado no Supabase usando o SDK oficial.

## ✅ Requisitos

* Node.js ([https://nodejs.org](https://nodejs.org))
* Editor de código (Visual Studio Code, por exemplo)
* Conexão com a internet

## 🚶 Passos Iniciais

### 1. Instalar Node.js

Certifique-se de ter o Node.js instalado executando no terminal:

```bash
node -v
npm -v
```

Caso não tenha, baixe do site oficial: [https://nodejs.org](https://nodejs.org)

### 2. Criar projeto e instalar pacotes

Crie uma pasta para o projeto e instale as dependências:

```bash
mkdir teste-supabase
cd teste-supabase
npm init -y
npm install @supabase/supabase-js dotenv
```

* `@supabase/supabase-js`: biblioteca oficial do Supabase para acessar o banco de dados, autenticação, storage, etc.
* `dotenv`: para armazenar variáveis de ambiente (URL e API Key).

### 3. Estrutura dos arquivos

```
/teste-supabase
├── index.js
├── .env
└── package.json
```

## 📁 .env (informações sensíveis)

Crie um arquivo `.env` na raiz com o seguinte conteúdo:

```env
SUPABASE_URL=https://SEU-PROJETO.supabase.co
SUPABASE_API_KEY=sua-api-key-publica-aqui
```

**Importante:** substitua pelos dados reais do Supabase.

## 📄 index.js

```js
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);

async function testarConexao() {
  const { data, error } = await supabase
    .from('Usuario')
    .select('id, nome, email, papel');

  if (error) {
    console.error("Erro ao conectar à API:", error.message);
  } else if (data.length === 0) {
    console.log("Conexão bem-sucedida! Nenhum usuário encontrado.");
  } else {
    console.log("Usuários encontrados:");
    console.table(data);
  }
}

testarConexao();
```

### ⚠️ Observação

Se estiver usando Node.js em versão anterior à 14 ou sem suporte a `import`, altere para `require()` e use `type: "module"` em `package.json` ou reescreva assim:

```js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
```

## 🔧 Execução

No terminal, rode o script:

```bash
node index.js
```

Se a conexão estiver correta e o banco estiver vazio, você verá:

```bash
Conexão bem-sucedida! Nenhum usuário encontrado.
```

Se houver dados, eles serão exibidos em formato de tabela.

---

## 🏆 Extras e Recomendações

* Habilitar RLS no Supabase para a tabela `Usuario` e criar uma política de leitura:

```sql
ALTER TABLE Usuario ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Leitura anonima" ON Usuario
FOR SELECT USING (true);
```

* Recomendamos o uso de `PostgREST` do Supabase, pois ele transforma as tabelas em endpoints REST automaticamente.

---

## 📘 Banco de Dados

O banco fornecido possui 13 tabelas, incluindo `Usuario`, `Local`, `Acessibilidade`, `Foto`, `Avaliacao`, `Discussão`, entre outras.

**Todas estão vazias por padrão para testes iniciais.**

Consulte a documentação do Supabase: [https://supabase.com/docs](https://supabase.com/docs)
