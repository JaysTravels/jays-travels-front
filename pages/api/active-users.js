export default async function handler(req, res) {
    try {
        const { Pool } = await import("pg"); // ✅ Ensures it runs only on the server

        const pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: process.env.PGSSLMODE ? { rejectUnauthorized: false } : false,
        });

        const { rows } = await pool.query(`SELECT COUNT(*) FROM active_users`);

        res.status(200).json({ activeUsers: rows[0].count });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ error: error });
    }
}
