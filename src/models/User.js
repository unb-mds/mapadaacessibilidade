// src/models/User.js (updated)

class User {
  static async create({ name, email, password }) {
    const query = `
      INSERT INTO users (name, email, password, role, status)
      VALUES ($1, $2, $3, 'user', 'pending')
      RETURNING id, name, email, role, status, created_at
    `;
    const values = [name, email, password];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async findByEmail(email) {
    const { rows } = await db.query(
      'SELECT * FROM users WHERE email = $1', 
      [email]
    );
    return rows[0];
  }

  static async findById(id) {
    const { rows } = await db.query(
      'SELECT id, name, email, role, status FROM users WHERE id = $1',
      [id]
    );
    return rows[0];
  }
}

module.exports = User;
