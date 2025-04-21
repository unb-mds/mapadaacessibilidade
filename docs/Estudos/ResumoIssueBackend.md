

## 1. Introdução ao Contexto do Projeto

**Objetivo**: Criar uma plataforma digital colaborativa onde:
- Usuários possam cadastrar locais com recursos de acessibilidade (rampas, banheiros adaptados)
- A comunidade visualize e avalie esses espaços
- Organizações identifiquem áreas com carência de infraestrutura acessível

**Desafios Técnicos Envolvidos**:
- Processar dados geográficos com precisão
- Garantir que a interface seja usável por pessoas com diferentes tipos de deficiência
- Manter baixos custos operacionais

## 2. Fundamentos sobre Arquitetura de Software

### O que é Arquitetura de Backend?
É a estrutura invisível que:
- Processa requisições dos usuários
- Armazena e recupera dados
- Garante segurança e desempenho

**Analogia**: Se a plataforma fosse um restaurante:
- O frontend seria a decoração e o cardápio
- O backend seria a cozinha, os estoques e o sistema de pedidos

## 3. Opções Arquiteturais Explicadas

### Monólito Tradicional
**Como funciona**:
- Todas as funcionalidades num único bloco de código
- Exemplo: Sistema onde cadastro de locais, mapas e autenticação compartilham recursos

**Vantagem**:
- Simplicidade: como uma caixa de ferramentas única

**Desvantagem**:
- Dificuldade para escalar: tráfego em uma funcionalidade afeta todo o sistema

### Microsserviços
**Como funciona**:
- Divide o sistema em serviços independentes
- Exemplo: Serviço separado para mapas e autenticação

**Benefícios**:
- Escalabilidade independente
- Resiliência: falhas ficam isoladas

**Complexidade**:
- Requer orquestração entre serviços
- Necessita de ferramentas como Docker e Kubernetes

### Serverless (Sem Servidor)
**Conceito**:
- Executa código apenas quando necessário
- Gerenciado por provedores cloud (AWS, Google)

**Caso de Uso Ideal**:
- Funções esporádicas como envio de e-mails

**Economia**:
- Paga-se apenas pelo tempo de execução real

## 4. Banco de Dados para Dados Geoespaciais

### PostgreSQL com PostGIS
**O que é**:
- Banco relacional com extensão para dados geográficos
- Permite consultas por proximidade geográfica

**Recursos Chave**:
ST_DWithin() -- Calcula distâncias entre coordenadas

## 4. Alternativas Consideradas

### MongoDB
- **Tipo**: Banco não-relacional (NoSQL)
- **Formato de Dados**: Armazena documentos em JSON
- **Vantagens**: 
  - Flexível para dados variáveis
  - Schema dinâmico
- **Limitações**:
  - Operações geoespaciais menos precisas que PostGIS
  - Desempenho inferior em consultas complexas

### Firebase Firestore
- **Gerenciamento**: Plataforma do Google (Cloud)
- **Melhor Caso de Uso**: 
  - Aplicações simples e rápidas
  - Prototipagem
- **Considerações**:
  - Custo escala com uso
  - Limitações em consultas geoespaciais

---

## 5. Serviços de Mapeamento

### Mapbox GL JS
**Características Principais**:
- Biblioteca JavaScript para mapas interativos
- Tecnologia de renderização vetorial
  - Carregamento rápido
  - Alta customização

**Recursos de Acessibilidade**:
- Navegação completa via teclado
- Compatibilidade com leitores de tela
- Temas de alto contraste para visibilidade

**Exemplo de Implementação**:
```javascript
map.addLayer({
  id: 'accessible-places',
  type: 'circle',
  paint: {
    'circle-color': '#00AA00',
    'circle-radius': 8
  }
});
```
## . Comparativo de Stack Backend

### Node.js vs. Django vs. Flask

| Critério         | Node.js + Express         | Django (Python)           | Flask (Python)            |
|------------------|---------------------------|---------------------------|---------------------------|
| **Velocidade**   | Rápido (motor V8)         | Moderado (Python)         | Leve (microframework)     |
| **Ecossistema**  | Ideal para APIs REST/GraphQL | ORM poderoso (PostgreSQL) | Flexível (menos "baterias incluídas") |
| **Integração com Mapas** | SDKs nativos (Mapbox/Google Maps) | Geodjango (PostGIS nativo) | Requer bibliotecas externas (GeoAlchemy) |
| **Autenticação** | JWT/Firebase Auth simplificada | Sistema de usuários built-in | Implementação manual necessária (Flask-JWT) |



**Node.js + Express** quando:
- Prioridade em velocidade de desenvolvimento
- Stack JavaScript full (front + back)
- Integração com serviços modernos (Firebase, Mapbox)

**Django** quando:
- Necessidade de ORM robusto para dados geoespaciais
- Projeto com modelos de dados complexos
- Preferência por Python
## 6. Autenticação de Usuários

### Firebase Authentication

#### Funcionalidades
- **Múltiplos métodos de login**:
  - Redes sociais (Google, Facebook)
  - E-mail/senha
  - Números de telefone
- **SDKs disponíveis** para:
  - Web
  - Mobile (Android/iOS)
  - Backend

#### Segurança
- **Proteções automáticas**:
  - Contra ataques de força bruta
  - Tentativas de phishing
- **Criptografia**:
  - Ponta a ponta para dados sensíveis
  - Tokens JWT assinados

#### Fluxo Básico
1. Usuário clica em "Entrar com Google"
2. Firebase gerencia processo OAuth 2.0
3. Sistema recebe token JWT seguro
4. Token é validado em cada requisição

## 7. Justificativa da Stack Escolhida

### Cenários de Uso Demonstrativos

#### Evento Comunitário Massivo
- **500+ usuários simultâneos**:
  - Microsserviço de mapas escala horizontalmente
  - Funções serverless para autenticação
  - Balanceamento de carga automático

#### Uso Diário
- **Performance**:
  - Consultas geoespaciais em <500ms
  - Cache de resultados frequentes
- **Acessibilidade**:
  - Interface responsiva
  - Suporte a tecnologias assistivas

### Vantagens Estratégicas
| Benefício         | Descrição                                  |
|-------------------|--------------------------------------------|
| **Custo**         | Free tiers suficientes para MVP            |
| **Escalabilidade**| Arquitetura modular para crescimento       |
| **Manutenção**    | Componentes independentes                  |


### Recursos Educativos
- [Documentação Oficial PostGIS](https://postgis.net/docs/)
- [Guia de Acessibilidade Mapbox](https://docs.mapbox.com/help/tutorials/accessible-maps/)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
