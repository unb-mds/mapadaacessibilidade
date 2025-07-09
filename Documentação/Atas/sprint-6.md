# Ata da Reunião – Sprint 6

**Data:** 19/05/2025  
**Duração:** 55 minutos  
**Local:** Reunião via Discord

---

## Presentes

- Alberto Côrtes Cavalcante
- Anderson Fernandes da Silva
- Caio Rocha de Oliveira
- Caio Soares de Andrade
- Samuel Rodrigues Viana Lobo
- Lucas Machado Peres Ricarte
- Maria Laura Regis Cabral Dias

---

## Pauta

- Status das tarefas da Sprint 5 e avaliação de progresso
- Foco na integração login/cadastro entre Frontend ↔ Backend ↔ Banco
- Implementação do Prisma ORM
- Testes das rotas de autenticação
- Atualização da funcionalidade de busca no mapa

---s

## 1. Avaliação de Progresso

- Avanços nas estruturas base de Backend, Frontend e Infra.
- Feedback positivo quanto ao progresso técnico.
- Integração entre camadas requer mais testes.
- Descrição de issues atualizadas no GitHub, com descrição de tarefas, DoD, critérios de aceitação e prioridades.

---

## 2. Integração Login/Cadastro

**Objetivo:** Conectar Frontend ↔ Backend para rotas de autenticação

- Rotas de cadastro e login criadas no Backend e em processo de integração com o Frontend
- Backend estruturado com Express.js e Prisma ORM
- Ambiente local com Supabase funcional para testes básicos

**DoD definido:**

- Backend e frontend devem ser integrados para login/cadastro
- Testes unitários para próxima sprint
- Documentação deve ser atualizada no repositório

---

## 3. Implementação do Prisma

- Setup inicial conduzido por Samuel e Maria
- Vantagens: tipagem, migrações, produtividade com o banco
- Utilizado como prova de conceito nas rotas de autenticação
- Documentação sendo mantida paralelamente à implementação

---

## 4. Testes de Rotas

**Issues:**

- `Teste rota de Login`
- `Teste rota de Cadastro`  
  **Responsáveis:** Lucas Ricarte e Maria Laura Regis; Samuel e Alberto

**Casos de teste definidos:**

- Cadastro com campos válidos/inválidos

---

## 5. Funcionalidade de Busca no Mapa

**Issue em destaque:**  
**Responsáveis:** Caio Soares e Dexmachi

- Campo de busca implementado no Frontend
- Integração com estrutura de localizações em andamento
- `Adicionar localizações`

---

## 6. Atualização das Atividades por Área

### Frontend

- Avanço na interface de login/cadastro e funcionalidade de busca
- Componentes seguem diretrizes WCAG
- Integração com backend parcialmente funcional para login
- Busca com dados estáticos funcional; integração dinâmica em andamento

### Backend

- Prisma implementado
- Rotas de login e cadastro criadas
- Integração com banco operacional
- Pendências: tratamento de erros e testes completos

### Infraestrutura & Banco

- Supabase funcional localmente com schemas via Prisma
- Pendentes: scripts de seed e variáveis para produção
- Diagrama deve ser atualizado no repositório

---

## 7. Próximos Passos e Critérios de Aceitação

**Próximos passos:**

- Finalizar integração total Frontend ↔ Backend ↔ Banco
- Testar o fluxo completo de login/cadastro com cobertura de casos extremos
- Atualizar documentação técnica (README e Wiki)
- Validar sistema de busca com dados dinâmicos

** Critérios de Aceitação para próximas sprints:**

- Login/cadastro funcionando sem falhas no ambiente local
- Prisma funcional e com documentação
- Sistema de busca retornando dados na interface
- Testes unitários devem ser executados e revisados
- Código revisado coletivamente e mergeado no repositório

---

**Próxima reunião:** Segunda-feira, 26/05/2025, às 20h
