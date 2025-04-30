// src/routes/locationRoutes.js
const express = require('express');
const router = express.Router();
const locationService = require('../services/locationService');
const authenticate = require('../middleware/auth'); // Para futura autenticação

// Rota para criar um novo local
router.post('/', authenticate, async (req, res) => {
  try {
    const { nome, descricao, endereco } = req.body;
    const criado_por = req.user.id; // Assumindo que o middleware auth adiciona o usuário
    
    if (!nome || !endereco) {
      return res.status(400).json({ error: 'Nome e endereço são obrigatórios' });
    }

    const newLocation = await locationService.createNewLocation({
      nome,
      descricao,
      endereco,
      criado_por
    });
    
    res.status(201).json(newLocation);
  } catch (error) {
    console.error('Error creating location:', error);
    res.status(500).json({ error: error.message || 'Falha ao criar local' });
  }
});

// Rota para buscar locais próximos
router.get('/nearby', async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;
    
    if (!lat || !lng) {
      return res.status(400).json({ error: 'Latitude e longitude são obrigatórias' });
    }

    const locations = await locationService.getNearbyLocations(
      parseFloat(lat),
      parseFloat(lng),
      radius ? parseFloat(radius) : 5
    );
    
    res.json(locations);
  } catch (error) {
    console.error('Error fetching nearby locations:', error);
    res.status(500).json({ error: 'Falha ao buscar locais próximos' });
  }
});

module.exports = router;