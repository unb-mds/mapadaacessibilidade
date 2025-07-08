<div style="height: 500px; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
  <iframe 
    src="https://app.swaggerhub.com/apis-docs/mapadaacessibilidade/MapadaAcessibilidade/1.0.0" 
    width="100%" 
    height="100%" 
    frameborder="0"
    allowfullscreen>
  </iframe>
</div>

## Visão Geral

Esta documentação descreve os esquemas de dados da API para gerenciamento de locais acessíveis, versão 1.0.0.

A API utiliza o padrão OpenAPI 3.0.0 e permite o cadastro e consulta de locais públicos com suas respectivas informações de acessibilidade e avaliações.

## Esquemas de Dados

### Acessibilidade

Representa uma funcionalidade de acessibilidade disponível em um local.

**Propriedades:**

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `id` | string (uuid) | Não | Identificador único da acessibilidade |
| `nome` | string | Sim | Nome da acessibilidade (ex: "Rampa de acesso") |
| `descricao` | string | Sim | Descrição da acessibilidade |

**Exemplo:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "nome": "Rampa de acesso",
  "descricao": "Rampa para cadeirantes com inclinação adequada"
}
```

### Avaliação

Representa uma avaliação feita por usuários sobre a acessibilidade de um local.

**Propriedades:**

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `id` | string (uuid) | Não | Identificador único da avaliação |
| `nota` | integer | Sim | Nota de 1 a 5 para o local |
| `comentario` | string | Não | Comentário opcional da avaliação |

**Exemplo:**
```json
{
  "id": "987e6543-b21d-12d3-a456-426614174abc",
  "nota": 4,
  "comentario": "Local bem acessível, mas faltam placas informativas."
}
```

### Local

Representa um local público com suas informações de acessibilidade.

**Propriedades:**

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `id` | string (uuid) | Não | Identificador único do local |
| `nome` | string | Sim | Nome do local |
| `cidade` | string | Sim | Cidade onde o local está localizado |
| `tipo` | string | Sim | Tipo do local (ex: Biblioteca, Museu) |
| `acessibilidades` | array | Não | Lista de acessibilidades disponíveis |
| `avaliacoes` | array | Não | Lista de avaliações do local |

**Exemplo:**
```json
{
  "id": "abc123",
  "nome": "Biblioteca Central",
  "cidade": "Brasília",
  "tipo": "Biblioteca",
  "acessibilidades": [
    {
      "id": "rampa123",
      "nome": "Rampa de acesso",
      "descricao": "Rampa inclinada para cadeirantes"
    }
  ],
  "avaliacoes": [
    {
      "id": "avaliacao1",
      "nota": 5,
      "comentario": "Totalmente acessível!"
    }
  ]
}
```

### NovoLocal

Esquema para criação de novos locais (sem ID).

**Propriedades:**

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `nome` | string | Sim | Nome do local |
| `cidade` | string | Sim | Cidade onde o local está localizado |
| `tipo` | string | Sim | Tipo do local |

**Exemplo:**
```json
{
  "nome": "Museu Nacional",
  "cidade": "Brasília",
  "tipo": "Museu"
}
```

### NovaAcessibilidade

Esquema para criação de novas acessibilidades (sem ID).

**Propriedades:**

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `nome` | string | Sim | Nome da acessibilidade |
| `descricao` | string | Sim | Descrição da acessibilidade |

**Exemplo:**
```json
{
  "nome": "Rampa de acesso",
  "descricao": "Rampa para cadeirantes com inclinação adequada"
}
```

## Esquemas de Resposta

### LocalCriado

Herda todas as propriedades do esquema `Local`. Representa a resposta após a criação bem-sucedida de um local.

### AcessibilidadeCriada

Herda todas as propriedades do esquema `Acessibilidade`. Representa a resposta após a criação bem-sucedida de uma acessibilidade.

## Esquemas de Erro

### Erro

Resposta padrão para erros simples.

**Propriedades:**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `mensagem` | string | Mensagem de erro |

**Exemplo:**
```json
{
  "mensagem": "Requisição inválida"
}
```

### ErroDetalhado

Resposta para erros com informações adicionais.

**Propriedades:**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `mensagem` | string | Mensagem de erro |
| `detalhes` | string | Detalhes adicionais do erro |

**Exemplo:**
```json
{
  "mensagem": "Erro ao processar a solicitação",
  "detalhes": "Campo 'nome' é obrigatório"
}
```

## Validações

### Avaliação
- A nota deve estar entre 1 e 5 (inclusive)

### Identificadores
- Todos os IDs seguem o formato UUID
- Campos obrigatórios devem estar presentes nas requisições

## Observações

- A API está configurada para utilizar rotas localizadas em `./src/routes/*.js`
- Controllers estão localizados em `./src/controllers/*.js`
- Utiliza as bibliotecas `swagger-jsdoc` e `yamljs` para geração da documentação