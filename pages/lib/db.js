import { Pool } from "pg";

// Create a connection pool (reuse instead of reconnecting for every request)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Use environment variable for security
    ssl: process.env.PGSSLMODE
    ? { rejectUnauthorized: process.env.PGSSLMODE !== 'disable' }
    : false,
});

export default pool;
