![](assets/capa_devops.png)

# DevOps

## Visão Geral

Esta seção documenta as práticas e ferramentas de DevOps utilizadas no projeto **Mapa da Acessibilidade**. O projeto utiliza uma arquitetura com frontend em React/Vite e backend em Node.js, com deploy automatizado e integração contínua.

## Deploy

### Ferramentas Utilizadas

- **Vercel**: Para deploy do frontend React/Vite
- **Render**: Para deploy do backend Node.js

### Estratégia de Deploy

A estratégia principal é fazer uma conexão entre os deploys do frontend com o backend, integrando o Vercel e o Render para trabalhar em conjunto.

**Nota importante**: O Vite não é uma ferramenta de deploy, mas sim de build.

### Implementação do Vercel (Frontend)

1. Utilizar o código mais recente possível
2. Fazer login no site do Vercel usando a conta do projeto
3. Selecionar o framework Vite
4. Editar a ROOT do projeto para `/app/frontend` (localização do index.html)
5. Executar o Build
6. **IMPORTANTE**: Fazer commit na mesma conta utilizada para o build no Vercel
7. Deploy concluído e aplicação online

### Implementação do Render (Backend)

1. Utilizar o código mais recente possível
2. Fazer login no site do Render usando a conta do projeto
3. Escolher o tipo de projeto (web service)
4. Selecionar Node.js como linguagem
5. Escolher o servidor
6. Configurar a ROOT do projeto para `app/backend`
7. Selecionar comando de build
8. Selecionar comando de start (exemplo: `node index.js`)
9. Selecionar plano free
10. Criar variáveis de ambiente (.env) no próprio website, caso necessário
11. Executar o deploy

### Integração Frontend-Backend

A integração é realizada conectando o servidor onde normalmente seria conectado localmente, com a diferença de que não será em localhost, mas nas URLs fornecidas pelo Render.

### Recursos de Referência

- [Integração Vercel+Render](https://www.youtube.com/watch?v=vrvEsNLhlag)
- [Integração Vercel](https://www.youtube.com/watch?v=0v74FFEPcrU)
- [Integração Render](https://www.youtube.com/watch?v=e7L_8XVQBik)

## Testes Automatizados

### Framework de Testes

O projeto utiliza **Jest** como framework principal para testes, executado através do comando `npm run tests`.

### Convenção de Nomenclatura

O sistema procura automaticamente por arquivos que seguem a nomenclatura: `(nome).test.(linguagem)`

### Configuração do Jest

```javascript
export default {
  testEnvironment: "jsdom",
};
```

### Configuração do Babel

Para compatibilidade com JSX no Jest:

```javascript
export default {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
  ],
};
```

**Nota**: O Babel é necessário como conversor de JS para JSX, já que o Jest funciona primordialmente com JavaScript.

### Estrutura de Testes

Os testes utilizam `data-testid` para identificar elementos específicos que serão testados. Este atributo serve para indicar onde o teste deve procurar pelo elemento esperado.

### Automação de Testes (CI/CD)

O sistema de automação:
1. Instala as dependências da máquina
2. Executa `npm run tests` em ambas as áreas do código (backend e frontend)

#### Testes Implementados

- **Controllers do Backend**: Testes automatizados implementados para todos os controllers
- **Frontend**: Testes de componentes React

## Ferramentas de Qualidade de Código

### ESLint

Configuração para padronização e qualidade do código:

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

### Ferramentas Aplicadas

- **Lint**: Aplicado tanto no frontend quanto no backend
- **Babel**: Para transpilação de código
- **Jest**: Para execução de testes
- **ESLint**: Para padronização de código

## Integração Contínua (CI)

### GitHub Actions

O projeto utiliza GitHub Actions para automação de testes com CI. Os testes são executados automaticamente para todos os controllers do backend, garantindo a qualidade e integridade do código.

### Funcionalidades Implementadas

- Testes automatizados para controllers de acessibilidade
- Testes para controllers de locais
- Testes para controllers de fotos
- Configuração de CI para execução automática dos testes

## Comandos Úteis

- `npm run tests`: Executa todos os testes do projeto
- `npm run lint`: Executa a verificação de lint
- `npm run build`: Gera build de produção (frontend)
- `npm start`: Inicia o servidor (backend)