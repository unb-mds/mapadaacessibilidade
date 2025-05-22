// src/controllers/locations.js
const Location = require('../models/Location');

exports.getNearbyLocations = async (req, res, next) => {
  try {
    const { latitude, longitude, radius = 5000 } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide latitude and longitude' 
      });
    }

    const locations = await Location.findNearby(latitude, longitude, radius);
    res.status(200).json({ success: true, count: locations.length, data: locations });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.createLocation = async (req, res, next) => {
  try {
    const { name, description, address, latitude, longitude } = req.body;

    // Validate coordinates
    if (!latitude || !longitude) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide latitude and longitude' 
      });
    }

    const location = await Location.create({
      name,
      description,
      address,
      latitude,
      longitude,
      createdBy: req.user.id
    });

    res.status(201).json({ success: true, data: location });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
