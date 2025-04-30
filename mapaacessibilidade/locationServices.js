// src/services/locationService.js
const locationRepository = require('../repositories/locationRepository');
const axios = require('axios');

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

async function createNewLocation(locationData) {
  // Primeiro validamos o endereço com a API do Google
  const validatedAddress = await validateAddressWithGoogle(locationData.endereco);
  
  if (!validatedAddress) {
    throw new Error('Endereço não pôde ser validado');
  }

  // Atualiza com os dados do Google
  const completeLocationData = {
    ...locationData,
    latitude: validatedAddress.latitude,
    longitude: validatedAddress.longitude,
    endereco: validatedAddress.formatted_address
  };

  return locationRepository.createLocation(completeLocationData);
}

async function validateAddressWithGoogle(address) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`
    );
    
    if (response.data.results && response.data.results.length > 0) {
      const result = response.data.results[0];
      return {
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng,
        formatted_address: result.formatted_address
      };
    }
    return null;
  } catch (error) {
    console.error('Error validating address with Google:', error);
    throw error;
  }
}

async function getNearbyLocations(lat, lng, radius) {
  return locationRepository.findLocationsNearby(lat, lng, radius);
}

module.exports = {
  createNewLocation,
  getNearbyLocations,
  validateAddressWithGoogle
};