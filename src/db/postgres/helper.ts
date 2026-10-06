import { pool } from "./client";

export async function postgresHelper<T = unknown>(
  query: string,
  params: string[],
): Promise<T[]> {
  const client = await pool.connect();

  const result = await client.query(query, params);

  client.release();

  return result.rows;
}
