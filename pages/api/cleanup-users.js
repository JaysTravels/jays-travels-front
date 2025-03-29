import pool from "../lib/db"; // Import the database connection

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();

    try {
        await pool.query(`DELETE FROM active_users WHERE last_active < NOW() - INTERVAL '5 minutes'`);
        res.status(200).json({ success: true });
      console.log("User deleted")
    } catch (error) {
        console.error("Error cleaning up users:", error);
        res.status(500).json({ error: error.message });
    }
}
