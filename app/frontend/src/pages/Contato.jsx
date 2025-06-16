import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from 'lucide-react';
import './Contato.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      description: "contato@acessibilidade.com",
      action: "mailto:contato@acessibilidade.com"
    },
    {
      icon: Phone,
      title: "Telefone",
      description: "(11) 1234-5678",
      action: "tel:+551112345678"
    },
    {
      icon: MapPin,
      title: "Endereço",
      description: "Universidade de Brasília - UnB\nCampus Darcy Ribeiro, Brasília - DF",
      action: null
    },
    {
      icon: Clock,
      title: "Horário de Atendimento",
      description: "Segunda a Sexta: 9h às 18h\nSábado: 9h às 12h",
      action: null
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    alert('Mensagem enviada com sucesso! Responderemos em breve.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <main className="contact-main">
      <section id="contato" className="contact-section">
        <div className="contact-container">
          <div className="contact-header">
            <div className="contact-title-wrapper">
              <MessageCircle className="contact-icon" />
              <h2 className="contact-title">Contato</h2>
            </div>
            <p className="contact-subtitle">
              Entre em contato conosco! Estamos aqui para ajudar e ouvir suas sugestões
            </p>
          </div>

          <div className="contact-content">
            <div className="contact-info-section">
              <h3 className="contact-info-title">
                Informações de Contato
              </h3>
              
              <div className="contact-info-grid">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="contact-info-card">
                      <div className="contact-info-content">
                        <div className="contact-info-icon-wrapper">
                          <IconComponent className="contact-info-icon" />
                        </div>
                        <div className="contact-info-text">
                          <h4 className="contact-info-card-title">
                            {info.title}
                          </h4>
                          {info.action ? (
                            <a 
                              href={info.action}
                              className="contact-info-link"
                            >
                              {info.description}
                            </a>
                          ) : (
                            <p className="contact-info-description">
                              {info.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="contact-form-section">
              <div className="contact-form-card">
                <div className="contact-form-header">
                  <h3 className="contact-form-title">
                    Envie sua Mensagem
                  </h3>
                  <p className="contact-form-description">
                    Preencha o formulário abaixo e entraremos em contato o mais breve possível.
                  </p>
                </div>
                <div className="contact-form-content">
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name" className="form-label">
                          Nome *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Seu nome completo"
                          required
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email" className="form-label">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="seu@email.com"
                          required
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="subject" className="form-label">
                        Assunto
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Sobre o que você gostaria de falar?"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="message" className="form-label">
                        Mensagem *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Descreva sua dúvida, sugestão ou feedback..."
                        rows={6}
                        required
                        className="form-textarea"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="form-submit-button"
                    >
                      <Send className="submit-icon" />
                      Enviar Mensagem
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}