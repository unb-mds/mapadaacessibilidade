# ⚙️ Configurações Essenciais

### O que faz o arquivo `vite.config.js`

O arquivo `vite.config.js` localizado na pasta `app/frontend` é responsável pela configuração do Vite, a ferramenta de build e desenvolvimento utilizada no frontend.

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

**Principais pontos da configuração:**

- **Importação de Plugins:**  
  - `@vitejs/plugin-react`: Permite que o Vite entenda e otimize projetos React, habilitando recursos como Fast Refresh e suporte a JSX.
  - `@tailwindcss/vite`: Integra o Tailwind CSS ao processo de build, permitindo o uso das utilidades do Tailwind diretamente nos componentes React.

- **Exportação da Configuração:**  
  O arquivo exporta uma configuração padrão do Vite, ativando os plugins mencionados. Isso garante que, ao rodar o projeto (`npm run dev`), o ambiente de desenvolvimento já esteja pronto para trabalhar com React e Tailwind CSS de forma otimizada.

**Resumo** 

  Este arquivo garante que o frontend tenha um ambiente moderno, rápido e produtivo, com suporte total ao React e ao Tailwind CSS, facilitando o desenvolvimento de interfaces acessíveis.

---

### O que faz o arquivo `babel.config.js`

O arquivo `babel.config.js` localizado na pasta `app/frontend` define as configurações do Babel para o frontend.

```javascript
export default {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react", // Adicione isso
  ],
};
```

**Função no projeto**

O Babel é um transpilador JavaScript que converte código moderno em versões compatíveis com diferentes navegadores. No contexto deste projeto, o arquivo está configurando dois presets principais:

- `@babel/preset-env:`  
  Permite que o código JavaScript moderno seja convertido automaticamente para versões compatíveis com os navegadores suportados pelo projeto.

- `@babel/preset-react:`  
  Habilita a transformação de código JSX (usado em React) para JavaScript puro, permitindo que o React funcione corretamente durante o desenvolvimento e na produção.

---

### O que faz o arquivo `jest.config.js`

O arquivo `jest.config.js` localizado na pasta `app/frontend` define as configurações do Jest, o framework de testes utilizado no frontend do projeto **Mapa da Acessibilidade**.

```javascript
export default {
  testEnvironment: "jsdom",
};
```

**Função no projeto**

- **testEnvironment: "jsdom"**  
  Esta configuração indica que o ambiente de teste será o **jsdom**, uma implementação em JavaScript do DOM e das APIs do navegador.

  Isso permite simular um navegador durante a execução dos testes, tornando possível testar componentes React e outras funcionalidades que dependem do ambiente do browser, sem a necessidade de um navegador real.

**Resumo**

O arquivo garante que os testes automatizados do frontend sejam executados em um ambiente que simula o navegador, possibilitando a validação de componentes de interface e interações do usuário de forma confiável

---

### O que faz o arquivo `eslint.config.js`

O arquivo `eslint.config.js` localizado na pasta `app/frontend` define as regras e configurações do ESLint, a ferramenta de análise estática de código.

```javascript
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];
```

**Função no projeto**

- **Padronização e Qualidade de Código:**  
  O ESLint ajuda a manter o código limpo, padronizado e livre de erros comuns, facilitando a colaboração entre os desenvolvedores.

**Principais configurações:**
  - **Ignora a pasta `dist`:**

    Arquivos gerados na build não são analisados.

  - **Arquivos analisados:** 

    Todos os arquivos `.js` e `.jsx` do projeto.

  - **Suporte a ECMAScript moderno e JSX:**

    Permite o uso de recursos modernos do JavaScript e sintaxe JSX do React.

  - **Plugins:** 

    - `eslint-plugin-react-hooks`: Garante o uso correto dos hooks do React.
    - `eslint-plugin-react-refresh`: Ajuda no hot reload seguro durante o desenvolvimento.

  - **Regras:**

    - Usa as recomendações padrão do ESLint e dos hooks do React.
    - Gera erro para variáveis não utilizadas, exceto se começarem com letra maiúscula ou sublinhado.
    - Emite aviso se componentes não forem exportados corretamente para o React Refresh.

---

## O que faz o arquivo `package.json`

O arquivo `package.json` localizado na pasta `app/frontend` é o principal arquivo de configuração do frontend do projeto **Mapa da Acessibilidade**. Ele define as informações essenciais do projeto, scripts de automação, dependências e configurações necessárias para o desenvolvimento, testes e build da aplicação.

**Principais funções**

- **Identificação do Projeto:**  
  Contém o nome, versão e tipo de módulo do projeto, facilitando a identificação e o gerenciamento pelo npm.

- **Scripts:**  
  Define comandos que automatizam tarefas comuns, como:
  - `dev`: Inicia o servidor de desenvolvimento com Vite.
  - `build`: Gera a versão de produção do frontend.
  - `lint`: Executa o ESLint para análise de qualidade do código.
  - `preview`: Visualiza o build de produção localmente.
  - `tests`: Executa os testes automatizados com Jest.
  - `test`: Script padrão de teste (não utilizado, apenas exibe uma mensagem de erro).

- **Dependências:**  
  Lista todas as bibliotecas e frameworks necessários para rodar o frontend, incluindo:
  - **React** e **React DOM**: Biblioteca principal para construção da interface.
  - **Vite**: Ferramenta de build e servidor de desenvolvimento rápido.
  - **Tailwind CSS**: Framework utilitário para estilização.
  - **Leaflet** e **react-leaflet**: Para mapas interativos.
  - **Jest** e **Testing Library**: Para testes automatizados.
  - Outras bibliotecas de suporte, como `uuid`, `react-icons`, `lucide-react`, etc.

- **DevDependencies:**  
  Inclui ferramentas de desenvolvimento, como Babel (transpilação), ESLint (análise de código), plugins do Vite, tipos do React, Prisma (ORM), entre outros.

**Importância no projeto**

O `package.json` garante que todos os desenvolvedores utilizem as mesmas versões de dependências e tenham acesso aos mesmos scripts de automação, tornando o ambiente de desenvolvimento padronizado, previsível e fácil de configurar.

**Resumo**

Em resumo, o arquivo `package.json` é o ponto central de configuração do frontend, responsável por:
- Gerenciar dependências e ferramentas.
- Automatizar tarefas de desenvolvimento, build, testes e lint.
- Garantir a padronização do ambiente de trabalho para toda a equipe.

> **Dica:** Sempre que for instalar uma nova biblioteca ou atualizar alguma dependência, o `package.json` será automaticamente atualizado, e deve ser versionado junto com o projeto.

---

### Conclusão

Estes arquivos garantem que o código do frontend siga boas práticas, evite erros comuns e utilize corretamente os recursos propostos, promovendo um desenvolvimento mais seguro, padronizado e eficiente.