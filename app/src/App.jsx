import { MapContainer, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import './App.css'
import { Marker } from 'react-leaflet'   
import { Icon } from 'leaflet'
import icone from './img/pin.png' 
import { useState, useEffect } from 'react';
import { 
  TbLayoutSidebarLeftExpand, 
  TbLayoutSidebarLeftCollapse, 
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

  return (
    <div className="flex flex-col h-screen">
      <Header isMobile={isMobile} open={open} toggleMenu={toggleMenu} />

      
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar Menu */}
        <div className={`${open ? "w-64" : "w-0"} z-[998] bg-white h-full shadow-md transition-all duration-300 ease-in-out flex flex-col 
          ${isMobile ? 'fixed inset-y-0 z-[1002]' : 'relative'}`}>
          <div className="p-4 flex items-center justify-between">
            {open && <h2 className="text-xl font-bold">Menu</h2>}
            <button 
              onClick={() => setOpen(!open)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              {open ? <TbLayoutSidebarLeftCollapse size={24} /> : <TbLayoutSidebarLeftExpand size={24} />}
            </button>
          </div>
        </div>

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
    </div>
  );
}

export default App;