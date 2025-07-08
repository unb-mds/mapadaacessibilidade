

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import api from '../services/api.jsx'; // Your Axios instance
import L from 'leaflet';
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
import "./Home.css"; // Ensure your CSS is correctly linked

// --- Leaflet Icon Configuration ---
// Fixes for default Leaflet icons to appear correctly
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom icon using Leaflet's default
const customIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function Home() {
  // --- UI States ---
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // --- Map Marker Data States ---
  const [markers, setMarkers] = useState([]); // This will hold all markers: loaded from API + newly added
  const [newMarkerPos, setNewMarkerPos] = useState(null); // Temp position for a new marker from map click
  const [showAddForm, setShowAddForm] = useState(false); // Controls visibility of the add-marker form popup

  // --- New Marker Form States (matching your Prisma schema fields) ---
  const [newPointTitle, setNewPointTitle] = useState('');
  const [newPointDescription, setNewPointDescription] = useState('');
  const [newPointType, setNewPointType] = useState('');
  const [newPointAddress, setNewPointAddress] = useState('');
  const [newPointCity, setNewPointCity] = useState('');
  const [newPointNeighborhood, setNewPointNeighborhood] = useState('');
  const [newPointState, setNewPointState] = useState('');

  // --- User ID for filtering and creating ---
  // IMPORTANT: This ID should come from your authentication system (e.g., user context, token).
  // Using a hardcoded ID for now based on your request.
  const USER_CREATOR_ID = "699714b3-6124-4829-9282-b98131b317d8";

  // --- API Loading and Error States ---
  const [isLoading, setIsLoading] = useState(true); // Starts true to show loading on initial fetch
  const [error, setError] = useState(null);

  // --- Effect Hook: Load existing markers from API for the specific user on component mount ---
  useEffect(() => {
    const fetchExistingMarkers = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Make GET request to your backend's /locais endpoint,
        // sending `criado_por` as a query parameter.
        const response = await api.get('/locais', {
          params: {
            criado_por: USER_CREATOR_ID // <--- NEW: Sending user ID as query parameter
          }
        });

        // Map API response data to the format your frontend expects for markers
        // Your API's GET response for /locais looks like { success: true, data: [...] }
        const loadedMarkers = response.data.data.map(item => ({
          id: item.id,
          geocode: [parseFloat(item.latitude), parseFloat(item.longitude)],
          name: item.nome,
          description: item.descricao || '',
          popUp: item.descricao || '',
          type: item.tipo || '',
          address: item.endereco || '',
          city: item.cidade || '',
          neighborhood: item.bairro || '',
          state: item.estado || '',
          rating: item.avaliacao && item.avaliacao.length > 0 ?
                  (item.avaliacao.reduce((sum, current) => sum + current.nota, 0) / item.avaliacao.length).toFixed(1) : 0,
          reviews: item.avaliacao ? item.avaliacao.length : 0,
          accessibility: 0, // This might need custom logic based on localacessibilidade
          hours: { weekdays: 'N/A', weekend: 'N/A' },
          contact: { phone: 'N/A', email: 'N/A' },
          features: [], // You might map this from item.localacessibilidade
          photos: [], // Map from your `foto` model if applicable
        }));
        setMarkers(loadedMarkers);

      } catch (err) {
        console.error("Erro ao buscar pontos do banco de dados:", err);
        const errorMessage = err.response?.data?.message || err.message || "Não foi possível carregar os pontos do mapa. Tente novamente.";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch if USER_CREATOR_ID is available (e.g., after login)
    if (USER_CREATOR_ID) {
        fetchExistingMarkers();
    } else {
        setIsLoading(false); // If no user ID, stop loading and show no markers
        setError("User ID not available to load locations.");
    }

    // --- Effect Hook: Check screen size for mobile responsiveness (existing logic) ---
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setFiltersOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [USER_CREATOR_ID]); // <--- NEW: Add USER_CREATOR_ID to dependency array
                        // This ensures re-fetch if the user ID somehow changes

  // --- Internal component to handle map click events for adding new markers ---
  function MapClickHandler() {
    useMapEvents({
      click: (e) => {
        setNewMarkerPos(e.latlng);
        setShowAddForm(true);
        // Clear form fields for new entry
        setNewPointTitle('');
        setNewPointDescription('');
        setNewPointType('');
        setNewPointAddress('');
        setNewPointCity('');
        setNewPointNeighborhood('');
        setNewPointState('');

        setSelectedMarker(null); // Close info drawer if open
        setDrawerOpen(false);
      },
    });
    return null;
  }

  // --- Function to handle submission of the new marker form to the API ---
  const handleAddPointSubmit = async (e) => {
    e.preventDefault();

    if (!newMarkerPos || !newPointTitle || !newPointAddress || !newPointCity || !newPointState || !USER_CREATOR_ID) {
      alert('Por favor, preencha todos os campos obrigatórios (Título, Endereço, Cidade, Estado) e certifique-se de estar logado.');
      return;
    }

    const dataToSendToAPI = {
      nome: newPointTitle,
      descricao: newPointDescription,
      tipo: newPointType === '' ? null : newPointType,
      endereco: newPointAddress,
      cidade: newPointCity,
      bairro: newPointNeighborhood === '' ? null : newPointNeighborhood,
      estado: newPointState,
      latitude: newMarkerPos.lat.toString(),
      longitude: newMarkerPos.lng.toString(),
      status: "pendente", // Default status, adjust as per your backend logic
      criado_por: USER_CREATOR_ID, // Sending the user ID for creation
    };

    console.log("JSON to send to API:", dataToSendToAPI);

    try {
      const response = await api.post('/locais', dataToSendToAPI);

      // Accessing the created local from `response.data.data` (as per your `criarLocal` controller)
      const newLocalFromAPI = response.data.data; // <--- Corrected access for your specific backend response structure

      // Clear any previous error messages on success
      setError(null);

      console.log('Local salvo na API:', newLocalFromAPI);
      alert('Local cadastrado com sucesso!');

      // Map the newly created local object to the frontend marker format and add to state
      const addedMarker = {
        id: newLocalFromAPI.id,
        geocode: [parseFloat(newLocalFromAPI.latitude), parseFloat(newLocalFromAPI.longitude)],
        name: newLocalFromAPI.nome,
        description: newLocalFromAPI.descricao || '',
        popUp: newLocalFromAPI.descricao || '',
        type: newLocalFromAPI.tipo || '',
        address: newLocalFromAPI.endereco || '',
        city: newLocalFromAPI.cidade || '',
        neighborhood: newLocalFromAPI.bairro || '',
        state: newLocalFromAPI.estado || '',
        // Add default values for optional fields not returned by API POST if needed
        rating: 0, reviews: 0, accessibility: 0, hours: { weekdays: 'N/A', weekend: 'N/A' }, contact: { phone: 'N/A', email: 'N/A' }, features: [], photos: [],
      };
      setMarkers(prevMarkers => [...prevMarkers, addedMarker]);

      // Clear form and close popup
      setShowAddForm(false);
      setNewMarkerPos(null);
      setNewPointTitle('');
      setNewPointDescription('');
      setNewPointType('');
      setNewPointAddress('');
      setNewPointCity('');
      setNewPointNeighborhood('');
      setNewPointState('');

    } catch (error) {
      console.error('Erro ao enviar local para a API:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Erro desconhecido ao cadastrar local.';
      setError(`Erro ao cadastrar: ${errorMessage}`);
      alert(`Erro ao cadastrar local: ${errorMessage}`);
    }
  };

  // --- Functions for Drawer and Filter Sidebar (kept as is) ---
  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setDrawerOpen(true);
    if (isMobile) {
      setFiltersOpen(false);
    }
    setShowAddForm(false);
    setNewMarkerPos(null);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  // Helper functions for feature icons and labels (kept as is)
  const getFeatureIcon = (feature) => {
    switch (feature) {
      case "ramp": return <Accessibility className="feature-icon" />;
      case "bathroom": return <WashingMachine className="feature-icon" />;
      case "tactile": return <Eye className="feature-icon" />;
      case "elevator": return <Building className="feature-icon" />;
      case "wheelchair": return <Accessibility className="feature-icon" />;
      case "audio": return <Volume2 className="feature-icon" />;
      case "braille": return <Eye className="feature-icon" />;
      default: return null;
    }
  };

  const getFeatureClass = (feature) => {
    switch (feature) {
      case "ramp": return "feature-tag feature-ramp";
      case "bathroom": return "feature-tag feature-bathroom";
      case "tactile": return "feature-tag feature-tactile";
      case "elevator": return "feature-tag feature-elevator";
      case "wheelchair": return "feature-tag feature-wheelchair";
      case "audio": return "feature-tag feature-audio";
      case "braille": return "feature-tag feature-braille";
      default: return "feature-tag feature-default";
    }
  };

  const getFeatureLabel = (feature) => {
    switch (feature) {
      case "ramp": return "Rampas";
      case "bathroom": return "Banheiros";
      case "tactile": return "Pisos táteis";
      case "elevator": return "Elevadores";
      case "wheelchair": return "Acesso Cadeirante";
      case "audio": return "Sinalização Sonora";
      case "braille": return "Braile";
      default: return feature;
    }
  };

  // --- Filters Sidebar Component (kept as is) ---
  function FiltersSidebar() {
    return (
      <aside
        className={`filters-sidebar ${filtersOpen ? "filters-open" : "filters-closed"}`}
      >
        <div className="filters-header">
          <h2 className="filters-title">Filtrar Locais</h2>
          <button onClick={toggleFilters} className="filters-toggle">
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
                      <Star className="star empty" />
                      <Star className="star empty" />
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

        <div
          className={`map-container ${filtersOpen && !isMobile ? "map-with-sidebar" : ""}`}
        >
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
            <MapClickHandler />

            {markers.map((marker) => (
              <Marker
                key={marker.id}
                position={marker.geocode}
                icon={customIcon}
                eventHandlers={{
                  click: () => handleMarkerClick(marker),
                }}
              >
                <Popup>
                  <strong>{marker.name}</strong>
                  {marker.description && <p>{marker.description}</p>}
                </Popup>
              </Marker>
            ))}

            {newMarkerPos && showAddForm && (
              <Marker position={newMarkerPos} icon={customIcon}>
                <Popup position={newMarkerPos} autoClose={false}>
                  <div style={{ padding: '10px' }}>
                    <h3>Cadastrar Novo Local</h3>
                    <form onSubmit={handleAddPointSubmit}>
                      <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="newPointTitle">Título (Nome):</label>
                        <input
                          type="text"
                          id="newPointTitle"
                          value={newPointTitle}
                          onChange={(e) => setNewPointTitle(e.target.value)}
                          required
                          style={{ width: '100%', padding: '5px' }}
                        />
                      </div>
                      <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="newPointDescription">Descrição:</label>
                        <textarea
                          id="newPointDescription"
                          value={newPointDescription}
                          onChange={(e) => setNewPointDescription(e.target.value)}
                          rows="3"
                          style={{ width: '100%', padding: '5px' }}
                        />
                      </div>
                      <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="newPointType">Tipo:</label>
                        <input
                          type="text"
                          id="newPointType"
                          value={newPointType}
                          onChange={(e) => setNewPointType(e.target.value)}
                          style={{ width: '100%', padding: '5px' }}
                          placeholder="Ex: Shopping, Restaurante, Parque"
                        />
                      </div>
                      <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="newPointAddress">Endereço:</label>
                        <input
                          type="text"
                          id="newPointAddress"
                          value={newPointAddress}
                          onChange={(e) => setNewPointAddress(e.target.value)}
                          required
                          style={{ width: '100%', padding: '5px' }}
                        />
                      </div>
                      <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="newPointCity">Cidade:</label>
                        <input
                          type="text"
                          id="newPointCity"
                          value={newPointCity}
                          onChange={(e) => setNewPointCity(e.target.value)}
                          required
                          style={{ width: '100%', padding: '5px' }}
                        />
                      </div>
                      <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="newPointNeighborhood">Bairro:</label>
                        <input
                          type="text"
                          id="newPointNeighborhood"
                          value={newPointNeighborhood}
                          onChange={(e) => setNewPointNeighborhood(e.target.value)}
                          style={{ width: '100%', padding: '5px' }}
                        />
                      </div>
                      <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="newPointState">Estado (UF):</label>
                        <input
                          type="text"
                          id="newPointState"
                          value={newPointState}
                          onChange={(e) => setNewPointState(e.target.value)}
                          required
                          maxLength="2"
                          style={{ width: '100%', padding: '5px' }}
                        />
                      </div>

                      <button
                        type="submit"
                        style={{
                          padding: '8px 15px',
                          backgroundColor: '#007bff',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                        }}
                      >
                        Salvar Local
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddForm(false);
                          setNewMarkerPos(null);
                        }}
                        style={{
                          padding: '8px 15px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          marginLeft: '10px'
                        }}
                      >
                        Cancelar
                      </button>
                    </form>
                  </div>
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>

        {selectedMarker && (
          <div
            className={`info-drawer ${drawerOpen ? "drawer-open" : "drawer-closed"}`}
          >
            <div className="drawer-content">
              <div className="drawer-header">
                <h3 className="drawer-title">{selectedMarker.name}</h3>
                <button onClick={closeDrawer} className="drawer-close-btn">
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
                  <span className="score">
                    {selectedMarker.accessibility}/10
                  </span>
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
                    <p className="info-subtitle">
                      {selectedMarker.contact.phone}
                    </p>
                    <p className="info-subtitle">
                      {selectedMarker.contact.email}
                    </p>
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
                        alt={`Foto ${index + 1} do ${selectedMarker.name}`}
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
