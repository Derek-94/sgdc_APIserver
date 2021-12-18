import { Client as pgClient } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new pgClient({
  host: process.env.HOST,
  user: 'postgres',
  port: 8000,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

export default client;
