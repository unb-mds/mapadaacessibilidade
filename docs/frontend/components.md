## 🔘 Botão

**Componente** 

`Button` (`src/components/reusables/button/index.jsx`)

O arquivo `index.jsx` localizado em `src/components/reusables/button/` define um componente reutilizável de botão para o frontend do projeto **Mapa da Acessibilidade**.

```jsx
import "./styles.css";

export const Button = (props) => {
  return (
    <button type="button" className="button-primary" onClick={props.onClick}>
      {props.label}
    </button>
  );
};
```

**Função do componente**

- **Reutilização:**  
  Este componente foi criado para ser utilizado em diferentes partes da aplicação, promovendo padronização visual e de comportamento para todos os botões principais do sistema.

- **Estilização:**  
  O botão utiliza a classe CSS `button-primary`, definida no arquivo `styles.css` do mesmo diretório, garantindo consistência visual conforme o design do projeto.

- **Propriedades (props):**  
  - `label`: Texto exibido dentro do botão.
  - `onClick`: Função a ser executada quando o botão for clicado.

**Exemplo de uso**

```jsx
<Button label="Enviar" onClick={handleSubmit} />
```

---

## Estilo do Componente "Botão"

O arquivo `style.css` localizado em `src/components/reusables/button/` define a estilização do componente de botão reutilizável do frontend do projeto **Mapa da Acessibilidade**.

```css
.button-primary {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button-primary:hover {
  background-color: #1d4ed8;
}
```

**Função do arquivo**

- **Padronização Visual:**  
  Define a classe `.button-primary`, garantindo que todos os botões principais do sistema tenham aparência consistente, seguindo a identidade visual do projeto.

- **Detalhes da Estilização:**
  - **Cor de fundo:** Azul (`#2563eb`), transmitindo destaque e acessibilidade.
  - **Cor do texto:** Branco, para contraste e legibilidade.
  - **Sem borda:** Visual mais limpo.
  - **Padding e borda arredondada:** Proporcionam conforto visual e melhor usabilidade.
  - **Fonte em negrito:** Destaca o texto do botão.
  - **Cursor pointer:** Indica interatividade ao usuário.
  - **Transição suave:** Ao passar o mouse, a cor de fundo muda para um tom mais escuro (`#1d4ed8`), melhorando o feedback visual.

**Resumo**

Este arquivo garante que todos os botões criados com a classe `.button-primary` mantenham um padrão visual moderno, acessível e responsivo, contribuindo para a identidade visual do Mapa da Acessibilidade e a experiência do usuário no sistema.

---

## 📑Header

O componente `Header` é responsável por exibir o cabeçalho principal da aplicação **Mapa da Acessibilidade**. Ele oferece navegação entre as principais páginas do sistema e adapta seu layout para dispositivos móveis e desktop, garantindo uma boa usabilidade.

#### Principais características

- **Navegação:**  
  O `Header` exibe um menu de navegação com links para páginas como Sobre Nós, Cadastro, Login, Contato, FAQ, Eventos e Adicionar Local. Cada link possui um ícone ilustrativo, tornando a navegação mais intuitiva.

- **Responsividade:**  
  - Em telas grandes (desktop), os links aparecem horizontalmente.
  - Em telas pequenas (mobile), um botão de menu (hambúrguer) permite abrir e fechar o menu de navegação, exibindo os links em formato de lista vertical.

- **Identidade visual:**  
  - Exibe o nome do projeto, o slogan "Mobilidade sem Barreiras" e o ícone de cadeira de rodas, reforçando o propósito do sistema.
  - Utiliza classes utilitárias do Tailwind CSS para estilização, garantindo visual moderno e acessível.

- **Acessibilidade:**  
  - O botão do menu mobile possui o atributo `aria-label` para leitores de tela.
  - Os links são facilmente navegáveis por teclado e possuem feedback visual ao passar o mouse.

#### Estrutura simplificada

```jsx
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", icon: <TbInfoCircle />, label: "Sobre Nós" },
    { href: "/cadastro", icon: <TbUserPlus />, label: "Cadastro" },
    { href: "/login", icon: <TbLogin />, label: "Login" },
    { href: "/contato.html", icon: <TbMail />, label: "Contato" },
    { href: "/faq.html", icon: <TbHelpCircle />, label: "FAQ" },
    { href: "/eventos.html", icon: <TbCalendarEvent />, label: "Eventos" },
    { href: "/adicionarlocal.html", icon: <TbMapPin />, label: "Adicionar Local" },
  ];

  // ...renderização do cabeçalho e menu responsivo
}
```

## Estilização do Header

