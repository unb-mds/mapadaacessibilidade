// src/routes/locations.js
const express = require('express');
const {
  getLocations,
  getLocation,
  createLocation,
  updateLocation,
  deleteLocation,
  getLocationsInRadius,
  locationPhotoUpload
} = require('../controllers/locations');

const Location = require('../models/Location');
const advancedResults = require('../middleware/advancedResults');

// Include other resource routers
const reviewRouter = require('./reviews');

const router = express.Router();

// Re-route into other resource routers
router.use('/:locationId/reviews', reviewRouter);

router.route('/radius/:zipcode/:distance').get(getLocationsInRadius);

router
  .route('/')
  .get(advancedResults(Location, 'createdBy'), getLocations)
  .post(protect, authorize('user', 'admin'), createLocation);

router
  .route('/:id')
  .get(getLocation)
  .put(protect, authorize('user', 'admin'), updateLocation)
  .delete(protect, authorize('user', 'admin'), deleteLocation);

router
  .route('/:id/photo')
  .put(protect, authorize('user', 'admin'), locationPhotoUpload);

module.exports = router;
