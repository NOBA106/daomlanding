import pg from 'pg';

const DATABASE_URL = import.meta.env.DATABASE_URL || process.env.DATABASE_URL;

export async function query(text: string, params?: any[]) {
  const client = new pg.Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    const result = await client.query(text, params);
    return result.rows;
  } finally {
    await client.end();
  }
}