O arquivo `Header.css` localizado em `src/components/` define toda a estilização visual do componente de cabeçalho (Header) do frontend do projeto **Mapa da Acessibilidade**.


```css
/* Header */

.header {
  background: #fff;
  box-shadow: 0 2px 0 #edeef1;
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
}
.header-inner {
  max-width: 1400px;
  margin: 0 auto;
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  gap: 1rem;
}

/* LOGO AREA */
.header-logo-area {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  min-width: 220px;
}
.header-logo-icon {
  color: #2563eb;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}
.header-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #23272a;
  margin-bottom: 0;
}
.header-subtitle {
  font-size: 0.95rem;
  color: #2563eb;
  margin-top: -2px;
  margin-bottom: 0;
  font-weight: 500;
}

/* NAVIGATION (ESQUERDA) */
.header-nav {
  display: flex;
  gap: 2rem;
  flex: 1 1 auto;
  align-items: center;
  min-width: 450px;
  justify-content: flex-end;
}
.header-link {
  font-size: 1rem;
  color: #23272a;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
.header-link:hover {
  color: #2563eb;
}
.header-add-btn {
  display: flex;
  align-items: center;
  border: 1.5px solid #2563eb;
  background: #fff;
  color: #2563eb;
  border-radius: 8px;
  padding: 6px 18px;
  font-weight: 500;
  font-size: 1rem;
  text-decoration: none;
  transition: background .18s, color .18s, box-shadow .15s;
  margin-left: 16px;
}
.header-add-btn:hover {
  background: #2563eb;
  color: #fff;
  box-shadow: 0 2px 8px 1px rgb(37 99 235 / 7%);
}

.header-actions {
  display: flex;
  gap: 0.65rem;
}
.header-btn {
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  padding: 6px 22px;
  text-decoration: none;
  border: none;
  outline: none;
  text-align: center;
  transition: background .18s, color .18s;
}

.header-btn-outline {
  background: transparent;
  border: 1.5px solid #2563eb;
  color: #2563eb;
}
.header-btn-outline:hover {
  background: #2563eb;
  color: #fff;
}
.header-btn-primary {
  background: #2563eb;
  color: #fff;
  border: none;
}
.header-btn-primary:hover {
  background: #1d4ed8;
  color: #fff;
}

/* BURGER */
.header-burger {
  display: none;
  background: none;
  border: none;
  margin-left: 1rem;
  color: #23272a;
  cursor: pointer;
  transition: color .18s;
  border-radius: 6px;
  padding: 4px;
}
.header-burger:hover {
  color: #2563eb;
}

/* MOBILE MENU */
.header-mobile-menu {
  max-height: 0;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 6px 0 #eef1fa;
  transition: max-height 0.28s cubic-bezier(.48,1.03,.53,1.24);
}
.header-mobile-menu.open {
  max-height: 400px;
  transition: max-height 0.32s cubic-bezier(.22,1.03,.53,1);
  border-top: 1.5px solid #e5e7eb;
}
.header-mobile-menu nav {
  padding: 0.6rem 1rem 0.8rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.header-mobile-link {
  padding: 8px 0;
  color: #23272a;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 6px;
  transition: color 0.2s;
}
.header-mobile-link:hover {
  color: #2563eb;
  background: #f1f8ff;
}
.header-mobile-add-btn {
  width: 100%;
  margin: 10px 0 4px 0;
  justify-content: center;
}

/* MOBILE AUTH BUTTONS */
.header-mobile-auth {
  display: flex;
  gap: 10px;
  flex-direction: column;
}

@media (max-width: 1100px) {
  .header-inner {
    padding: 0 1.5rem;
  }
  .header-nav {
    min-width: 320px;
    gap: 1.15rem;
  }
  .header-logo-area {
    min-width: 170px;
  }
}
@media (max-width: 900px) {
  .header-inner {
    padding: 0 0.4rem;
  }
  .header-nav {
    gap: 1rem;
  }
}
@media (max-width: 768px) {
  .header-inner {
    height: 56px;
    gap: 0.2rem;
  }
  .header-nav,
  .header-actions {
    display: none;
  }
  .header-burger {
    display: block;
    margin-left: auto;
  }
  .header-logo-area {
    gap: 0.5rem;
    min-width: 0;
  }
  .header-mobile-menu {
    max-width: 100vw;
    width: 100vw;
    min-width: 0;
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    z-index: 80;
    border-radius: 0 0 6px 6px;
  }
}

@media (max-width: 430px) {
  .header-title { font-size: 1rem; }
  .header-subtitle { font-size: 0.88rem; }
  .header-logo-icon { width: 25px;height:25px;}
  .header-btn,
  .header-add-btn {
    font-size: 0.98rem;
    padding: 5px 7px;
  }
}
```

