import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ArrowLeft, MapPin } from 'lucide-react';
import './Local.css';

const categories = [
  { value: "restaurante", label: "Restaurante e Café" },
  { value: "compras", label: "Compras" },
  { value: "lazer", label: "Lazer e Cultura" },
  { value: "servicos", label: "Serviços Públicos" },
  { value: "saude", label: "Saúde" },
  { value: "transporte", label: "Transporte" },
  { value: "hospedagem", label: "Hospedagem" },
  { value: "outro", label: "Outro" },
];

const accessibilityItems = [
  { id: "ramp", label: "Rampa de acesso" },
  { id: "tactilePaving", label: "Piso tátil" },
  { id: "adaptedBathroom", label: "Banheiro adaptado" },
  { id: "audioSignaling", label: "Sinalização sonora" },
  { id: "braille", label: "Cardápio em Braille" },
  { id: "parking", label: "Vagas de estacionamento reservadas" },
];

export default function AddPlace() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    placeName: '',
    category: '',
    address: '',
    wheelchairAccess: '',
    accessibilityFeatures: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Local adicionado com sucesso! Obrigado pela sua contribuição para um mapa mais acessível.');
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      accessibilityFeatures: checked 
        ? [...prev.accessibilityFeatures, name]
        : prev.accessibilityFeatures.filter(item => item !== name)
    }));
  };

  const handleRadioChange = (e) => {
    setFormData(prev => ({
      ...prev,
      wheelchairAccess: e.target.value
    }));
  };

  return (
    <main className="add-place-container">
      <button 
        className="back-button"
        onClick={() => navigate('/')}
      >
        <ArrowLeft size={16} />
        Voltar para o mapa
      </button>

      <form onSubmit={handleSubmit} className="add-place-form">
        <div className="form-section">
          <div className="card">
            <div className="card-header">
              <h2>Informações Gerais</h2>
              <p className="card-description">Nos diga o nome e o tipo do local.</p>
            </div>
            <div className="card-content">
              <div className="form-group">
                <label htmlFor="place-name">Nome do Local</label>
                <input 
                  id="place-name" 
                  name="placeName"
                  type="text"
                  placeholder="Ex: Café Central" 
                  value={formData.placeName}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Categoria</label>
                <select 
                  id="category" 
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2>Endereço</h2>
              <p className="card-description">Onde o local está situado?</p>
            </div>
            <div className="card-content">
              <div className="form-group">
                <label htmlFor="address">Endereço Completo</label>
                <div className="input-with-icon">
                  <MapPin className="input-icon" size={16} />
                  <input 
                    id="address" 
                    name="address"
                    type="text"
                    placeholder="Rua, número, bairro, cidade..." 
                    value={formData.address}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2>Acessibilidade</h2>
              <p className="card-description">Informe sobre as características de acessibilidade do local.</p>
            </div>
            <div className="card-content">
              <div className="form-group">
                <label>O local é acessível para cadeira de rodas?</label>
                <div className="radio-group">
                  <div className="radio-item">
                    <input 
                      type="radio" 
                      id="wc-yes" 
                      name="wheelchairAccess" 
                      value="yes"
                      onChange={handleRadioChange}
                    />
                    <label htmlFor="wc-yes">Sim, totalmente acessível</label>
                  </div>
                  <div className="radio-item">
                    <input 
                      type="radio" 
                      id="wc-partial" 
                      name="wheelchairAccess" 
                      value="partial"
                      onChange={handleRadioChange}
                    />
                    <label htmlFor="wc-partial">Parcialmente acessível</label>
                  </div>
                  <div className="radio-item">
                    <input 
                      type="radio" 
                      id="wc-no" 
                      name="wheelchairAccess" 
                      value="no"
                      onChange={handleRadioChange}
                    />
                    <label htmlFor="wc-no">Não, inacessível</label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Outras características de acessibilidade:</label>
                <div className="checkbox-grid">
                  {accessibilityItems.map((item) => (
                    <div key={item.id} className="checkbox-item">
                      <input 
                        type="checkbox" 
                        id={item.id} 
                        name={item.id}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor={item.id}>{item.label}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="submit-button">
              <Plus size={20} />
              Salvar Local
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}