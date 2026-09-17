import { Handler } from "aws-lambda";
import { Client } from "pg";

interface Metrics {
  total: number;
  pending: number;
  inProgress: number;
  done: number;
}

export const handler: Handler = async () => {
  const client = new Client({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 5433),
    user: process.env.DB_USERNAME || "vale",
    password: process.env.DB_PASSWORD || "Pass123",
    database: process.env.DB_NAME || "pruebatecnica",
  });

  await client.connect();

  const result = await client.query(`
    SELECT
      COUNT(*)::int AS total,
      COUNT(*) FILTER (WHERE status = 'PENDIENTE')::int AS pending,
      COUNT(*) FILTER (WHERE status = 'EN_CURSO')::int AS "inProgress",
      COUNT(*) FILTER (WHERE status = 'HECHO')::int AS done
    FROM notes
  `);

  await client.end();

  const metrics: Metrics = result.rows[0];

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      total: Number(metrics.total),
      pending: Number(metrics.pending),
      inProgress: Number(metrics.inProgress),
      done: Number(metrics.done),
    }),
  };
};
