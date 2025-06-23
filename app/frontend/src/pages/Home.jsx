import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { useState, useEffect } from "react";
import {
  X,
  Star,
  Clock,
  Phone,
  ArrowRight,
  Edit,
  Accessibility,
  WashingMachine,
  Eye,
  Building,
  MapPin,
  Menu,
  Search,
  SlidersHorizontal,
  Users,
  Volume2,
} from "lucide-react";
import "./Home.css";

// Configurações dos marcadores
const markers = [
  {
    id: 1,
    geocode: [-15.7942, -47.8822],
    name: "Shopping Brasília",
    description: "Shopping Center",
    popUp:
      "Shopping com excelente acessibilidade, contando com rampas em todas as entradas, banheiros adaptados em todos os pisos, piso tátil em áreas comuns e elevadores com sinalização em braile.",
    image:
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: 4.5,
    reviews: 23,
    accessibility: 9,
    address: "SHTN Trecho 1, Conjunto 1B - Asa Norte",
    city: "Brasília - DF",
    hours: {
      weekdays: "10h às 22h",
      weekend: "11h às 21h",
    },
    contact: {
      phone: "(61) 1234-5678",
      email: "contato@shoppingbrasilia.com.br",
    },
    features: ["ramp", "bathroom", "tactile", "elevator"],
    photos: [
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1581092921461-39b2f2a85979?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1559839732-f8a0a1d2d8b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    ],
  },
  {
    id: 2,
    geocode: [-15.7801, -47.9292],
    name: "Centro Cultural Banco do Brasil",
    description: "Centro Cultural",
    popUp:
      "Centro cultural totalmente acessível com entrada principal adaptada, elevadores, banheiros especiais e programação cultural inclusiva.",
    image:
      "https://images.unsplash.com/photo-1518021833641-d8e8d8e9f6bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: 4.2,
    reviews: 18,
    accessibility: 8,
    address: "SCES Trecho 2, Lote 22",
    city: "Brasília - DF",
    hours: {
      weekdays: "9h às 21h",
      weekend: "9h às 21h",
    },
    contact: {
      phone: "(61) 3108-7600",
      email: "ccbb.brasilia@bb.com.br",
    },
    features: ["ramp", "bathroom", "elevator"],
    photos: [
      "https://images.unsplash.com/photo-1518021833641-d8e8d8e9f6bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    ],
  },
];

// Ícone customizado (usando um ícone padrão do Leaflet)
const iconeCustom = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function Home() {
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setFiltersOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setDrawerOpen(true);
    if (isMobile) {
      setFiltersOpen(false);
    }
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  const getFeatureIcon = (feature) => {
    switch (feature) {
      case "ramp":
        return <Accessibility className="feature-icon" />;
      case "bathroom":
        return <WashingMachine className="feature-icon" />;
      case "tactile":
        return <Eye className="feature-icon" />;
      case "elevator":
        return <Building className="feature-icon" />;
      case "wheelchair":
        return <Accessibility className="feature-icon" />;
      case "audio":
        return <Volume2 className="feature-icon" />;
      case "braille":
        return <Eye className="feature-icon" />;
      default:
        return null;
    }
  };

  const getFeatureClass = (feature) => {
    switch (feature) {
      case "ramp":
        return "feature-tag feature-ramp";
      case "bathroom":
        return "feature-tag feature-bathroom";
      case "tactile":
        return "feature-tag feature-tactile";
      case "elevator":
        return "feature-tag feature-elevator";
      case "wheelchair":
        return "feature-tag feature-wheelchair";
      case "audio":
        return "feature-tag feature-audio";
      case "braille":
        return "feature-tag feature-braille";
      default:
        return "feature-tag feature-default";
    }
  };

  const getFeatureLabel = (feature) => {
    switch (feature) {
      case "ramp":
        return "Rampas";
      case "bathroom":
        return "Banheiros";
      case "tactile":
        return "Pisos táteis";
      case "elevator":
        return "Elevadores";
      case "wheelchair":
        return "Acesso Cadeirante";
      case "audio":
        return "Sinalização Sonora";
      case "braille":
        return "Braile";
      default:
        return feature;
    }
  };

  function FiltersSidebar() {
    return (
      <aside className={`filters-sidebar ${filtersOpen ? 'filters-open' : 'filters-closed'}`}>
        <div className="filters-header">
          <h2 className="filters-title">Filtrar Locais</h2>
          <button
            onClick={toggleFilters}
            className="filters-toggle"
          >
            <Menu size={24} />
          </button>
        </div>

        <div className="filters-content">
          <div className="filter-section">
            <h3 className="filter-section-title">
              <Accessibility size={20} />
              Filtros de Acessibilidade
            </h3>
            
            <div className="filter-item">
              <input
                type="checkbox"
                id="filter-ramp"
                className="filter-checkbox"
                defaultChecked
              />
              <label htmlFor="filter-ramp" className="filter-label">
                <Accessibility className="filter-icon filter-icon-blue" />
                Rampa de Acesso
              </label>
            </div>

            <div className="filter-item">
              <input
                type="checkbox"
                id="filter-tactile"
                className="filter-checkbox"
                defaultChecked
              />
              <label htmlFor="filter-tactile" className="filter-label">
                <Eye className="filter-icon filter-icon-purple" />
                Piso Tátil
              </label>
            </div>

            <div className="filter-item">
              <input
                type="checkbox"
                id="filter-bathroom"
                className="filter-checkbox"
                defaultChecked
              />
              <label htmlFor="filter-bathroom" className="filter-label">
                <WashingMachine className="filter-icon filter-icon-green" />
                Banheiro Adaptado
              </label>
            </div>

            <div className="filter-item">
              <input
                type="checkbox"
                id="filter-elevator"
                className="filter-checkbox"
                defaultChecked
              />
              <label htmlFor="filter-elevator" className="filter-label">
                <Building className="filter-icon filter-icon-blue" />
                Elevador
              </label>
            </div>

            <div className="filter-item">
              <input
                type="checkbox"
                id="filter-audio"
                className="filter-checkbox"
                defaultChecked
              />
              <label htmlFor="filter-audio" className="filter-label">
                <Volume2 className="filter-icon filter-icon-yellow" />
                Sinalização Sonora
              </label>
            </div>

            <div className="filter-item">
              <input
                type="checkbox"
                id="filter-braille"
                className="filter-checkbox"
                defaultChecked
              />
              <label htmlFor="filter-braille" className="filter-label">
                <Eye className="filter-icon filter-icon-orange" />
                Braile
              </label>
            </div>

            <div className="filter-item">
              <input
                type="checkbox"
                id="filter-wheelchair"
                className="filter-checkbox"
                defaultChecked
              />
              <label htmlFor="filter-wheelchair" className="filter-label">
                <Accessibility className="filter-icon filter-icon-blue" />
                Acesso Cadeirante
              </label>
            </div>

            <div className="filter-item">
              <input
                type="checkbox"
                id="filter-parking"
                className="filter-checkbox"
                defaultChecked
              />
              <label htmlFor="filter-parking" className="filter-label">
                <MapPin className="filter-icon filter-icon-green" />
                Estacionamento Acessível
              </label>
            </div>

            <div className="filter-item">
              <input
                type="checkbox"
                id="filter-guide"
                className="filter-checkbox"
                defaultChecked
              />
              <label htmlFor="filter-guide" className="filter-label">
                <Users className="filter-icon filter-icon-purple" />
                Guia/Intérprete
              </label>
            </div>
          </div>

          <div className="distance-section">
            <div className="distance-container">
              <span className="distance-label">Distância</span>
              <div className="distance-slider-container">
                <input
                  type="range"
                  min="1"
                  max="10"
                  defaultValue="5"
                  className="distance-slider"
                />
              </div>
              <div className="distance-markers">
                <span>1 km</span>
                <span>5 km</span>
                <span>10 km</span>
              </div>
            </div>
          </div>

          <div className="rating-section">
            <div className="rating-container">
              <span className="rating-label">Avaliação</span>
              <div className="rating-options">
                <div className="rating-item">
                  <input
                    type="radio"
                    id="rating-all"
                    name="rating"
                    value="all"
                    className="rating-radio"
                    defaultChecked
                  />
                  <label htmlFor="rating-all" className="rating-option-label">
                    Todas avaliações
                  </label>
                </div>
                <div className="rating-item">
                  <input
                    type="radio"
                    id="rating-4"
                    name="rating"
                    value="4"
                    className="rating-radio"
                  />
                  <label htmlFor="rating-4" className="rating-option-label">
                    <div className="stars-container">
                      <Star className="star star-filled" />
                      <Star className="star star-filled" />
                      <Star className="star star-filled" />
                      <Star className="star star-filled" />
                      <Star className="star star-empty" />
                    </div>
                    <span>Acima de 4</span>
                  </label>
                </div>
                <div className="rating-item">
                  <input
                    type="radio"
                    id="rating-3"
                    name="rating"
                    value="3"
                    className="rating-radio"
                  />
                  <label htmlFor="rating-3" className="rating-option-label">
                    <div className="stars-container">
                      <Star className="star star-filled" />
                      <Star className="star star-filled" />
                      <Star className="star star-filled" />
                      <Star className="star star-empty" />
                      <Star className="star star-empty" />
                    </div>
                    <span>Acima de 3</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="apply-filters-section">
            <button className="apply-filters-btn">
              <ArrowRight className="btn-icon" /> Aplicar Filtros
            </button>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <div className="home-container">
      <div className="main-content">
        <FiltersSidebar />

        <div className={`map-container ${filtersOpen && !isMobile ? 'map-with-sidebar' : ''}`}>
          <div className="search-container">
            <div className="search-bar">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Buscar locais acessíveis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button className="search-filters-btn">
                <SlidersHorizontal size={20} />
              </button>
            </div>
          </div>

          <MapContainer
            center={[-15.7942, -47.8822]}
            zoom={13}
            className="leaflet-map"
          >
            <TileLayer
              attribution="Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
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

        {selectedMarker && (
          <div className={`info-drawer ${drawerOpen ? 'drawer-open' : 'drawer-closed'}`}>
            <div className="drawer-content">
              <div className="drawer-header">
                <h3 className="drawer-title">{selectedMarker.name}</h3>
                <button
                  onClick={closeDrawer}
                  className="drawer-close-btn"
                >
                  <X size={28} />
                </button>
              </div>

              <div className="rating-display">
                <div className="stars-rating">
                  <div className="stars-background">
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                  </div>
                  <div
                    className="stars-foreground"
                    style={{ width: `${(selectedMarker.rating / 5) * 100}%` }}
                  >
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                  </div>
                </div>
                <span className="rating-text">
                  {selectedMarker.rating} ({selectedMarker.reviews} avaliações)
                </span>
              </div>

              <div className="accessibility-score">
                <div className="accessibility-header">
                  <span>Acessibilidade</span>
                  <span className="score">{selectedMarker.accessibility}/10</span>
                </div>
                <div className="accessibility-bar">
                  <div
                    className="accessibility-fill"
                    style={{ width: `${selectedMarker.accessibility * 10}%` }}
                  ></div>
                </div>
              </div>

              <div className="features-list">
                {selectedMarker.features.map((feature, index) => (
                  <span key={index} className={getFeatureClass(feature)}>
                    {getFeatureIcon(feature)}
                    {getFeatureLabel(feature)}
                  </span>
                ))}
              </div>

              <div className="info-sections">
                <div className="info-item">
                  <div className="info-icon info-icon-blue">
                    <MapPin size={24} />
                  </div>
                  <div className="info-text">
                    <p className="info-title">{selectedMarker.address}</p>
                    <p className="info-subtitle">{selectedMarker.city}</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon info-icon-green">
                    <Clock size={24} />
                  </div>
                  <div className="info-text">
                    <p className="info-title">Horário de Funcionamento</p>
                    <p className="info-subtitle">
                      Segunda a Sábado: {selectedMarker.hours.weekdays}
                    </p>
                    <p className="info-subtitle">
                      Domingo: {selectedMarker.hours.weekend}
                    </p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon info-icon-purple">
                    <Phone size={24} />
                  </div>
                  <div className="info-text">
                    <p className="info-title">Contato</p>
                    <p className="info-subtitle">{selectedMarker.contact.phone}</p>
                    <p className="info-subtitle">{selectedMarker.contact.email}</p>
                  </div>
                </div>
              </div>

              <div className="description-section">
                <h4 className="section-title">Descrição</h4>
                <p className="description-text">{selectedMarker.popUp}</p>
              </div>

              <div className="photos-section">
                <h4 className="section-title">Fotos</h4>
                <div className="photos-grid">
                  {selectedMarker.photos.map((photo, index) => (
                    <div key={index} className="photo-item">
                      <img
                        src={photo}
                        alt={`Foto ${index +1} do ${selectedMarker.name}`}
                        className="photo-image"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="action-buttons">
                <button className="action-btn action-btn-primary">
                  <ArrowRight className="btn-icon" /> Rotas
                </button>
                <button className="action-btn action-btn-secondary">
                  <Edit className="btn-icon" /> Avaliar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;