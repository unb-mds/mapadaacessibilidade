# Ata da Reunião – Sprint 5 (Semana Atual)

**Data:** 12/05/2025  
**Duração:** 40 minutos  
**Local:** Reunião via Discord

---

## Presentes

- Alberto Côrtes Cavalcante
- Anderson Fernandes da Silva
- Caio Rocha de Oliveira
- Caio Soares de Andrade
- Samuel Rodrigues Viana Lobo

## Ausentes

- Lucas Machado Peres Ricarte
- Maria Laura Regis Cabral Dias

---

## Pauta

1. Breve retomada das atividades em curso e feedback da primeira entrega.
2. Pauta principal: finalização das partes integrais de Frontend, Backend e Infraestrutura para início das integrações locais (frontend ↔ backend ↔ banco de dados).
3. Foco no cumprimento das rotas de cadastro, conforme requisitos levantados nas sprints anteriores.
4. Sugestão de uso do Prisma para otimizar integração com o banco de dados.

---

### 1. Retomada e Feedback

- Cada subequipe apresentou rapidamente o status atual.
- Feedback geral: a primeira entrega mostrou sólido progresso em cada núcleo, mas pediu-se mais sincronia entre Front-Back-Infra.

### 2. Pauta Principal

**Objetivo:** Consolidar toda a lógica e infraestrutura de cada camada para conectar o sistema em ambiente localhost e planejar deployment futuro.

#### 2.1. Finalização das Partes Integrais

- **Frontend:** Concluir páginas secundárias e padronização de componentes; revisar código para facilitar chamadas de API.
- **Backend:** Ajustar rotas de cadastro/autenticação; validar todos os endpoints de CRUD necessários.
- **Infraestrutura & Banco de Dados:** Concluir modelagem final no PostgreSQL e ajustes de acesso; configurar variáveis de ambiente locais.

#### 2.2. Integração Local

- Estabelecer conexão do Frontend com o Backend via `http://localhost:PORT`.
- Garantir comunicação Backend ↔ banco de dados local sem erros.
- Testes básicos de fluxo de cadastro de usuário completos em localhost.

#### 2.3. Prisma

- Samuel sugeriu adotar Prisma ORM para:
  - Facilitar migrações e manter o schema sincronizado.
  - Melhorar tipagem e autocompletar nas queries.
  - Acelerar desenvolvimento de consultas complexas.
- Time concordou em iniciar prova de conceito com Prisma nesta sprint.

---

## 3. Atualização das Atividades por Área

### Frontend

- Implementação React; primeira página e componentes principais prontos.
- Integração de páginas secundárias pendente; refatoração de código em curso.
- Paleta de cores acessível definida; interface segue critérios WCAG.

### Backend

- Estudo e desenho inicial das rotas de cadastro, login e leitura de dados.
- Implementação de rotas em andamento.
- Script de verificação de senha em PostgreSQL criado; integração com hashing implementada.
- Comunicação básica Front ↔ Back para cadastro deve ser finalizada até essa semana.
- Stack definida: Express.js + NodeCP para APIs + Prisma

### Documentação & Infraestrutura

- Modelagem PostgreSQL quase finalizada; diagrama atualizado no repositório.
- Pendências: configuração de variáveis de ambiente e scripts de seed.

---

## 4. Próximos Passos e Critérios de Aceitação

- Finalizar as peças de Front, Back e Infra até o fim da sprint.
- Validar integração completa em ambiente local (cadastro de usuário funcionando).
- Prova de Conceito com Prisma implementada em uma rota de cadastro.
- Revisão coletiva do código e testes de aceitação.

✅ **Critérios de Aceitação**

- Fluxo de cadastro operando sem erros em localhost.
- Código refatorado e documentado.
- Uso do Prisma em pelo menos um endpoint.
- Todos os membros revisar e aprovar no repositório.

**Próxima reunião:** segunda-feira, 19/05/2025, às 20h.
