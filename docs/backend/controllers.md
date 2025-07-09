# Controllers - Mapa da Acessibilidade

## Visão Geral

Os controllers do projeto "Mapa da Acessibilidade" são responsáveis por gerenciar as operações de CRUD (Create, Read, Update, Delete) e a lógica de negócio da aplicação. Todos os controllers utilizam Prisma Client para interação com o banco de dados e seguem padrões consistentes de tratamento de erros.

## AcessibilidadeController

### Descrição
Controller responsável pelo gerenciamento de tipos de acessibilidade no sistema.

### Funcionalidades

#### `createAcessibilidade`
- **Descrição**: Cria uma nova acessibilidade no sistema
- **Método HTTP**: POST
- **Parâmetros**:
  - `nome` (string, obrigatório): Nome da acessibilidade
  - `descricao` (string, opcional): Descrição da acessibilidade
- **Validações**:
  - Nome é obrigatório e deve ser uma string
  - Nome não pode ser vazio ou apenas espaços
  - Nome deve ter no máximo 50 caracteres
  - Verificação de duplicidade (case-insensitive)
- **Respostas**:
  - `201`: Acessibilidade criada com sucesso
  - `400`: Erro de validação
  - `409`: Já existe uma acessibilidade com este nome
  - `500`: Erro interno do servidor

#### `acessibilidadeErrorHandler`
- **Descrição**: Middleware para tratamento de erros específicos do controller
- **Tratamento de Erros**:
  - `P2002`: Conflito de dados únicos
  - `PrismaClientValidationError`: Dados inválidos
  - Erros gerais do sistema

## AcessibilidadeLocalController

### Descrição
Controller responsável pela associação entre locais e tipos de acessibilidade.

### Funcionalidades

#### `createAcessibilidadeLocal`
- **Descrição**: Associa uma acessibilidade a um local específico
- **Método HTTP**: POST
- **Parâmetros**:
  - `fk_local_id` (string, obrigatório): ID do local
  - `fk_acessibilidade_id` (string, obrigatório): ID da acessibilidade
  - `observacao` (string, opcional): Observações sobre a acessibilidade no local
- **Validações**:
  - Verificação se o local existe
  - Verificação se a acessibilidade existe
  - Verificação se a associação já existe
- **Respostas**:
  - `201`: Associação criada com sucesso
  - `400`: Erro de validação
  - `404`: Local ou acessibilidade não encontrada
  - `409`: Associação já existe
  - `500`: Erro interno do servidor

## AvaliacaoLocalController

### Descrição
Controller responsável pelo gerenciamento de avaliações de locais.

### Funcionalidades

#### `createAvaliacaoLocal`
- **Descrição**: Cria uma nova avaliação para um local
- **Método HTTP**: POST
- **Parâmetros**:
  - `fk_local_id` (string, obrigatório): ID do local avaliado
  - `fk_usuario_id` (string, obrigatório): ID do usuário que avalia
  - `nota` (number, obrigatório): Nota da avaliação
  - `comentario` (string, opcional): Comentário sobre a avaliação
- **Validações**:
  - Verificação se o local existe
  - Verificação se o usuário existe
  - Validação da nota (deve ser numérica)
  - Verificação se o usuário já avaliou o local
- **Respostas**:
  - `201`: Avaliação criada com sucesso
  - `400`: Erro de validação
  - `404`: Local ou usuário não encontrado
  - `409`: Usuário já avaliou este local
  - `500`: Erro interno do servidor

## FotosController

### Descrição
Controller responsável pelo gerenciamento de fotos associadas aos locais.

### Funcionalidades

#### `createFotos`
- **Descrição**: Cria múltiplas fotos em lote
- **Método HTTP**: POST
- **Parâmetros**: Array de objetos com:
  - `url` (string, obrigatório): URL da foto
  - `status` (string, obrigatório): Status da foto
  - `fk_usuario_id` (string, obrigatório): ID do usuário
  - `fk_local_id` (string, obrigatório): ID do local
- **Validações**:
  - Verificação se o corpo da requisição é um array não vazio
  - Validação individual de cada foto
  - Processamento em lote com relatório de sucessos/falhas
- **Respostas**:
  - `201`: Fotos criadas com sucesso (com possíveis warnings)
  - `400`: Erro de validação ou nenhuma foto válida
  - `500`: Erro interno do servidor

#### `buscarFotos`
- **Descrição**: Busca fotos com filtros opcionais
- **Método HTTP**: GET
- **Parâmetros de Query**:
  - `url` (string, opcional): Filtro por URL
  - `status` (string, opcional): Filtro por status
  - `fk_usuario_id` (string, opcional): Filtro por usuário
  - `fk_local_id` (string, opcional): Filtro por local
- **Respostas**:
  - `200`: Lista de fotos encontradas
  - `500`: Erro interno do servidor

