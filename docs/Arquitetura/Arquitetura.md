# Escolha de Arquitetura: Por que MVC Expandido?

## Introdução

Este documento explica nossa decisão de adotar a arquitetura Model-View-Controller (MVC) expandida para o desenvolvimento do projeto Mapa da Acessibilidade. Nossa implementação segue uma abordagem moderna do MVC, com uma separação clara entre frontend e backend, onde o frontend em React se comunica com o backend Node.js + Express via API REST, e os dados são persistidos em um banco PostgreSQL. Esta escolha foi feita após análise cuidadosa das necessidades do projeto, dos recursos disponíveis e dos objetivos de longo prazo.


### Principais razões para escolha do MVC

1. **Simplicidade**
   - O padrão MVC oferece uma estrutura clara e intuitiva que facilita o desenvolvimento
   - Permite que novos membros da equipe entendam rapidamente a organização do código
   - Reduz a complexidade em comparação com arquiteturas mais elaboradas como microserviços ou CQRS

2. **Foco no produto e não na infraestrutura**
   - Como projeto universitário com prazo definido, precisamos entregar valor rapidamente
   - MVC nos permite concentrar esforços nas funcionalidades do produto
   - Evita overhead de arquiteturas mais complexas que exigiriam tempo adicional de configuração

3. **Manutenção simplificada**
   - Separação clara de responsabilidades entre Model (dados), View (interface) e Controller (lógica)
   - Facilita a identificação e correção de bugs
   - Menor necessidade de gerenciar múltiplos repositórios ou serviços independentes

4. **Adequação ao escopo do projeto**
   - Para um mapa colaborativo de acessibilidade, a arquitetura MVC atende perfeitamente às necessidades
   - O fluxo de dados é relativamente simples e direto
   - Não há necessidade imediata de escalabilidade massiva que justificaria arquiteturas distribuídas

5. **Compatibilidade com a stack escolhida**
   - Node.js + Express no backend se integram perfeitamente com o padrão MVC
   - React no frontend também se beneficia de uma organização semelhante aos princípios do MVC
   - PostgreSQL como banco de dados relacional oferece robustez e recursos avançados para consultas geoespaciais

## Implementação do MVC Expandido no nosso projeto

### Model
- Responsável pelos dados e regras de negócio
- Implementado com PostgreSQL para armazenamento das informações de locais acessíveis
- Inclui schemas e validações para garantir a integridade dos dados
- Oferece maior robustez e suporte a consultas geoespaciais

### View
- Interface do usuário completamente separada e implementada com React
- Foco em acessibilidade, usabilidade e responsividade
- Comunicação com o backend via chamadas API
- Design responsivo para funcionamento em diversos dispositivos

### Controller
- Implementado com Node.js e Express
- Gerencia as requisições do usuário
- Orquestra a comunicação entre o Model e a View
- Implementa validações e lógica de negócio
- Expõe endpoints RESTful para consumo pelo frontend

## Benefícios adicionais da escolha

1. **Facilidade de testes**
   - Cada componente pode ser testado de forma isolada
   - Maior cobertura de testes com menor esforço

2. **Documentação abundante**
   - Por ser um padrão consolidado, há vasta documentação e recursos disponíveis
   - Facilita a resolução de problemas comuns

3. **Evolução gradual**
   - Se necessário no futuro, a arquitetura MVC pode evoluir para padrões mais complexos
   - Permite refatoração incremental sem necessidade de reescrever todo o sistema

## Conclusão

A escolha da arquitetura MVC para o Mapa da Acessibilidade está alinhada com nossos objetivos de criar uma aplicação funcional, de fácil manutenção e com foco nas necessidades dos usuários. Ao evitar complexidades desnecessárias, podemos dedicar mais tempo às funcionalidades que realmente importam para tornar o projeto útil e acessível à comunidade.

Esta decisão arquitetural reflete nosso compromisso com a entrega de valor, mantendo a qualidade técnica e a sustentabilidade do projeto a longo prazo.
