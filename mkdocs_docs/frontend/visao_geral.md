![capa front end](../assets/cap_frontend.png)

# Visão Geral do Frontend

O frontend do projeto **Mapa da Acessibilidade** está localizado na pasta `app/frontend` e foi desenvolvido para fornecer uma interface moderna, acessível e responsiva, facilitando o acesso e a colaboração de usuários na busca e cadastro de locais acessíveis.

## Principais Características

- **Tecnologias Utilizadas:**  
  O frontend utiliza React (com Vite), Tailwind CSS para estilização, e bibliotecas modernas para mapas e componentes interativos.

- **Funcionalidades:**  
  - Visualização de locais acessíveis em um mapa interativo.
  - Busca e filtragem de locais por região e tipo.
  - Cadastro de novos locais e avaliações de acessibilidade.
  - Interface adaptada para diferentes dispositivos (responsiva).
 
- **Organização dos Arquivos:**  
  - `src/`: Código-fonte principal do frontend (componentes, páginas, estilos).
  - `public/`: Arquivos estáticos e imagens.
  - `images/`: Imagens utilizadas na interface.
  - Arquivos de configuração para ferramentas como Babel, ESLint, Vite e Jest.

- **Experiência do Usuário:**  
  O frontend foi projetado para ser intuitivo, com navegação simples, informações claras e foco em acessibilidade digital, alinhado ao propósito do projeto.

- **Integração com o Backend:**  
  Toda a comunicação com a API é feita via requisições HTTP, consumindo os endpoints documentados no Swagger do backend.

## 🏗️ Estrutura de Pastas
```plaintext
frontend/
├── public/          # Arquivos estáticos (HTML, imagens públicas)
├── src/
│   ├── assets/      # Recursos estáticos (SVGs, fonts, imagens internas)
│   ├── components/  # Componentes reutilizáveis
│   ├── pages/       # Páginas principais da aplicação
│   ├── views/       # Subpáginas/contextos específicos
│   ├── index.css    # Estilos globais
│   └── main.jsx     # Ponto de entrada da aplicação
├── vite.config.js   # Configuração do Vite
└── jest.config.js   # Configuração de testes
```

**Resumo**

Estes arquivos garantem que todo o código do frontend, incluindo componentes React escritos em JSX e recursos modernos do JavaScript, seja corretamente convertido para funcionar em qualquer navegador, tornando o desenvolvimento mais produtivo e o sistema bem formulado.


---

Esta seção do MkDocs apresenta uma visão geral do frontend, suas tecnologias, estrutura e principais funcionalidades, servindo como ponto de partida para desenvolvedores e colaboradores do projeto.