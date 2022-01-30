import db from '../../database';

class CategoriesRepository {
  async findAll() {
    const query = `
        SELECT * FROM categories ORDER BY name
    `;

    const rows = await db.query(query);
    return rows;
  }

  async create(name: string) {
    const query = `
        INSERT INTO categories(name) 
        VALUES($1)
        RETURNING *
    `;

    const [row] = await db.query(query, [name]);
    return row;
  }
}

export default new CategoriesRepository();
