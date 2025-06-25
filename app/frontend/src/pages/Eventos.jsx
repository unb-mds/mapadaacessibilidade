import { Calendar, MapPin, Users, Clock, ExternalLink } from 'lucide-react';
import React from 'react';
import './Eventos.css';

export default function Events() {
  console.log("Events component rendered");

  const upcomingEvents = [
    {
      id: 1,
      title: "Workshop: Avaliação de Acessibilidade Urbana",
      description: "Aprenda a avaliar e cadastrar locais acessíveis de forma técnica e precisa. Workshop prático com especialistas.",
      date: "2025-06-20",
      time: "14:00",
      location: "Centro Cultural Banco do Brasil - RJ",
      type: "workshop",
      attendees: 45,
      maxAttendees: 60,
      isOnline: false,
      isFree: true
    },
    {
      id: 2,
      title: "Webinar: Tecnologias Assistivas e Mapping",
      description: "Como as tecnologias assistivas podem ser integradas ao mapeamento colaborativo de acessibilidade.",
      date: "2025-06-25",
      time: "19:00",
      location: "Online",
      type: "webinar",
      attendees: 128,
      maxAttendees: 200,
      isOnline: true,
      isFree: true
    },
    {
      id: 3,
      title: "Mutirão de Mapeamento - Zona Sul",
      description: "Ação comunitária para mapear locais acessíveis na Zona Sul do Rio. Participação aberta a todos!",
      date: "2025-07-02",
      time: "09:00",
      location: "Copacabana - Ponto de encontro na Praia",
      type: "acao",
      attendees: 23,
      maxAttendees: 50,
      isOnline: false,
      isFree: true
    },
    {
      id: 4,
      title: "Hackathon: Soluções de Acessibilidade",
      description: "48h desenvolvendo soluções inovadoras para problemas de acessibilidade urbana. Prêmios para os melhores projetos!",
      date: "2025-07-15",
      time: "18:00",
      location: "Campus Universitário - UnB",
      type: "hackathon",
      attendees: 67,
      maxAttendees: 100,
      isOnline: false,
      isFree: false
    }
  ];

  const eventTypes = {
    workshop: { label: "Workshop", color: "event-badge-workshop" },
    webinar: { label: "Webinar", color: "event-badge-webinar" },
    acao: { label: "Ação Comunitária", color: "event-badge-acao" },
    hackathon: { label: "Hackathon", color: "event-badge-hackathon" }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleEventClick = (eventId) => {
    console.log("Event clicked", { eventId });
  };

  const handleRegister = (eventId) => {
    console.log("Register for event clicked", { eventId });
  };

  return (
    <section id="eventos" className="events-section">
      <div className="events-container">
        {/* Section Header */}
        <div className="events-header">
          <div className="events-title-wrapper">
            <Calendar className="events-title-icon" />
            <h2 className="events-title">
              Eventos
            </h2>
          </div>
          <p className="events-subtitle">
            Participe de workshops, mutirões e ações que fortalecem nossa comunidade
          </p>
        </div>

        {/* Events Grid */}
        <div className="events-grid">
          {upcomingEvents.map((event) => (
            <div 
              key={event.id}
              className="event-card"
              onClick={() => handleEventClick(event.id)}
            >
              <div className="event-card-header">
                <div className="event-badges-row">
                  <span className={`event-badge ${eventTypes[event.type].color}`}>
                    {eventTypes[event.type].label}
                  </span>
                  <div className="event-status-badges">
                    {event.isFree && (
                      <span className="event-badge event-badge-free">
                        Gratuito
                      </span>
                    )}
                    {event.isOnline && (
                      <span className="event-badge event-badge-online">
                        Online
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="event-card-title">
                  {event.title}
                </h3>
              </div>
              
              <div className="event-card-content">
                <p className="event-description">
                  {event.description}
                </p>
                
                <div className="event-details">
                  <div className="event-detail-item">
                    <Calendar className="event-detail-icon" />
                    {formatDate(event.date)}
                  </div>
                  
                  <div className="event-detail-item">
                    <Clock className="event-detail-icon" />
                    {event.time}
                  </div>
                  
                  <div className="event-detail-item">
                    <MapPin className="event-detail-icon" />
                    {event.location}
                  </div>
                  
                  <div className="event-detail-item">
                    <Users className="event-detail-icon" />
                    {event.attendees}/{event.maxAttendees} participantes
                  </div>
                </div>

                <div className="event-actions">
                  <button 
                    className="event-btn event-btn-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRegister(event.id);
                    }}
                  >
                    Inscrever-se
                  </button>
                  <button 
                    className="event-btn event-btn-secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("View details clicked", event.id);
                    }}
                  >
                    <ExternalLink className="event-btn-icon" />
                    Detalhes
                  </button>
                </div>
                
                {/* Progress bar for attendees */}
                <div className="event-progress-wrapper">
                  <div className="event-progress-bar">
                    <div 
                      className="event-progress-fill" 
                      style={{ 
                        width: `${(event.attendees / event.maxAttendees) * 100}%` 
                      }}
                    ></div>
                  </div>
                  <p className="event-progress-text">
                    {Math.round((event.attendees / event.maxAttendees) * 100)}% das vagas preenchidas
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="events-cta-wrapper">
          <div className="events-cta">
            <h3 className="events-cta-title">
              Organize seu Próprio Evento!
            </h3>
            <p className="events-cta-description">
              Tem uma ideia para um workshop, mutirão ou ação comunitária? 
              Ajudamos você a organizar e divulgar seu evento relacionado à acessibilidade.
            </p>
            <div className="events-cta-buttons">
              <button 
                className="events-cta-btn"
                onClick={() => console.log("Propose event clicked")}
              >
                Propor Evento
              </button>
              <button 
                className="events-cta-btn"
                onClick={() => console.log("Event guide clicked")}
              >
                Guia do Organizador
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}