**Função e contexto**

O Header é um elemento central da interface, responsável por apresentar a identidade visual do sistema, facilitar a navegação entre as principais páginas e garantir uma experiência consistente e acessível em diferentes dispositivos. O arquivo `Header.css` foi cuidadosamente estruturado para garantir:

- **Identidade visual marcante:**  
  Utiliza cores institucionais (azul e tons neutros), tipografia forte e espaçamento adequado para destacar o nome do projeto, slogan e ícone.

- **Layout responsivo:**  
  O Header se adapta automaticamente a diferentes tamanhos de tela, exibindo um menu horizontal em desktops e um menu colapsável (hambúrguer) em dispositivos móveis.

- **Acessibilidade e usabilidade:**  
  Os elementos possuem espaçamento, contraste e feedback visual ao passar o mouse, facilitando a navegação tanto por mouse quanto por teclado.

**Principais classes e suas funções**

- `.header`, `.header-inner`: Estruturam o container principal, centralizando o conteúdo e aplicando sombra, fundo branco e sticky no topo.
- `.header-logo-area`, `.header-logo-icon`, `.header-title`, `.header-subtitle`: Estilizam a área do logo, nome do projeto e slogan.
- `.header-nav`, `.header-link`, `.header-add-btn`: Definem o menu de navegação principal, links e botão de ação para adicionar local.
- `.header-actions`, `.header-btn`, `.header-btn-outline`, `.header-btn-primary`: Estilizam os botões de autenticação e ações rápidas.
- `.header-burger`: Exibe o ícone de menu em telas pequenas.
- `.header-mobile-menu`, `.header-mobile-link`, `.header-mobile-add-btn`, `.header-mobile-auth`: Controlam o menu mobile, garantindo navegação acessível em smartphones.
- **Media queries**: Ajustam tamanhos, espaçamentos e visibilidade dos elementos conforme a largura da tela, garantindo responsividade total.

**Exemplo de uso**

O componente Header importa este arquivo para aplicar todas as regras de estilo, garantindo que a navegação e a identidade visual do sistema sejam mantidas em todas as páginas.

```jsx
import './Header.css';

function Header() {
  // ...
}
```

**Resumo**

O arquivo Header.css é fundamental para a experiência do usuário no Mapa da Acessibilidade, promovendo um cabeçalho moderno, acessível, responsivo e alinhado à identidade visual do projeto. Ele garante que a navegação seja intuitiva e agradável em qualquer dispositivo

---

## 🔻 Footer

O componente `Footer` localizado em: (`src/components/Footer.jsx`) é responsável por exibir o rodapé institucional do sistema **Mapa da Acessibilidade**. Ele centraliza informações de contato, links úteis, redes sociais e opções de download do aplicativo, reforçando a identidade visual e o compromisso do projeto com acessibilidade e transparência.

```jsx
import React from "react";
import "./footer.css";
import { MapPin, Mail, Phone, Facebook, Instagram, Twitter, Download } from "lucide-react";

export default function Footer() {
  const linksSections = [
    {
      title: "Links Úteis",
      links: [
        { name: "Sobre o projeto", href: "#sobre" },
        { name: "Como contribuir", href: "#contribuir" },
        { name: "Termos de uso", href: "#termos" },
        { name: "Política de privacidade", href: "#privacidade" },
      ]
    }
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
  ];

  return (
    <footer className="custom-footer">
      <div className="custom-footer__container">
        <div className="custom-footer__main">
          {/* Brand Section */}
          <div className="custom-footer__brand">
            <div className="custom-footer__brandHeader">
              <div className="custom-footer__brandIcon">
                <MapPin size={24} color="#fff" />
              </div>
              <div>
                <h3 className="custom-footer__brandTitle">Mapa da Acessibilidade</h3>
                <p className="custom-footer__brandSubtitle">Mobilidade sem Barreiras</p>
              </div>
            </div>
            <p className="custom-footer__brandDesc">
              Nosso objetivo é mapear e compartilhar informações sobre locais acessíveis 
              para pessoas com mobilidade reduzida.
            </p>
            <div className="custom-footer__contacts">
              <div className="custom-footer__contactItem">
                <Mail size={18} color="#60a5fa" />
                <a 
                  href="mailto:contato@acessibilidade.com" 
                  className="custom-footer__contactLink"
                  onClick={() => console.log("Email clicked")}
                >
                  contato@acessibilidade.com
                </a>
              </div>
              <div className="custom-footer__contactItem">
                <Phone size={18} color="#60a5fa" />
                <a 
                  href="tel:+551112345678" 
                  className="custom-footer__contactLink"
                  onClick={() => console.log("Phone clicked")}
                >
                  (11) 1234-5678
                </a>
              </div>
            </div>
          </div>
          {/* Links Section */}
          <div className="custom-footer__links">
            <h4 className="custom-footer__sectionTitle">Links Úteis</h4>
            <ul>
              {linksSections[0].links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="custom-footer__link"
                    onClick={() => console.log("Footer link clicked", link.name)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Social and App Section */}
          <div className="custom-footer__social">
            <h4 className="custom-footer__sectionTitle">Redes Sociais</h4>
            <div className="custom-footer__socialIcons">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="custom-footer__socialLink"
                    onClick={() => console.log("Social link clicked", social.name)}
                  >
                    <IconComponent size={24} />
                  </a>
                );
              })}
            </div>
            <div className="custom-footer__app">
              <h5 className="custom-footer__appTitle">📱 Baixar App</h5>
              <button 
                className="custom-footer__downloadBtn"
                onClick={() => console.log("Download app clicked")}
              >
                <Download size={18} style={{marginRight: 8}} /> Baixar App
              </button>
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="custom-footer__copyright">
          <p>
            Mapa da Acessibilidade © 2025. Todos os direitos reservados.
          </p>
          <span>Desenvolvido com <span className="custom-footer__heart">❤️</span> para a comunidade</span>
        </div>
      </div>
    </footer>
  );
}
```
**Função e contexto**

