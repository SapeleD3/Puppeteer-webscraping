import { config } from 'dotenv';
config();

export const mongoBaseUrl = process.env.MONGO_DB_URL;