## LocalController

### Descrição
Controller responsável pelo gerenciamento de locais no sistema.

### Funcionalidades

#### `buscarLocais`
- **Descrição**: Busca locais com filtros opcionais
- **Método HTTP**: GET
- **Parâmetros de Query**:
  - `nome` (string, opcional): Filtro por nome (case-insensitive)
  - `cidade` (string, opcional): Filtro por cidade
  - `tipo` (string, opcional): Filtro por tipo
  - `raio` (number, opcional): Raio de busca em km
  - `latitude` (number, opcional): Latitude para busca por proximidade
  - `longitude` (number, opcional): Longitude para busca por proximidade
- **Funcionalidades Especiais**:
  - Busca por proximidade quando coordenadas são fornecidas
  - Cálculo de distância entre coordenadas
  - Ordenação por distância
- **Respostas**:
  - `200`: Lista de locais encontrados
  - `500`: Erro interno do servidor

#### `createLocal`
- **Descrição**: Cria um novo local
- **Método HTTP**: POST
- **Parâmetros**:
  - `nome` (string, obrigatório): Nome do local
  - `descricao` (string, opcional): Descrição do local
  - `tipo` (string, obrigatório): Tipo do local
  - `endereco` (string, opcional): Endereço do local
  - `cidade` (string, obrigatório): Cidade do local
  - `bairro` (string, opcional): Bairro do local
  - `estado` (string, opcional): Estado do local
  - `latitude` (number, obrigatório): Latitude do local
  - `longitude` (number, obrigatório): Longitude do local
  - `criado_por` (string, obrigatório): ID do usuário criador
- **Funcionalidades**:
  - Geração automática de ID único
  - Status automático como "aprovado"
- **Respostas**:
  - `201`: Local criado com sucesso
  - `500`: Erro interno do servidor

### Implementação com Padrão Repository

O LocalController também inclui uma implementação alternativa usando o padrão Repository:

#### `LocalController` (Class)
- **Construtor**: Recebe repository e gerador de UUID como dependências
- **Métodos**: Mesmas funcionalidades da implementação funcional
- **Vantagens**: Melhor testabilidade e separação de responsabilidades

## UsuariosController

### Descrição
Controller responsável pelo gerenciamento de usuários e autenticação.

### Funcionalidades

#### `cadastrarUsuario`
- **Descrição**: Cadastra um novo usuário no sistema
- **Método HTTP**: POST
- **Parâmetros**:
  - `nome` (string, obrigatório): Nome do usuário
  - `email` (string, obrigatório): Email do usuário
  - `senha` (string, obrigatório): Senha do usuário
  - `papel` (string, obrigatório): Papel/função do usuário
- **Segurança**:
  - Hash SHA-256 da senha
  - Verificação de email único
- **Respostas**:
  - `201`: Usuário cadastrado com sucesso
  - `400`: Campos obrigatórios ou email já cadastrado
  - `500`: Erro interno do servidor

#### `loginUsuario`
- **Descrição**: Realiza login do usuário
- **Método HTTP**: POST
- **Parâmetros**:
  - `email` (string, obrigatório): Email do usuário
  - `senha` (string, obrigatório): Senha do usuário
- **Segurança**:
  - Verificação de hash SHA-256
  - Remoção da senha do retorno
- **Respostas**:
  - `200`: Login realizado com sucesso
  - `400`: Email e senha obrigatórios
  - `401`: Credenciais inválidas
  - `500`: Erro interno do servidor

#### `listarUsuarios`
- **Descrição**: Lista todos os usuários cadastrados
- **Método HTTP**: GET
- **Funcionalidades**:
  - Retorna apenas dados seguros (sem senha)
  - Inclui timestamps de criação e atualização
- **Respostas**:
  - `200`: Lista de usuários
  - `500`: Erro interno do servidor

## Padrões de Implementação

### Tratamento de Erros
- Todos os controllers implementam try-catch
- Logs de erro detalhados para debug
- Respostas padronizadas para o cliente
- Desconexão adequada do Prisma Client

### Validações
- Validação de campos obrigatórios
- Sanitização de dados (trim)
- Verificação de tipos de dados
- Validação de regras de negócio

### Segurança
- Hash de senhas com SHA-256
- Verificação de duplicidade
- Sanitização de entrada
- Tratamento de erros sem exposição de dados sensíveis

### Testabilidade
- Todos os controllers possuem testes unitários
- Mocks do Prisma Client
- Cobertura de cenários de sucesso e erro
- Testes de validação e regras de negócio

## Tecnologias Utilizadas

- **Prisma Client**: ORM para interação com banco de dados
- **UUID**: Geração de identificadores únicos
- **Crypto**: Hash de senhas
- **Jest**: Framework de testes
- **Express**: Framework web (implícito nas assinaturas dos métodos)