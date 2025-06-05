# Engenharia de Requisitos

## 📋 1. Visão Geral do Projeto

### 💡 Nome do Projeto

**Mapeamento com Acessibilidade para Atividade Comunitária**

### 🎯 Propósito

Desenvolver uma **plataforma web colaborativa** que permita o mapeamento de locais acessíveis, com foco em atividades comunitárias, inclusão social e cidadania.  
A ideia é que moradores, voluntários e organizações possam cadastrar e consultar espaços acessíveis de forma participativa.

---

## 🔧 Funcionalidades

A plataforma contempla um conjunto de **requisitos funcionais** e **não funcionais**, definidos com base nas necessidades dos usuários e boas práticas de usabilidade e acessibilidade digital.

> 📄 Acesse a documentação completa dos requisitos aqui:  
> 👉 [Escopo de Funcionalidades no Canva](https://www.canva.com/design/DAGkRnxFbno/UzQqYdR57qFCH5p5HUuFVw/edit?utm_content=DAGkRnxFbno&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

---

## 🔍 2. Levantamento de Requisitos

### 👥 Perfis de Usuários (Atores)

- **Usuário visitante**  
  Acessa informações públicas sem necessidade de login.

- **Usuário autenticado**  
  Morador ou voluntário que pode cadastrar locais, comentar e avaliar.

- **Organização Social**  
  Responsável por divulgar eventos acessíveis à comunidade.

- **Moderador / Administrador**  
  Revisa conteúdos, gerencia usuários e aprova cadastros se necessário.

---

## ✅ 3. Requisitos Funcionais (RF)

| Código | Requisito Funcional                   | Descrição                                                         |
| ------ | ------------------------------------- | ----------------------------------------------------------------- |
| RF01   | Cadastro de usuário                   | Permitir registro com nome, e-mail e senha.                       |
| RF02   | Login/Logout                          | Autenticar usuários e encerrar sessão.                            |
| RF03   | Recuperação de senha                  | Enviar e-mail para redefinir senha.                               |
| RF04   | Cadastro de local acessível           | Inserir nome, tipo, endereço, acessibilidades, fotos e descrição. |
| RF05   | Edição de local                       | Permitir que usuários editem informações que cadastraram.         |
| RF06   | Visualização em mapa                  | Exibir locais cadastrados em mapa interativo.                     |
| RF07   | Filtros de acessibilidade             | Buscar locais com rampas, piso tátil, banheiro adaptado, etc.     |
| RF08   | Busca por região ou tipo de atividade | Pesquisa por cidade, bairro, evento, feira etc.                   |
| RF09   | Avaliação de acessibilidade           | Usuários podem avaliar e comentar os locais.                      |
| RF10   | Geolocalização                        | Marcar local automaticamente ou via mapa.                         |
| RF11   | Upload de fotos                       | Enviar imagens do local e suas condições.                         |
| RF12   | Cadastro de eventos acessíveis        | Organizações podem divulgar eventos temporários.                  |
| RF13   | Moderação de conteúdo                 | Aprovação, rejeição ou exclusão de cadastros.                     |
| RF14   | Notificações                          | Enviar alertas sobre comentários ou novos locais.                 |
| RF15   | Interface acessível                   | Plataforma compatível com tecnologias assistivas.                 |

---

## 🚫 4. Requisitos Não Funcionais (RNF)

| Código | Requisito Não Funcional | Descrição                                                               |
| ------ | ----------------------- | ----------------------------------------------------------------------- |
| RNF01  | Responsividade          | Interface adaptável a dispositivos móveis.                              |
| RNF02  | Acessibilidade digital  | Compatível com leitores de tela, teclados, contraste adequado, etc.     |
| RNF03  | Desempenho              | Página deve carregar em até 3 segundos.                                 |
| RNF04  | Escalabilidade          | Suportar aumento de usuários e volume de dados sem perda de desempenho. |
| RNF05  | Segurança               | Criptografia de senhas, proteção contra injeção de dados e CSRF.        |
| RNF06  | Código Aberto           | Repositório público e documentado (ex: GitHub).                         |
| RNF07  | Backup de dados         | Manter cópias regulares do banco de dados para recuperação.             |

---

## 🧭 5. Casos de Uso (Visão Geral)

| Código | Caso de Uso                       | Atores Envolvidos       |
| ------ | --------------------------------- | ----------------------- |
| UC01   | Cadastrar-se na plataforma        | Usuário                 |
| UC02   | Entrar na conta                   | Usuário                 |
| UC03   | Cadastrar novo local acessível    | Usuário                 |
| UC04   | Visualizar locais em mapa         | Todos                   |
| UC05   | Filtrar locais por acessibilidade | Todos                   |
| UC06   | Avaliar e comentar local          | Usuário                 |
| UC07   | Editar local cadastrado           | Usuário (dono do local) |
| UC08   | Cadastrar evento acessível        | Organização Social      |
| UC09   | Moderação de locais e eventos     | Moderador/Admin         |
| UC10   | Receber notificações              | Usuário                 |
| UC11   | Recuperar senha                   | Usuário                 |

---
