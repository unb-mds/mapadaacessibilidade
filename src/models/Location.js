// src/models/Location.js
class Location {
  static async create({ name, description, address, latitude, longitude, createdBy }) {
    const query = `
      INSERT INTO locations (
        name, description, address, latitude, longitude, 
        geolocation, status, created_by
      )
      VALUES (
        $1, $2, $3, $4, $5, 
        ST_SetSRID(ST_MakePoint($5, $4), 'pending', $6
      )
      RETURNING *
    `;
    const values = [name, description, address, latitude, longitude, createdBy];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async findNearby(latitude, longitude, radius = 5000) {
    const query = `
      SELECT 
        id, name, description, address, latitude, longitude,
        ST_Distance(
          geolocation,
          ST_SetSRID(ST_MakePoint($2, $1), 4326
        ) AS distance
      FROM locations
      WHERE status = 'approved'
      AND ST_DWithin(
        geolocation,
        ST_SetSRID(ST_MakePoint($2, $1), 4326,
        $3
      )
      ORDER BY distance
      LIMIT 50
    `;
    const { rows } = await db.query(query, [latitude, longitude, radius]);
    return rows;
  }
}

module.exports = Location;