O Footer aparece em todas as páginas do sistema, servindo como ponto de referência para usuários que buscam informações institucionais, suporte, políticas e canais de comunicação. Ele também contribui para a credibilidade do projeto, apresentando de forma clara os dados de contato e promovendo o engajamento nas redes sociais.

**Estrutura do componente**

- **Brand Section:**  
  Exibe o nome do projeto, slogan, ícone de localização e uma breve descrição da missão do sistema.
- **Contatos:**  
  Mostra e-mails e telefones para contato, com ícones ilustrativos e links clicáveis.
- **Links Úteis:**  
  Lista páginas institucionais como "Sobre o projeto", "Como contribuir", "Termos de uso" e "Política de privacidade".
- **Redes Sociais:**  
  Ícones para Facebook, Instagram e Twitter, incentivando o usuário a acompanhar o projeto nas redes.
- **Download do App:**  
  Botão destacado para baixar o aplicativo, reforçando a multicanalidade do sistema.
- **Direitos autorais:**  
  Mensagem de copyright, ano e uma frase de valorização da comunidade.

### Estilização do footer

O arquivo `footer.css` localizado em `src/components/` define toda a estilização visual do componente de rodapé (Footer) do frontend do projeto **Mapa da Acessibilidade**.

```css

/* Footer */
.custom-footer {
  background: #1a2233;
  color: #fff;
}
.custom-footer__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 16px 0 16px;
  display: flex;
  flex-direction: column;
}
.custom-footer__main {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 48px 32px;
  padding-bottom: 32px;
}
@media (max-width: 900px) {
  .custom-footer__main { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 700px) {
  .custom-footer__main { grid-template-columns: 1fr; }
}
.custom-footer__brand {
  grid-column: span 1;
}
.custom-footer__brandHeader {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}
.custom-footer__brandIcon {
  background: linear-gradient(90deg, #2563eb, #60a5fa);
  padding: 10px;
  border-radius: 12px;
  display: flex;
}
.custom-footer__brandTitle {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 2px;
}
.custom-footer__brandSubtitle {
  font-size: .95rem;
  color: #b2bdd6;
  font-weight: 400;
}
.custom-footer__brandDesc {
  font-size: .97rem;
  color: #b2bdd6;
  margin-bottom: 18px;
  max-width: 370px;
}
.custom-footer__contacts {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 0;
}
.custom-footer__contactItem {
  display: flex;
  align-items: center;
  gap: 10px;
}
.custom-footer__contactLink {
  color: #b2bdd6;
  text-decoration: none;
  transition: color .23s;
  font-size: .98rem;
}
.custom-footer__contactLink:hover {
  color: #60a5fa;
}

.custom-footer__links {
  grid-column: span 1;
  display: flex;
  flex-direction: column;
}
.custom-footer__sectionTitle {
  color: #60a5fa;
  font-size: 1.08rem;
  font-weight: 600;
  margin-bottom: 1em;
}
.custom-footer__links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.custom-footer__link {
  color: #b2bdd6;
  font-size: .98rem;
  text-decoration: none;
  transition: color .22s;
  margin-bottom: 7px;
  display: inline-block;
}
.custom-footer__link:hover {
  color: #60a5fa;
}

.custom-footer__social {
  grid-column: span 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.custom-footer__socialIcons {
  display: flex;
  gap: 14px;
  margin-bottom: 1.4em;
}
.custom-footer__socialLink {
  color: #b2bdd6;
  transition: color .22s;
}
.custom-footer__socialLink:hover {
  color: #60a5fa;
}
.custom-footer__app {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.custom-footer__appTitle {
  color: #60a5fa;
  font-size: .96rem;
  font-weight: 500;
  margin-bottom: 9px;
}
.custom-footer__downloadBtn {
  background: #fff;
  color: #2563eb;
  border: 1.7px solid #60a5fa;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  padding: 8px 19px 8px 14px;
  display: flex;
  align-items: center;
  cursor: pointer;
  outline: none;
  transition: background .2s, color .19s;
}
.custom-footer__downloadBtn:hover {
  background: #2563eb;
  color: #fff;
  border-color: #2563eb;
}

.custom-footer__copyright {
  border-top: 1px solid #31405a;
  margin-top: 32px;
  padding: 18px 0 14px 0;
  color: #b2bdd6;
  font-size: .97rem;
  display: flex;
  flex-direction: column;
  gap: 7px;
  align-items: center;
  justify-content: space-between;
}
@media (min-width:600px) {
  .custom-footer__copyright {
    flex-direction: row;
  }
}
.custom-footer__heart {
  color: #e25555;
}

/* Responsive tweaks */
@media (max-width:600px) {
  .custom-footer__container { padding: 26px 5vw 0 5vw; }
  .custom-footer__main { gap: 30px 16px; }
  .custom-footer__brandDesc { max-width: 100%; }
}

```

