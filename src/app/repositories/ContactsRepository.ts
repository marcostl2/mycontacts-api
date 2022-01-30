import { Contact, ORDER_BY_TYPE } from '../types';

import db from '../../database';

class ContactsRepository {
  async findAll(orderBy: ORDER_BY_TYPE = 'ASC') {
    const query = `
      SELECT contacts.*, categories.name AS category_name 
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id
      ORDER BY contacts.name ${orderBy.toUpperCase()}
    `;
    const rows = await db.query(query);
    return rows;
  }

  async findById(id: string) {
    const query = `
      SELECT contacts.*, categories.name AS category_name 
      FROM contacts 
      LEFT JOIN categories ON categories.id = contacts.category_id
      WHERE contacts.id = $1
    `;

    const row = await db.query(query, [id]);
    return row;
  }

  async findByEmail(email: string) {
    const query = `
      SELECT * FROM contacts WHERE email = $1
    `;

    const row = await db.query(query, [email]);

    return row;
  }

  async create({ name, email, phone, category_id }: Contact) {
    const query = `
      INSERT INTO contacts (name, email, phone, category_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const [row] = await db.query(query, [name, email, phone, category_id]);

    return row;
  }

  async update(id: string, { name, email, phone, category_id }: Contact) {
    const query = `
      UPDATE contacts SET name = $1, email = $2, phone = $3, category_id = $4 
      WHERE id = $5
      RETURNING *
    `;

    const [row] = await db.query(query, [name, email, phone, category_id, id]);

    return row;
  }

  async delete(id: string) {
    const query = `
      DELETE FROM contacts WHERE id = $1
    `;

    const deleteOp = await db.query(query, [id]);
    return deleteOp;
  }
}

export default new ContactsRepository();
