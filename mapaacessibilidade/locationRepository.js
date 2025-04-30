// src/repositories/locationRepository.js
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function createLocation(locationData) {
  const { nome, descricao, endereco, latitude, longitude, criado_por } = locationData;
  const query = `
    INSERT INTO Local (
      id, nome, descricao, endereco, latitude, longitude, 
      geolocalizacao, status, criado_por, fk_usuario_foto_id
    ) 
    VALUES (
      uuid_generate_v4(), $1, $2, $3, $4, $5, 
      ST_SetSRID(ST_MakePoint($5, $4), 4326), 'pendente', $6, $6
    )
    RETURNING *;
  `;
  const values = [nome, descricao, endereco, latitude, longitude, criado_por];
  
  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating location:', error);
    throw error;
  }
}

async function findLocationsNearby(lat, lng, radiusInKm = 5) {
  const query = `
    SELECT 
      id, nome, descricao, endereco, latitude, longitude,
      ST_Distance(
        geolocalizacao,
        ST_SetSRID(ST_MakePoint($2, $1), 4326)
      ) AS distance
    FROM Local
    WHERE status = 'aprovado'
    AND ST_DWithin(
      geolocalizacao,
      ST_SetSRID(ST_MakePoint($2, $1), 4326),
      $3 * 1000
    )
    ORDER BY distance
    LIMIT 50;
  `;
  
  try {
    const result = await pool.query(query, [lat, lng, radiusInKm]);
    return result.rows;
  } catch (error) {
    console.error('Error finding nearby locations:', error);
    throw error;
  }
}

module.exports = {
  createLocation,
  findLocationsNearby
};