const express = require("express");
const cors = require("cors");
require("dotenv").config();

const initDB = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

async function startServer() {
  try {
    const db = await initDB;

    app.get("/", (req, res) => {
      res.json({ message: "Contact Book API is running!" });
    });

    app.post("/contacts", async (req, res) => {
      try {
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) {
          return res.status(400).json({ error: "All fields are required" });
        }
        const existing = await db.get(
          `SELECT * FROM contacts WHERE email = ? OR phone = ?`,
          [email, phone]
        );
        if (existing) {
          return res
            .status(400)
            .json({ error: "Email or phone already exists" });
        }

        const result = await db.run(
          `INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)`,
          [name, email, phone]
        );

        res.status(201).json({
          id: result.lastID,
          name,
          email,
          phone,
          message: "Contact added successfully",
        });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.get("/contacts", async (req, res) => {
      try {
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = Math.max(parseInt(req.query.limit) || 10, 1);
        const offset = (page - 1) * limit;

        const totalRow = await db.get(`SELECT COUNT(*) as count FROM contacts`);
        const total = totalRow.count;

        const rows = await db.all(
          `SELECT * FROM contacts ORDER BY id DESC LIMIT ? OFFSET ?`,
          [limit, offset]
        );

        res.json({
          contacts: rows,
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.patch("/contacts/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const { name, email, phone } = req.body;

        if (!name && !email && !phone) {
          return res
            .status(400)
            .json({ error: "At least one field is required" });
        }

        const fields = [];
        const values = [];

        if (name) {
          fields.push("name = ?");
          values.push(name);
        }
        if (email) {
          fields.push("email = ?");
          values.push(email);
        }
        if (phone) {
          fields.push("phone = ?");
          values.push(phone);
        }

        const sql = `UPDATE contacts SET ${fields.join(", ")} WHERE id = ?`;
        values.push(id);

        const result = await db.run(sql, values);
        if (result.changes === 0) {
          return res.status(404).json({ error: "Contact not found" });
        }

        const updated = await db.get(`SELECT * FROM contacts WHERE id = ?`, [
          id,
        ]);
        res.json({
          ...updated,
          message: "Contact updated successfully",
        });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.delete("/contacts/:id", async (req, res) => {
      try {
        const result = await db.run(`DELETE FROM contacts WHERE id = ?`, [
          req.params.id,
        ]);
        if (result.changes === 0) {
          return res.status(404).json({ error: "Contact not found" });
        }
        res.status(200).json({ message: "Contact deleted successfully" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
}

startServer();
