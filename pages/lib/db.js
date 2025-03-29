import { Pool } from "pg";

// Create a connection pool (reuse instead of reconnecting for every request)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Use environment variable for security
    ssl: {
        rejectUnauthorized: false, // Required if using PostgreSQL on Azure or Heroku
    },
});

export default pool;
