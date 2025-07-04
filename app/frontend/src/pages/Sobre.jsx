import React, { useState } from "react";
import "./Sobre.css";

const teamMembers = [
  { name: "Lucas Ricarte", role: "Front-end Developer", initials: "LR" },
  { name: "Alberto Côrtes", role: "Frontend & UI/UX", initials: "AC" },
  { name: "Caio Rocha", role: "Front-end Developer", initials: "CR" },
  { name: "Samuel Rodrigues", role: "Back-end Developer", initials: "SR" },
  { name: "Maria Laura", role: "Back-end Developer", initials: "ML" },
  { name: "Caio Andrade", role: "Documentação & Infra", initials: "CA" },
  { name: "Anderson Silva", role: "Gerente de BD", initials: "AS" },
];

// Componente Card customizado
const Card = ({ children, className = "" }) => (
  <div className={`card ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`card-content ${className}`}>{children}</div>
);

// Componente Button customizado
const Button = ({ children, className = "", onClick, href, target, rel }) => {
  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={`button ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={`button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

// Componente Carousel customizado
const Carousel = ({ children, className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= teamMembers.length - 3 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex <= 0 ? teamMembers.length - 3 : prevIndex - 1,
    );
  };

  return (
    <div className={`carousel ${className}`}>
      <button className="carousel-btn carousel-prev" onClick={prevSlide}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="15,18 9,12 15,6"></polyline>
        </svg>
      </button>
      <div className="carousel-content">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * 33.333}%)` }}
        >
          {children}
        </div>
      </div>
      <button className="carousel-btn carousel-next" onClick={nextSlide}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="9,18 15,12 9,6"></polyline>
        </svg>
      </button>
    </div>
  );
};

// Ícones SVG customizados
const CompassIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88"></polygon>
  </svg>
);

const BookOpenIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

const CodeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="16,18 22,12 16,6"></polyline>
    <polyline points="8,6 2,12 8,18"></polyline>
  </svg>
);

const TeamMemberCard = ({ name, role, initials }) => (
  <Card className="team-member-card">
    <CardContent>
      <div className="member-avatar">
        <span className="member-initials">{initials}</span>
      </div>
      <h3 className="member-name">{name}</h3>
      <p className="member-role">{role}</p>
    </CardContent>
  </Card>
);

const About = () => {
  return (
    <main className="about-container">
      <section className="hero-section">
        <div className="hero-content">
          <div className="mission-badge">
            <CompassIcon />
            Nossa Missão
          </div>
          <h1 className="hero-title">
            O melhor Web App para trilhar o seu caminho!
          </h1>
          <p className="hero-description">
            Uma plataforma colaborativa para apoiar atividades comunitárias com
            foco em acessibilidade. Permitimos que qualquer pessoa cadastre e
            encontre locais acessíveis.
          </p>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1524513017549-db6af445c34a?q=80&w=1424&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Estacionamento para cadeirante"
          />
        </div>
      </section>

      <section className="features-section">
        <Card className="feature-card">
          <CardContent>
            <h3 className="feature-title">🎯 Objetivo</h3>
            <p className="feature-description">
              Facilitar o dia a dia de quem precisa de informações sobre
              acessibilidade e incentivar a participação da comunidade.
            </p>
          </CardContent>
        </Card>
        <Card className="feature-card">
          <CardContent>
            <h3 className="feature-title">💡 Motivação</h3>
            <p className="feature-description">
              A falta de informação sobre acessibilidade é um desafio real.
              Queremos mudar isso oferecendo uma ferramenta feita pela e para a
              comunidade.
            </p>
          </CardContent>
        </Card>
        <Card className="feature-card">
          <CardContent>
            <h3 className="feature-title">🔧 Funcionalidades</h3>
            <ul className="feature-list">
              <li>Mapa colaborativo</li>
              <li>Cadastro e avaliação</li>
              <li>Filtros de acessibilidade</li>
              <li>Busca por região</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="team-section">
        <h2 className="team-title">Nossa Equipe</h2>
        <Carousel className="team-carousel">
          {teamMembers.map((member, index) => (
            <div key={index} className="carousel-item">
              <TeamMemberCard {...member} />
            </div>
          ))}
        </Carousel>
      </section>

      <section className="documentation-section">
        <div className="documentation-content">
          <div className="documentation-icon">
            <BookOpenIcon />
          </div>
          <h3 className="documentation-title">Documentação Técnica</h3>
          <p className="documentation-description">
            Explore nossa arquitetura, APIs e guias de contribuição para
            entender como a plataforma funciona e como você pode colaborar.
          </p>
          <Button
            className="documentation-button"
            href="https://unb-mds.github.io/mapadaacessibilidade/docs/introduction"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CodeIcon /> Acessar Documentação
          </Button>
        </div>
      </section>
    </main>
  );
};

export default About;
