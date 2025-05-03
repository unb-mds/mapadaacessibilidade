import { useState, useEffect } from 'react';
import './App.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function App() {
    const [filters, setFilters] = useState({
        rampas: true,
        banheiros: true,
        pisos: true,
        eventos: true,
        distancia: 5,
        avaliacao: 'all'
    });

    useEffect(() => {
        // Inicializa o mapa Leaflet
        const map = L.map('map').setView([-23.5505, -46.6333], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Adiciona marcadores de exemplo
        const locations = [
            { coords: [-23.5505, -46.6333], title: "Shopping Center", type: "rampa" },
            { coords: [-23.5515, -46.6343], title: "Parque Municipal", type: "banheiro" }
        ];

        locations.forEach(loc => {
            L.marker(loc.coords)
                .addTo(map)
                .bindPopup(`<b>${loc.title}</b><br>Tipo: ${loc.type}`);
        });

        return () => {
            map.remove();
        };
    }, []);

    return (
        <div className="app">
            {/* Navbar */}
            <header className="navbar">
                <div className="logo">
                    <h1>Mapa da Acessibilidade</h1>
                    <p>Mobilidade sem Barreiras</p>
                </div>
                <nav className="nav-links">
                    <a href="#"><span className="icon">📄</span> Sobre</a>
                    <a href="#"><span className="icon">📝</span> Cadastro</a>
                    <a href="#"><span className="icon">🔑</span> Login</a>
                    <a href="#"><span className="icon">✉️</span> Contato</a>
                    <a href="#"><span className="icon">📅</span> Eventos</a>
                </nav>
                <button className="mobile-menu">☰</button>
            </header>

            {/* Conteúdo Principal */}
            <main className="main-content">
                {/* Filtros */}
                <aside className="filters">
                    <h2>Filtrar Locais</h2>
                    <div className="filter-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={filters.rampas}
                                onChange={() => setFilters({...filters, rampas: !filters.rampas})}
                            />
                            <span className="icon">♿</span> Rampas
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={filters.banheiros}
                                onChange={() => setFilters({...filters, banheiros: !filters.banheiros})}
                            />
                            <span className="icon">🚽</span> Banheiros Adaptados
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={filters.pisos}
                                onChange={() => setFilters({...filters, pisos: !filters.pisos})}
                            />
                            <span className="icon">👣</span> Pisos Táteis
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={filters.eventos}
                                onChange={() => setFilters({...filters, eventos: !filters.eventos})}
                            />
                            <span className="icon">🎪</span> Eventos Acessíveis
                        </label>
                    </div>

                    <div className="filter-section">
                        <h3>Distância</h3>
                        <div className="distance-slider">
                            <span>1 km</span>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={filters.distancia}
                                onChange={(e) => setFilters({...filters, distancia: e.target.value})}
                            />
                            <span>10 km</span>
                        </div>
                    </div>

                    <div className="filter-section">
                        <h3>Avaliação</h3>
                        <div className="rating-options">
                            <label>
                                <input
                                    type="radio"
                                    name="avaliacao"
                                    value="all"
                                    checked={filters.avaliacao === 'all'}
                                    onChange={() => setFilters({...filters, avaliacao: 'all'})}
                                />
                                Todas avaliações
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="avaliacao"
                                    value="4"
                                    checked={filters.avaliacao === '4'}
                                    onChange={() => setFilters({...filters, avaliacao: '4'})}
                                />
                                Acima de 4
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="avaliacao"
                                    value="3"
                                    checked={filters.avaliacao === '3'}
                                    onChange={() => setFilters({...filters, avaliacao: '3'})}
                                />
                                Acima de 3
                            </label>
                        </div>
                    </div>

                    <button className="apply-filters">
                        Aplicar Filtros
                    </button>
                </aside>

                {/* Mapa */}
                <div className="map-container">
                    <div id="map"></div>
                </div>
            </main>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Mapa da Acessibilidade</h3>
                        <p>
                            Nosso objetivo é mapear e compartilhar informações sobre locais acessíveis para pessoas com mobilidade reduzida.
                        </p>
                    </div>

                    <div className="footer-section">
                        <h3>Links Úteis</h3>
                        <ul>
                            <li><a href="#">Sobre o projeto</a></li>
                            <li><a href="#">Como contribuir</a></li>
                            <li><a href="#">Termos de uso</a></li>
                            <li><a href="#">Política de privacidade</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3>Contato</h3>
                        <p><span className="icon">✉️</span> contato@acessibilidade.com</p>
                        <p><span className="icon">📞</span> (11) 1234-5678</p>
                    </div>

                    <div className="footer-section">
                        <h3>Redes Sociais</h3>
                        <div className="social-icons">
                            <a href="#"><span className="icon">📘</span></a>
                            <a href="#"><span className="icon">🐦</span></a>
                            <a href="#"><span className="icon">📷</span></a>
                        </div>
                        <button className="download-app">
                            <span className="icon">⬇️</span> Baixar App
                        </button>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>Mapa da Acessibilidade © 2025. Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    );
}

export default App;