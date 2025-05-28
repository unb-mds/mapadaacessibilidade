import { MapContainer, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import './App.css'
import { Marker } from 'react-leaflet'   
import { Icon } from 'leaflet'
import icone from './img/pin.png' 
import { useState, useEffect } from 'react';
import { 
  TbX,
  TbStarFilled,
  TbClock,
  TbPhone,
  TbArrowRight,
  TbEdit,
  TbWheelchair,
  TbToiletPaper,
  TbBraille,
  TbElevator,
  TbInfoCircle,
  TbUserPlus,
  TbLogin,
  TbMail,
  TbHelpCircle,
  TbCalendarEvent,
  TbMapPin,
  TbMenu2
} from 'react-icons/tb'

// Configurações dos marcadores
const markers = [
  {
    id: 1,
    geocode: [-15.7942, -47.8822],
    name: 'Shopping Brasília',
    description: 'Shopping Center',
    popUp: 'Shopping com excelente acessibilidade, contando com rampas em todas as entradas, banheiros adaptados em todos os pisos, piso tátil em áreas comuns e elevadores com sinalização em braile.',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    rating: 4.5,
    reviews: 23,
    accessibility: 9,
    address: 'SHTN Trecho 1, Conjunto 1B - Asa Norte',
    city: 'Brasília - DF',
    hours: {
      weekdays: '10h às 22h',
      weekend: '11h às 21h'
    },
    contact: {
      phone: '(61) 1234-5678',
      email: 'contato@shoppingbrasilia.com.br'
    },
    features: ['ramp', 'bathroom', 'tactile', 'elevator'],
    photos: [
      'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1581092921461-39b2f2a85979?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1559839732-f8a0a1d2d8b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    ]
  },
  // ... outros marcadores
]

// Ícone customizado
const iconeCustom = new Icon({
  iconUrl: icone,
  iconSize: [48, 48], // Aumentado para melhor visualização
});

function App() {
  const [open, setOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setDrawerOpen(true);
    if (isMobile) {
      setOpen(false);
    }
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const toggleMenu = () => {
    setOpen(!open);
  };

  const getFeatureIcon = (feature) => {
    switch(feature) {
      case 'ramp': return <TbWheelchair className="mr-1 text-lg" />;
      case 'bathroom': return <TbToiletPaper className="mr-1 text-lg" />;
      case 'tactile': return <TbBraille className="mr-1 text-lg" />;
      case 'elevator': return <TbElevator className="mr-1 text-lg" />;
      default: return null;
    }
  };

  const getFeatureClass = (feature) => {
    switch(feature) {
      case 'ramp': return 'bg-blue-100 text-blue-800';
      case 'bathroom': return 'bg-green-100 text-green-800';
      case 'tactile': return 'bg-yellow-100 text-yellow-800';
      case 'elevator': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFeatureLabel = (feature) => {
    switch(feature) {
      case 'ramp': return 'Rampas';
      case 'bathroom': return 'Banheiros';
      case 'tactile': return 'Pisos táteis';
      case 'elevator': return 'Elevadores';
      default: return feature;
    }
  };

  function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const navLinks = [
      { href: "sobrenos.html", icon: <TbInfoCircle size={20} />, label: "Sobre Nós" },
      { href: "cadastro.html", icon: <TbUserPlus size={20} />, label: "Cadastro" },
      { href: "login.html", icon: <TbLogin size={20} />, label: "Login" },
      { href: "contato.html", icon: <TbMail size={20} />, label: "Contato" },
      { href: "faq.html", icon: <TbHelpCircle size={20} />, label: "FAQ" },
      { href: "eventos.html", icon: <TbCalendarEvent size={20} />, label: "Eventos" },
      { href: "adicionarlocal.html", icon: <TbMapPin size={20} />, label: "Adicionar Local" },
    ];
  
    return (
      <header className="sticky top-0 z-[1000] bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <TbWheelchair className="text-blue-600 text-3xl" />
            <div>
              <a href="index.html">
                <h1 className="text-2xl font-bold text-blue-600">Mapa da Acessibilidade</h1>
                <p className="text-sm text-gray-500">Mobilidade sem Barreiras</p>
              </a>
            </div>
          </div>
  
          <nav className="hidden md:flex space-x-8">
            {navLinks.map(({ href, icon, label }) => (
              <a
                key={href}
                href={href}
                className="text-gray-700 hover:text-blue-600 transition-colors flex items-center text-lg"
              >
                <span className="mr-2">{icon}</span>
                {label}
              </a>
            ))}
          </nav>
  
          <button
            className="md:hidden text-gray-700 hover:text-blue-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menu"
          >
            <TbMenu2 size={28} />
          </button>
        </div>
  
        {mobileMenuOpen && (
          <div className="md:hidden bg-white py-3 px-4 shadow-lg border-t border-gray-100">
            {navLinks.map(({ href, icon, label }) => (
              <a
                key={href}
                href={href}
                className="block py-3 text-gray-700 hover:text-blue-600 flex items-center text-lg"
              >
                <span className="mr-4">{icon}</span>
                {label}
              </a>
            ))}
          </div>
        )}
      </header>
    );
  }

  function FiltersSidebar({ isMobile, open, toggleFilters }) {
    return (
      <aside className={`${open ? "block" : "hidden"} w-full md:w-72 bg-white shadow-md p-5 md:h-screen md:sticky md:top-16`}>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-blue-600">Filtrar Locais</h2>
          <button 
            onClick={toggleFilters}
            className="md:hidden text-gray-500 hover:text-blue-600"
          >
            <TbMenu2 size={24} />
          </button>
        </div>
        
        <div id="filters-content">
          <div className="space-y-4">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="filter-ramp" 
                className="mr-3 h-6 w-6 text-blue-600 rounded" 
                defaultChecked
              />
              <label htmlFor="filter-ramp" className="flex items-center">
                <span className="w-5 h-5 rounded-full bg-blue-500 mr-3"></span>
                Rampas
              </label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="filter-bathroom" 
                className="mr-3 h-6 w-6 text-green-500 rounded" 
                defaultChecked
              />
              <label htmlFor="filter-bathroom" className="flex items-center">
                <span className="w-5 h-5 rounded-full bg-green-500 mr-3"></span>
                Banheiros Adaptados
              </label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="filter-tactile" 
                className="mr-3 h-6 w-6 text-yellow-500 rounded" 
                defaultChecked
              />
              <label htmlFor="filter-tactile" className="flex items-center">
                <span className="w-5 h-5 rounded-full bg-yellow-500 mr-3"></span>
                Pisos Táteis
              </label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="filter-events" 
                className="mr-3 h-6 w-6 text-purple-500 rounded" 
                defaultChecked
              />
              <label htmlFor="filter-events" className="flex items-center">
                <span className="w-5 h-5 rounded-full bg-purple-500 mr-3"></span>
                Eventos Acessíveis
              </label>
            </div>
          </div>
  
          <div className="mt-8">
            <div className="relative border border-gray-300 rounded p-4">
              <span className="absolute -top-3 left-4 bg-white px-2 text-gray-600 text-sm">Distância</span>
              <div className="mt-4">
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  defaultValue="5" 
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>1 km</span>
                <span>5 km</span>
                <span>10 km</span>
              </div>
            </div>
          </div>
  
          <div className="mt-8">
            <div className="relative border border-gray-300 rounded p-4">
              <span className="absolute -top-3 left-4 bg-white px-2 text-gray-600 text-sm">Avaliação</span>
              <div className="mt-4">
                <div className="flex items-center mb-3">
                  <input 
                    type="radio" 
                    id="rating-all" 
                    name="rating" 
                    value="all" 
                    className="mr-3 h-5 w-5" 
                    defaultChecked
                  />
                  <label htmlFor="rating-all" className="text-lg">Todas avaliações</label>
                </div>
                <div className="flex items-center mb-3">
                  <input 
                    type="radio" 
                    id="rating-4" 
                    name="rating" 
                    value="4" 
                    className="mr-3 h-5 w-5" 
                  />
                  <label htmlFor="rating-4" className="flex items-center">
                    <div className="flex text-yellow-400 mr-3">
                      <TbStarFilled size={20} />
                      <TbStarFilled size={20} />
                      <TbStarFilled size={20} />
                      <TbStarFilled size={20} />
                      <TbStarFilled size={20} className="text-gray-300" />
                    </div>
                    <span className="text-lg">Acima de 4</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="rating-3" 
                    name="rating" 
                    value="3" 
                    className="mr-3 h-5 w-5" 
                  />
                  <label htmlFor="rating-3" className="flex items-center">
                    <div className="flex text-yellow-400 mr-3">
                      <TbStarFilled size={20} />
                      <TbStarFilled size={20} />
                      <TbStarFilled size={20} />
                      <TbStarFilled size={20} className="text-gray-300" />
                      <TbStarFilled size={20} className="text-gray-300" />
                    </div>
                    <span className="text-lg">Acima de 3</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
  
          <div className="mt-8">
            <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition flex items-center justify-center text-lg">
              <TbArrowRight className="mr-2" /> Aplicar Filtros
            </button>
          </div>
        </div>
      </aside>
    );
  }

  const [filtersOpen, setFiltersOpen] = useState(true);
  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <h3 className="text-xl font-semibold mb-5">Mapa da Acessibilidade</h3>
              <p className="text-gray-300 text-lg">
                Nosso objetivo é mapear e compartilhar informações sobre locais acessíveis para pessoas com mobilidade reduzida.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-5">Links Úteis</h3>
              <ul className="space-y-3">
                <li><a href="sobrenos.html" className="text-gray-300 hover:text-white text-lg">Sobre o projeto</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-lg">Como contribuir</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-lg">Termos de uso</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-lg">Política de privacidade</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-5">Contato</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300 text-lg">
                  <TbMail className="mr-2" /> contato@acessibilidade.com
                </li>
                <li className="flex items-center text-gray-300 text-lg">
                  <TbPhone className="mr-2" /> (11) 1234-5678
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-5">Redes Sociais</h3>
              <div className="flex space-x-5">
                <a href="#" className="text-gray-300 hover:text-white text-2xl">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-gray-300 hover:text-white text-2xl">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-300 hover:text-white text-2xl">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-300 hover:text-white text-2xl">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
              <div className="mt-6">
                <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition text-lg">
                  <TbArrowRight className="mr-2" /> Baixar App
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-10 pt-8 text-center text-gray-400 text-lg">
            <p>Mapa da Acessibilidade © 2025. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <div className="flex flex-col min-h-screen text-lg">
      <Header />
      
      <div className="flex flex-1 overflow-hidden relative">
        <FiltersSidebar 
          isMobile={isMobile} 
          open={filtersOpen} 
          toggleFilters={toggleFilters} 
        />

        {/* Mapa Principal */}
        <div className={`z-1 flex-1 relative transition-all duration-300 ${filtersOpen && !isMobile ? 'md:ml-72' : ''}`}>
          <MapContainer 
            center={[-15.7942, -47.8822]} 
            zoom={13} 
            className="h-full w-full"
          >
            <TileLayer
              attribution='Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
              url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}' 
            />
            
            {markers.map((marker) => (
              <Marker 
                key={marker.id}
                position={marker.geocode} 
                icon={iconeCustom}
                eventHandlers={{
                  click: () => handleMarkerClick(marker),
                }}
              />
            ))}
          </MapContainer>
        </div>

        {/* Novo Drawer de Informações */}
        {selectedMarker && (
          <div className={`fixed top-0 right-0 bottom-0 w-full max-w-lg bg-white shadow-xl z-[1001] overflow-y-auto transition-transform duration-300 ease-in-out
            ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-5">
                <h3 className="text-2xl font-bold text-blue-600">{selectedMarker.name}</h3>
                <button onClick={closeDrawer} className="text-gray-500 hover:text-gray-700">
                  <TbX size={28} />
                </button>
              </div>

              <div className="flex items-center mb-5">
                <div className="relative inline-block">
                  <div className="flex text-gray-300">
                    <TbStarFilled size={24} />
                    <TbStarFilled size={24} />
                    <TbStarFilled size={24} />
                    <TbStarFilled size={24} />
                    <TbStarFilled size={24} />
                  </div>
                  <div className="absolute top-0 left-0 whitespace-nowrap overflow-hidden" style={{ width: `${(selectedMarker.rating / 5) * 100}%` }}>
                    <div className="flex text-yellow-400">
                      <TbStarFilled size={24} />
                      <TbStarFilled size={24} />
                      <TbStarFilled size={24} />
                      <TbStarFilled size={24} />
                      <TbStarFilled size={24} />
                    </div>
                  </div>
                </div>
                <span className="ml-3 text-gray-600 text-lg">{selectedMarker.rating} ({selectedMarker.reviews} avaliações)</span>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg text-gray-600">Acessibilidade</span>
                  <span className="text-lg font-medium">{selectedMarker.accessibility}/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-green-500 h-3 rounded-full" 
                    style={{ width: `${selectedMarker.accessibility * 10}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                {selectedMarker.features.map((feature, index) => (
                  <span 
                    key={index}
                    className={`${getFeatureClass(feature)} px-4 py-2 rounded-full text-lg flex items-center`}
                  >
                    {getFeatureIcon(feature)}
                    {getFeatureLabel(feature)}
                  </span>
                ))}
              </div>

              <div className="space-y-5 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <TbMapPin size={24} />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-lg">{selectedMarker.address}</p>
                    <p className="text-gray-500">{selectedMarker.city}</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <TbClock size={24} />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-lg">Horário de Funcionamento</p>
                    <p className="text-gray-500">Segunda a Sábado: {selectedMarker.hours.weekdays}</p>
                    <p className="text-gray-500">Domingo: {selectedMarker.hours.weekend}</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      <TbPhone size={24} />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-lg">Contato</p>
                    <p className="text-gray-500">{selectedMarker.contact.phone}</p>
                    <p className="text-gray-500">{selectedMarker.contact.email}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-lg mb-3">Descrição</h4>
                <p className="text-gray-600">
                  {selectedMarker.popUp}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-lg mb-3">Fotos</h4>
                <div className="grid grid-cols-3 gap-3">
                  {selectedMarker.photos.map((photo, index) => (
                    <div key={index} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                      <img src={photo} alt={`Foto ${index + 1} do ${selectedMarker.name}`} className="object-cover w-full h-full" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition flex items-center justify-center text-lg">
                  <TbArrowRight className="mr-2" /> Rotas
                </button>
                <button className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition flex items-center justify-center text-lg">
                  <TbEdit className="mr-2" /> Avaliar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;