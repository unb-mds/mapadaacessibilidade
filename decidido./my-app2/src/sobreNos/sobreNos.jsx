import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useRef } from 'react';
import './sobreNos.css';
import { FaWheelchair, FaCompass, FaBullseye, FaLightbulb, FaCogs, FaUniversity, FaBookOpen, FaCode, FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const AboutPage = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && !mapRef.current._leaflet_id) {
      const map = L.map(mapRef.current).setView([-23.5505, -46.6333], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Adicionando alguns marcadores de exemplo
      L.marker([-23.5505, -46.6333]).addTo(map)
        .bindPopup('Local acessível exemplo')
        .openPopup();
    }
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: "Lucas Moleste",
      role: "Backend & Integração de Mapas",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      description: "Responsável pela arquitetura do backend e integração com APIs de mapas."
    },
    {
      id: 2,
      name: "Ana Silva",
      role: "Frontend & UI/UX",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      description: "Desenvolveu a interface do usuário e garantiu a melhor experiência de navegação."
    },
    {
      id: 3,
      name: "Carlos Mendes",
      role: "Banco de Dados",
      img: "https://randomuser.me/api/portraits/men/75.jpg",
      description: "Projetou e implementou a estrutura do banco de dados para armazenar informações de acessibilidade."
    },
    {
      id: 4,
      name: "Mariana Costa",
      role: "Testes & Qualidade",
      img: "https://randomuser.me/api/portraits/women/68.jpg",
      description: "Garantiu a qualidade do software através de testes rigorosos e feedback contínuo."
    },
    {
      id: 5,
      name: "Gentlemenos de Pedo",
      role: "Acessibilidade",
      img: "https://randomuser.me/api/portraits/men/90.jpg",
      description: "Especialista em garantir que a plataforma atenda a todos os padrões de acessibilidade."
    },
    {
      id: 6,
      name: "Sério Valor",
      role: "Documentação",
      img: "https://randomuser.me/api/portraits/women/33.jpg",
      description: "Responsável pela documentação técnica e guias de utilização da plataforma."
    },
    {
      id: 7,
      name: "Pedro Alves",
      role: "Comunidade",
      img: "https://randomuser.me/api/portraits/men/22.jpg",
      description: "Coordena a interação com a comunidade e coleta feedback para melhorias."
    }
  ];

  return (
    <div className="font-sans bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaWheelchair className="text-blue-600 text-2xl" />
            <div>
              <h1 className="text-xl font-bold text-blue-600">Mapa da Acessibilidade</h1>
              <p className="text-xs text-gray-500">Mobilidade sem Barreiras</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-blue-600 font-medium">Sobre Nós</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition">Cadastro</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition">Login</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition">Contato</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition">FAQ</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition">Eventos</a>
          </nav>
          <button className="md:hidden text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-16 fade-in">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Sobre o Projeto</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-blue-50 p-6 rounded-lg shadow-md hover-scale">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <FaCompass className="text-blue-600 text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-600">Mapeamento com Acessibilidade para Atividade Comunitária</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  É uma plataforma colaborativa criada para apoiar atividades comunitárias com foco em acessibilidade. 
                  Permitimos que qualquer pessoa cadastre e encontre locais acessíveis para pessoas com deficiência 
                  ou mobilidade reduzida — como centros culturais, feiras e praças.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <img src="https://images.unsplash.com/photo-1544396821-4dd40b938ad3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                   alt="Pessoas utilizando mapa de acessibilidade" 
                   className="w-full h-auto rounded-lg shadow-md hover-scale" />
            </div>
          </div>
        </section>

        {/* Objectives Section */}
        <section className="mb-16 fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Objective 1 */}
            <div className="bg-green-50 p-6 rounded-lg shadow-md hover-scale">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <FaBullseye className="text-green-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-green-600">Objetivo</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Facilitar o dia a dia de quem precisa de informações sobre acessibilidade e incentivar a participação comunitária.
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Construir um mapa interativo de locais acessíveis</li>
                <li>Permitir colaboração com informações, comentários e avaliações</li>
                <li>Oferecer filtros como rampa, piso tátil e banheiro adaptado</li>
                <li>Tornar a busca por espaços acessíveis mais intuitiva</li>
              </ul>
            </div>

            {/* Motivation */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-md hover-scale">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaLightbulb className="text-blue-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-blue-600">Motivação</h3>
              </div>
              <p className="text-gray-700">
                A falta de informação sobre acessibilidade em espaços públicos é um desafio real. Muitas pessoas só 
                descobrem a inacessibilidade quando já estão no local. Queremos mudar isso!
              </p>
            </div>

            {/* Features */}
            <div className="bg-purple-50 p-6 rounded-lg shadow-md hover-scale">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <FaCogs className="text-purple-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-purple-600">Funcionalidades</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <span className="w-5 h-5 bg-blue-500 rounded-full mr-2"></span>
                  <span>Mapa colaborativo</span>
                </div>
                <div className="flex items-center">
                  <span className="w-5 h-5 bg-green-500 rounded-full mr-2"></span>
                  <span>Cadastro de locais</span>
                </div>
                <div className="flex items-center">
                  <span className="w-5 h-5 bg-yellow-500 rounded-full mr-2"></span>
                  <span>Filtros personalizados</span>
                </div>
                <div className="flex items-center">
                  <span className="w-5 h-5 bg-purple-500 rounded-full mr-2"></span>
                  <span>Busca por região</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Context Section */}
        <section className="mb-16 bg-gray-100 p-8 rounded-lg shadow-md fade-in hover-scale">
          <div className="flex items-center mb-4">
            <div className="bg-gray-200 p-3 rounded-full mr-4">
              <FaUniversity className="text-gray-700 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700">Contexto</h3>
          </div>
          <p className="text-gray-700">
            Desenvolvido por estudantes universitários, em colaboração com monitores, para uso de ONGs e moradores locais. 
            O projeto nasceu como uma iniciativa acadêmica mas rapidamente se transformou em uma ferramenta comunitária 
            essencial para promover a inclusão e acessibilidade em espaços públicos.
          </p>
        </section>

        {/* Map Section */}
        <section className="mb-16 fade-in">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Mapa de Acessibilidade</h2>
          <div ref={mapRef} className="h-96 w-full rounded-lg shadow-md"></div>
        </section>

        {/* Team Section */}
        <section className="mb-16 fade-in">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Nossa Equipe</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map(member => (
              <div key={member.id} className="team-card bg-white rounded-lg shadow-md overflow-hidden relative">
                <div className="p-4">
                  <div className="flex justify-center mb-4">
                    <img src={member.img} 
                         alt={member.name} 
                         className="w-32 h-32 rounded-full object-cover border-4 border-blue-100" />
                  </div>
                  <h3 className="text-xl font-bold text-center text-blue-600">{member.name}</h3>
                  <p className="text-gray-500 text-center mb-2">{member.role}</p>
                  <div className="flex justify-center space-x-4">
                    <a href="#" aria-label="GitHub" className="text-gray-700 hover:text-blue-600">
                      <FaGithub />
                    </a>
                    <a href="#" aria-label="LinkedIn" className="text-gray-700 hover:text-blue-600">
                      <FaLinkedin />
                    </a>
                  </div>
                </div>
                <div className="team-overlay absolute inset-0 flex items-center justify-center p-6 text-white">
                  <p className="text-center">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Documentation Section */}
        <section className="fade-in">
          <div className="bg-blue-50 rounded-lg p-8 text-center hover-scale">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <FaBookOpen className="text-blue-600 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-blue-600 mb-4">Documentação Técnica</h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Explore nossa arquitetura, APIs e guias de contribuição para entender como a plataforma funciona 
                e como você pode contribuir para o projeto.
              </p>
              <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition flex items-center">
                <FaCode className="mr-2" /> Acessar Documentação Técnica
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">Mapa da Acessibilidade | Mobilidade sem Barreiras © 2025</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition" aria-label="GitHub">
                <FaGithub className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition" aria-label="Facebook">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition" aria-label="Instagram">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition" aria-label="Twitter">
                <FaTwitter className="text-xl" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
