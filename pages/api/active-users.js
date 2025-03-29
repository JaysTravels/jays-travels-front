import pool from "../lib/db"; // Import the database connection

export default async function handler(req, res) {
    try {
        const { rows } = await pool.query(`SELECT COUNT(*) FROM active_users`);
        res.status(200).json({ activeUsers: rows[0].count });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ error: error.message });
    }
}