**Função e contexto**

O Footer é um elemento fundamental da interface, presente em todas as páginas do sistema, responsável por apresentar informações institucionais, contatos, links úteis, redes sociais e opções de download do aplicativo. O arquivo `footer.css` foi cuidadosamente elaborado para garantir:

- **Identidade visual consistente:**  
  Utiliza uma paleta de cores sóbria (azul escuro, azul claro e branco), tipografia clara e espaçamento generoso, alinhando-se à identidade visual do projeto.

- **Layout responsivo:**  
  O rodapé se adapta automaticamente a diferentes tamanhos de tela, exibindo as seções em colunas no desktop e empilhadas no mobile, garantindo boa usabilidade em qualquer dispositivo.

- **Acessibilidade e usabilidade:**  
  Os elementos possuem contraste adequado, espaçamento confortável, feedback visual em links e botões, e navegação facilitada tanto por mouse quanto por teclado.

**Principais classes e suas funções**

- `.custom-footer`, `.custom-footer__container`: Estruturam o rodapé, definindo fundo, cor do texto, largura máxima e centralização do conteúdo.
- `.custom-footer__main`: Organiza as principais seções do rodapé em grid, com responsividade para diferentes larguras de tela.
- `.custom-footer__brand`, `.custom-footer__brandHeader`, `.custom-footer__brandIcon`, `.custom-footer__brandTitle`, `.custom-footer__brandSubtitle`, `.custom-footer__brandDesc`: Estilizam a área de identidade do projeto, incluindo ícone, nome, slogan e descrição.
- `.custom-footer__contacts`, `.custom-footer__contactItem`, `.custom-footer__contactLink`: Estilizam a seção de contatos, com ícones e links interativos.
- `.custom-footer__links`, `.custom-footer__sectionTitle`, `.custom-footer__link`: Definem a seção de links úteis, com títulos destacados e links com efeito hover.
- `.custom-footer__social`, `.custom-footer__socialIcons`, `.custom-footer__socialLink`: Estilizam a área de redes sociais, com ícones alinhados e feedback visual.
- `.custom-footer__app`, `.custom-footer__appTitle`, `.custom-footer__downloadBtn`: Estilizam a área de download do aplicativo, com botão destacado e responsivo.
- `.custom-footer__copyright`, `.custom-footer__heart`: Exibem a mensagem de direitos autorais e valorização da comunidade, com ícone de coração em destaque.

- **Media queries:**  
  Ajustam o layout do rodapé para diferentes tamanhos de tela, garantindo que o conteúdo permaneça legível e bem distribuído em dispositivos móveis e desktops.

**Resumo**

O componente Footer é essencial para a experiência do usuário no Mapa da Acessibilidade, promovendo transparência, fácil acesso a informações institucionais e reforçando a identidade do projeto. Sua implementação modular e estilização dedicada garantem consistência visual e acessibilidade em