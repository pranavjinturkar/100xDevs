import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

export async function getClient() {
  const client = new Client(process.env.PG_URL);
  await client.connect();
  return client;
}
