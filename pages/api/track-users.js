import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSLMODE ? { rejectUnauthorized: false } : false,
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { sessionId, userId, ip } = req.body;

  try {
    await pool.query(
      `INSERT INTO active_users (session_id, user_id, ip_address, last_active)
       VALUES ($1, $2, $3, NOW())
       ON CONFLICT (session_id) 
       DO UPDATE SET last_active = NOW()`,
      [sessionId, userId, ip]
    );

    res.status(200).json({ success: true });
  } catch (error) {
    debugger;
    console.error("Error tracking user:", error);
    res.status(500).json({ error: error });
  }
}
