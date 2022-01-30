import { Client } from 'pg';

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'mycontacts',
});

client.connect();

let db = {
  query: async (query: string, values?: any[]) => {
    const { rows } = await client.query(query, values);
    return rows;
  },
};

export default db;
