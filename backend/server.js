const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors());

const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || "taskmanager",
    user: process.env.DB_USER || "taskapp",
    password: process.env.DB_PASSWORD || "taskapp123"
});

app.get("/",(req, res) => {
    res.json({
        message: "DevOps Task Manager API is running"
    });
});

app.get("/api/tasks", async (req, res) => {
    try {
	const result = await pool.query(
	    "SELECT * FROM tasks ORDER BY id"
	);

	res.json(result.rows);
    } catch (error) {
	console.error(error);
	res.status(500).json({
	    error: "Database query failed"
	});
    }
});

app.get("/health", async (req, res) => {
    try {
	await pool.query("SELECT 1");

	res.status(200).json({
	    status: "healthy",
	    database: "connected"
	});
    } catch (error) {
	res.status(503).json({
	    status: "unhealthy",
	    database: "disconnected"
	});
    }   
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
