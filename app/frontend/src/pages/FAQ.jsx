import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import './FAQ.css';

const faqItems = [
  {
    id: 1,
    question: "Como posso adicionar um novo local no mapa?",
    answer: "Para adicionar um novo local, você precisa estar logado na plataforma. Clique no botão 'Adicionar Local' no mapa ou no menu superior, preencha as informações do local incluindo tipos de acessibilidade disponíveis, e nossa equipe verificará as informações antes da publicação."
  },
  {
    id: 2,
    question: "Como funciona o sistema de avaliações?",
    answer: "Qualquer usuário cadastrado pode avaliar locais já mapeados. O sistema considera a experiência real de acessibilidade do local, permitindo comentários sobre rampas, banheiros adaptados, piso tátil e outros recursos. As avaliações ajudam a comunidade a ter informações mais precisas."
  },
  {
    id: 3,
    question: "Quais tipos de acessibilidade são mapeados?",
    answer: "Mapeamos diversos tipos de acessibilidade: rampas de acesso para cadeirantes, piso tátil para deficientes visuais, banheiros adaptados, elevadores acessíveis, vagas de estacionamento para PCD, sinalização em braile, intérpretes de libras, e outros recursos que facilitam a mobilidade."
  },
  {
    id: 4,
    question: "O aplicativo é gratuito?",
    answer: "Sim! O Mapa da Acessibilidade é completamente gratuito para todos os usuários. Nosso objetivo é tornar informações sobre acessibilidade acessíveis a todos, sem barreiras financeiras."
  },
  {
    id: 5,
    question: "Como posso contribuir com o projeto?",
    answer: "Existem várias formas de contribuir: cadastrando novos locais, avaliando locais existentes, reportando informações incorretas, compartilhando o app com amigos, ou contribuindo com código no GitHub (somos open source!). Toda ajuda é bem-vinda!"
  },
  {
    id: 6,
    question: "Como garantem a veracidade das informações?",
    answer: "Temos um processo de moderação onde nossa equipe verifica informações antes da publicação. Além disso, a própria comunidade ajuda reportando informações incorretas. Priorizamos sempre informações verificadas e atualizadas."
  },
  {
    id: 7,
    question: "Posso usar o app offline?",
    answer: "Algumas funcionalidades básicas estarão disponíveis offline em breve, como visualizar locais já salvos. No entanto, para buscar novos locais e enviar avaliações, você precisará de conexão com a internet."
  },
  {
    id: 8,
    question: "Como reportar um problema ou sugerir melhorias?",
    answer: "Entre em contato conosco pelo email contato@acessibilidade.com, pelas redes sociais, ou abra uma issue no nosso repositório GitHub. Valorizamos muito o feedback da comunidade para melhorar continuamente a plataforma."
  }
];

const FAQ = () => {
  const [activeItem, setActiveItem] = useState(null);

  const toggleItem = (id) => {
    setActiveItem(activeItem === id ? null : id);
  };

  return (
    <main>
      <section id="faq" className="faq-section">
        <div className="faq-container">
          {/* Section Header */}
          <div className="faq-header">
            <div className="faq-title-wrapper">
              <HelpCircle className="faq-icon" />
              <h2 className="faq-title">
                FAQ - Perguntas Frequentes
              </h2>
            </div>
            <p className="faq-subtitle">
              Tire suas dúvidas sobre como usar o Mapa da Acessibilidade
            </p>
          </div>

          {/* FAQ Items */}
          <div className="faq-accordion">
            {faqItems.map((item) => (
              <div 
                key={item.id} 
                className={`faq-item ${activeItem === item.id ? 'active' : ''}`}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={activeItem === item.id}
                >
                  <h3 className="faq-question-text">
                    {item.question}
                  </h3>
                  <div className="faq-chevron">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6,9 12,15 18,9" />
                    </svg>
                  </div>
                </button>
                <div className={`faq-answer ${activeItem === item.id ? 'expanded' : ''}`}>
                  <div className="faq-answer-content">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="faq-cta">
            <div className="faq-cta-content">
              <h3 className="faq-cta-title">
                Não encontrou sua resposta?
              </h3>
              <p className="faq-cta-text">
                Nossa equipe está aqui para ajudar! Entre em contato conosco.
              </p>
              <div className="faq-cta-buttons">
                <Link to="/contato" className="faq-button faq-button-outline">
                  Entrar em Contato
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FAQ;