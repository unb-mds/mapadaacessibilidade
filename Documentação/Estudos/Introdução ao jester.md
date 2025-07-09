
## O que é Jester?
Jester é um **micro-framework web** para a linguagem de programação **Nim**, projetado para ser simples, eficiente e fácil de usar. Ele permite criar aplicações web rápidas com rotas, middlewares e suporte a templates.

### Principais características:
- **Leve e rápido**: Consome poucos recursos.
- **Sintaxe simples**: Similar a frameworks como Flask (Python) ou Sinatra (Ruby).
- **Suporte a rotas dinâmicas**: Ex: `/user/:id`.
- **Templates integrados**: Usa o motor `karax` para renderização.
- **WebSockets**: Suporte nativo para conexões em tempo real.

---

## Como rodar o Jester na sua máquina?

### Pré-requisitos:
1. **Instalar Node.js**:
   - Download: [nodejs.org](https://nodejs.org/)
   - Verifique a instalação:
     ```bash
     node --version
     npm --version
     ```

2. **Instalar o Jester**:
   ```bash
   npm install --save-dev jest
   ```

3. **Rodar o comando dos testes**:
   ```bash
   npm tests
   ```