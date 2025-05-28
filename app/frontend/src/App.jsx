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
  iconSize: [38, 38],
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
      case 'ramp': return <TbWheelchair className="mr-1" />;
      case 'bathroom': return <TbToiletPaper className="mr-1" />;
      case 'tactile': return <TbBraille className="mr-1" />;
      case 'elevator': return <TbElevator className="mr-1" />;
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

  function Header({ isMobile, open, toggleMenu }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const navLinks = [
    { href: "sobrenos.html", icon: <TbInfoCircle />, label: "Sobre Nós" },
    { href: "cadastro.html", icon: <TbUserPlus />, label: "Cadastro" },
    { href: "login.html", icon: <TbLogin />, label: "Login" },
    { href: "contato.html", icon: <TbMail />, label: "Contato" },
    { href: "faq.html", icon: <TbHelpCircle />, label: "FAQ" },
    { href: "eventos.html", icon: <TbCalendarEvent />, label: "Eventos" },
    { href: "adicionarlocal.html", icon: <TbMapPin />, label: "Adicionar Local" },
  ];
  return (
    <header className="sticky top-0 z-[1000] bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <i className="fas fa-wheelchair text-blue-600 text-3xl mt-1"></i>
          <div className="leading-tight">
            <a href="index.html">
              <h1 className="text-xl font-bold text-blue-600 leading-tight">Mapa da Acessibilidade</h1>
              <p className="text-xs text-gray-500 mt-0.5">Mobilidade sem Barreiras</p>
            </a>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map(({ href, icon, label }) => (
            <a
              key={href}
              href={href}
              className="text-gray-700 hover:text-blue-600 transition flex items-center"
            >
              <span className="flex items-center gap-2">{icon} {label}</span>
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={toggleMobileMenu}
          aria-label="Abrir menu"
        >
          <TbMenu2 className="text-xl" />
        </button>
      </div>

      {/* Mobile nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-2 px-4 shadow-lg">
          {navLinks.map(({ href, icon, label }) => (
            <a
              key={href}
              href={href}
              className="block py-2 text-gray-700 hover:text-blue-600 flex items-center"
            >
              <span className="mr-3 w-5 text-center">{icon}</span> {label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

  const Logo = () => {
    return (
      <div className="logo h-16 w-16 p-2">
        <img src={icone} alt="logo" className="h-full w-full object-contain"/>
      </div>
    );
  };

  function FiltersSidebar({ isMobile, open, toggleFilters }) {
  return (
    <aside className={`${open ? "block" : "hidden"} w-full md:w-64 bg-white shadow-md p-4 md:h-screen md:sticky md:top-16`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-blue-600">Filtrar Locais</h2>
        <button 
          onClick={toggleFilters}
          className="md:hidden text-gray-500 hover:text-blue-600"
        >
          <i className="fas fa-sliders-h"></i>
        </button>
      </div>
      
      <div id="filters-content">
        <div className="space-y-3">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="filter-ramp" 
              className="mr-2 h-5 w-5 text-blue-600 rounded" 
              defaultChecked
            />
            <label htmlFor="filter-ramp" className="flex items-center">
              <span className="w-4 h-4 rounded-full bg-blue-500 mr-2"></span>
              Rampas
            </label>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="filter-bathroom" 
              className="mr-2 h-5 w-5 text-green-500 rounded" 
              defaultChecked
            />
            <label htmlFor="filter-bathroom" className="flex items-center">
              <span className="w-4 h-4 rounded-full bg-green-500 mr-2"></span>
              Banheiros Adaptados
            </label>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="filter-tactile" 
              className="mr-2 h-5 w-5 text-yellow-500 rounded" 
              defaultChecked
            />
            <label htmlFor="filter-tactile" className="flex items-center">
              <span className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></span>
              Pisos Táteis
            </label>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="filter-events" 
              className="mr-2 h-5 w-5 text-purple-500 rounded" 
              defaultChecked
            />
            <label htmlFor="filter-events" className="flex items-center">
              <span className="w-4 h-4 rounded-full bg-purple-500 mr-2"></span>
              Eventos Acessíveis
            </label>
          </div>
        </div>

        <div className="mt-6">
          <div className="relative border border-gray-300 rounded p-3">
            <span className="floating-label">Distância</span>
            <div className="mt-2">
              <input 
                type="range" 
                min="1" 
                max="10" 
                defaultValue="5" 
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 km</span>
              <span>5 km</span>
              <span>10 km</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="relative border border-gray-300 rounded p-3">
            <span className="floating-label">Avaliação</span>
            <div className="mt-3">
              <div className="flex items-center mb-1">
                <input 
                  type="radio" 
                  id="rating-all" 
                  name="rating" 
                  value="all" 
                  className="mr-2" 
                  defaultChecked
                />
                <label htmlFor="rating-all">Todas avaliações</label>
              </div>
              <div className="flex items-center mb-1">
                <input 
                  type="radio" 
                  id="rating-4" 
                  name="rating" 
                  value="4" 
                  className="mr-2" 
                />
                <label htmlFor="rating-4" className="flex items-center">
                  <div className="flex text-yellow-400 mr-1">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star text-gray-300"></i>
                  </div>
                  Acima de 4
                </label>
              </div>
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="rating-3" 
                  name="rating" 
                  value="3" 
                  className="mr-2" 
                />
                <label htmlFor="rating-3" className="flex items-center">
                  <div className="flex text-yellow-400 mr-1">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star text-gray-300"></i>
                    <i className="fas fa-star text-gray-300"></i>
                  </div>
                  Acima de 3
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition flex items-center justify-center">
            <i className="fas fa-sync-alt mr-2"></i> Aplicar Filtros
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
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Mapa da Acessibilidade</h3>
            <p className="text-gray-300 text-sm">
              Nosso objetivo é mapear e compartilhar informações sobre locais acessíveis para pessoas com mobilidade reduzida.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              <li><a href="sobrenos.html" className="text-gray-300 hover:text-white text-sm">Sobre o projeto</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Como contribuir</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Termos de uso</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Política de privacidade</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300 text-sm">
                <i className="fas fa-envelope mr-2"></i> contato@acessibilidade.com
              </li>
              <li className="flex items-center text-gray-300 text-sm">
                <i className="fas fa-phone-alt mr-2"></i> (11) 1234-5678
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
            <div className="mt-4">
              <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition text-sm">
                <i className="fas fa-download mr-2"></i> Baixar App
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>Mapa da Acessibilidade © 2025. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

  return (
    <div className="flex flex-col h-screen">
      <Header isMobile={isMobile} open={open} toggleMenu={toggleMenu} />

      
      <div className="flex flex-1 overflow-hidden relative">
        <FiltersSidebar 
          isMobile={isMobile} 
          open={filtersOpen} 
          toggleFilters={toggleFilters} 
        />

        {/* Mapa Principal */}
        <div className={`flex-1 relative transition-all duration-300 ${open && !isMobile ? 'md:ml-64' : ''}`}>
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
          <div className={`fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-xl z-[1001] overflow-y-auto transition-transform duration-300 ease-in-out
            ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-blue-600">{selectedMarker.name}</h3>
                <button onClick={closeDrawer} className="text-gray-500 hover:text-gray-700">
                  <TbX size={24} />
                </button>
              </div>

              <div className="flex items-center mb-4">
                <div className="relative inline-block">
                  <div className="flex text-gray-300">
                    <TbStarFilled size={20} />
                    <TbStarFilled size={20} />
                    <TbStarFilled size={20} />
                    <TbStarFilled size={20} />
                    <TbStarFilled size={20} />
                  </div>
                  <div className="absolute top-0 left-0 whitespace-nowrap overflow-hidden" style={{ width: `${(selectedMarker.rating / 5) * 100}%` }}>
                    <div className="flex text-yellow-400">
                      <TbStarFilled size={20} />
                      <TbStarFilled size={20} />
                      <TbStarFilled size={20} />
                      <TbStarFilled size={20} />
                      <TbStarFilled size={20} />
                    </div>
                  </div>
                </div>
                <span className="ml-2 text-gray-600">{selectedMarker.rating} ({selectedMarker.reviews} avaliações)</span>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Acessibilidade</span>
                  <span className="text-sm font-medium">{selectedMarker.accessibility}/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${selectedMarker.accessibility * 10}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedMarker.features.map((feature, index) => (
                  <span 
                    key={index}
                    className={`${getFeatureClass(feature)} px-3 py-1 rounded-full text-sm flex items-center`}
                  >
                    {getFeatureIcon(feature)}
                    {getFeatureLabel(feature)}
                  </span>
                ))}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <TbMapPin size={20} />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">{selectedMarker.address}</p>
                    <p className="text-sm text-gray-500">{selectedMarker.city}</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <TbClock size={20} />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Horário de Funcionamento</p>
                    <p className="text-sm text-gray-500">Segunda a Sábado: {selectedMarker.hours.weekdays}</p>
                    <p className="text-sm text-gray-500">Domingo: {selectedMarker.hours.weekend}</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      <TbPhone size={20} />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Contato</p>
                    <p className="text-sm text-gray-500">{selectedMarker.contact.phone}</p>
                    <p className="text-sm text-gray-500">{selectedMarker.contact.email}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-2">Descrição</h4>
                <p className="text-gray-600 text-sm">
                  {selectedMarker.popUp}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-2">Fotos</h4>
                <div className="grid grid-cols-3 gap-2">
                  {selectedMarker.photos.map((photo, index) => (
                    <div key={index} className="aspect-w-1 aspect-h-1 bg-gray-200 rounded overflow-hidden">
                      <img src={photo} alt={`Foto ${index + 1} do ${selectedMarker.name}`} className="object-cover w-full h-full" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition flex items-center justify-center">
                  <TbArrowRight className="mr-2" /> Rotas
                </button>
                <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 transition flex items-center justify-center">
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