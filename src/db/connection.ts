import { Client as pgClient } from 'pg';

const client = new pgClient({
  host: 'localhost',
  user: 'postgres',
  port: 8000,
  password: 'Ryan94@@^^',
  database: 'postgres',
});

export default client;
