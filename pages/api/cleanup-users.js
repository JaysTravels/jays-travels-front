export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();

    const { Pool } = await import("pg"); //

    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.PGSSLMODE ? { rejectUnauthorized: false } : false,
    });

    try {
        await pool.query(`DELETE FROM active_users WHERE last_active < NOW() - INTERVAL '5 minutes'`);
        console.log("User deleted");
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error cleaning up users:", error);
        res.status(500).json({ error: error });
    }
}
