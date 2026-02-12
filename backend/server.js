const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());
24

// ✅ DB Connection
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "Mydatabase",     // ✅ matches screenshot
    password: "root",  // ⚠️ your postgres password
    port: 5432,
});

// ✅ Test Connection
pool.connect()
    .then(() => console.log("Database Connected ✅"))
    .catch(err => console.error("DB Connection Error ❌", err));

// ✅ API
app.post("/register", async (req, res) => {

    console.log("Incoming Data:", req.body);

    const { name, email, password } = req.body;

    try {
        await pool.query(
            'INSERT INTO "user".users (name, email, password) VALUES ($1, $2, $3)',
            [name, email, password]
        );

        res.json({ message: "User Registered Successfully ✅" });

    } catch (err) {
        console.error("DB ERROR ❌", err);
        res.status(500).json({ message: "Database Error ❌" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
