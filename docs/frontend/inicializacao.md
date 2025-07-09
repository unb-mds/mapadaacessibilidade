## 🔵 | ⚡ Estrutura do App Principal 

O arquivo `App.jsx` localizado em (`src/App.jsx`) é o componente raiz da aplicação React do **Mapa da Acessibilidade**. Ele é responsável por definir a estrutura global do frontend, integrando o cabeçalho, rodapé e o sistema de rotas que conecta todas as páginas principais do sistema.

### Função e contexto

O `App.jsx` serve como ponto central de organização da interface, garantindo que a navegação entre páginas seja fluida e que elementos comuns, como o Header e o Footer, estejam presentes em todas as telas. Ele utiliza o `react-router-dom` para gerenciar as rotas e renderizar os componentes de página conforme o caminho acessado pelo usuário.

### Principais responsabilidades

- **Layout global:**  
  Renderiza o `Header` no topo e o `Footer` na base de todas as páginas, proporcionando identidade visual e navegação consistente em todo o sistema.

- **Gerenciamento de rotas:**  
  Utiliza o componente `<Routes>` e `<Route>` do `react-router-dom` para mapear URLs para os respectivos componentes de página:
  - `/` → Home
  - `/sobre-nos` → Sobre
  - `/contato` → Contato
  - `/perguntas-frequentes` → FAQ
  - `/eventos` → Eventos
  - `/cadastro` → Cadastro
  - `/login` → Login

- **Importação de estilos globais:**  
  Importa o CSS do Leaflet para garantir que o mapa seja exibido corretamente em todas as páginas que o utilizam.

### Estrutura simplificada

```jsx
<div>
  <Header />
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/sobre-nos' element={<Sobre />} />
    <Route path='/contato' element={<Contato />} />
    <Route path='/perguntas-frequentes' element={<FAQ />} />
    <Route path='/eventos' element={<Eventos />} />
    <Route path='/cadastro' element={<Cadastro />} />
    <Route path='/login' element={<Login />} />
  </Routes>
  <Footer />
</div>
```

---

## 🧠 Arquivo de Inicialização Principal

O arquivo `main.jsx` localizado em (`src/main.jsx`) é o ponto de entrada do frontend do projeto **Mapa da Acessibilidade**. Ele é responsável por inicializar a aplicação React, configurar o roteamento global e renderizar o componente raiz (`App`) dentro do elemento HTML principal da página.

### Função e contexto

Este arquivo é fundamental para o funcionamento do sistema, pois conecta o React ao DOM da aplicação, garante que todas as rotas estejam disponíveis e aplica estilos globais. Ele segue as melhores práticas modernas do ecossistema React, utilizando a API `createRoot` para melhor performance e compatibilidade com as versões mais recentes da biblioteca.

### Principais responsabilidades

- **Renderização do App:**  
  Utiliza `createRoot` para montar o componente `App` dentro do elemento com id `root` no HTML, iniciando toda a aplicação React.

- **Configuração do roteamento:**  
  Envolve o `App` com o componente `BrowserRouter` do `react-router-dom`, permitindo navegação entre páginas sem recarregar o site.

- **Importação de estilos globais:**  
  Importa o arquivo `index.css`, garantindo que estilos básicos e resets sejam aplicados em toda a aplicação.

- **Modo estrito (StrictMode):**  
  (Opcional, mas recomendado) O uso do `<StrictMode>` pode ser adicionado para ajudar a identificar problemas de renderização e práticas obsoletas durante o desenvolvimento.

### Estrutura simplificada

```jsx
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```
