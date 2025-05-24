import { MapContainer, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import './App.css'
import { Marker } from 'react-leaflet'   
import { Icon } from 'leaflet'
import icone from './img/pin.png' 
import { useState } from 'react';
import { TbLayoutSidebarLeftExpand, TbLayoutSidebarLeftCollapse, TbChevronLeft, TbChevronRight } from 'react-icons/tb'

// Configurações dos marcadores
const markers = [
  {
    id: 1,
    geocode: [-15.7942, -47.8822],
    name: 'Brasília',
    description: 'Capital do Brasil',
    popUp: 'Brasília é a capital do Brasil e foi inaugurada em 1960. É conhecida por sua arquitetura moderna e planejamento urbano.',
    image: 'https://example.com/brasilia.jpg'
  },
  {
    id: 2,
    geocode: [-22.9068, -43.1729],
    name: 'Rio de Janeiro',
    description: 'Cidade maravilhosa',
    popUp: 'O Rio de Janeiro é famoso por suas praias, como Copacabana e Ipanema, e pelo Cristo Redentor, uma das sete maravilhas do mundo moderno.',
    image: 'https://example.com/rio.jpg'
  },
  {
    id: 3,
    geocode: [-23.5505, -46.6333],
    name: 'São Paulo',
    description: 'Maior cidade do Brasil',
    popUp: 'São Paulo é a maior cidade do Brasil e um importante centro financeiro e cultural da América Latina.',
    image: 'https://example.com/saopaulo.jpg'
  }
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
  const [subMenus, setSubMenus] = useState({
    filtros: false,
    distancia: false,
    avaliação: false,
    post: false,
  });

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const Header = () => {
    return (
      <header className='sticky top-0 z-[1000] bg-white shadow-md mx-auto flex w-full justify-between'>
        <Logo />
        <h1 className='text-xl font-bold p-4'>Mapa Interativo</h1>
      </header>
    );
  };

  const Logo = () => {
    return (
      <div className="logo h-16 w-16 p-2">
        <img src={icone} alt="logo" className="h-full w-full object-contain"/>
      </div>
    );
  };

  const toggleSubMenu = (menu) => {
    setSubMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const Menus = [
    { title: 'Filtros', icon: icone },
    { title: 'Distância', icon: icone },
    { title: 'Avaliação', icon: icone },
    { title: 'Post', icon: icone },
  ];

  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Menu */}
        <div className={`${open ? "w-64" : "w-20"} bg-white h-full shadow-md transition-all duration-300 ease-in-out flex flex-col`}>
          <div className="p-4 flex items-center justify-between">
            {open && <h2 className="text-xl font-bold">Menu</h2>}
            <button 
              onClick={() => setOpen(!open)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              {open ? <TbLayoutSidebarLeftCollapse size={24} /> : <TbLayoutSidebarLeftExpand size={24} />}
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {Menus.map((menu, index) => (
              <div 
                key={index} 
                className="flex items-center p-3 mx-2 my-1 rounded-lg hover:bg-gray-100 cursor-pointer"
                onClick={() => toggleSubMenu(menu.title.toLowerCase())}
              >
                <img src={menu.icon} alt={menu.title} className="w-6 h-6" />
                {open && <span className="ml-3">{menu.title}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Mapa Principal */}
        <div className="flex-1 relative">
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

        {/* Drawer de Informações */}
        <div className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-[1001]
          ${drawerOpen ? 'translate-x-0' : 'translate-x-full'} w-96`}>
          
          <div className="p-4 h-full flex flex-col">
            <button 
              onClick={closeDrawer}
              className="self-start p-2 rounded-full hover:bg-gray-100 mb-4"
            >
              <TbChevronRight size={24} />
            </button>
            
            {selectedMarker && (
              <div className="flex-1 overflow-y-auto">
                <h2 className="text-2xl font-bold mb-2">{selectedMarker.name}</h2>
                <p className="text-gray-600 italic mb-4">{selectedMarker.description}</p>
                
                {selectedMarker.image && (
                  <img 
                    src={selectedMarker.image} 
                    alt={selectedMarker.name} 
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                
                <div className="prose">
                  <p>{selectedMarker.popUp}</p>
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <h3 className="font-semibold mb-2">Informações adicionais</h3>
                  <ul className="space-y-2">
                    <li>📍 Localização: {selectedMarker.geocode.join(', ')}</li>
                    <li>⭐ Avaliação: 4.8/5</li>
                    <li>🕒 Horário: 08:00 - 18:00</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;