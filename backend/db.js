// db.js
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const path = require("path");

// Open database with sqlite promise wrapper
async function initDB() {
  const db = await open({
    filename: path.join(__dirname, "contacts.db"),
    driver: sqlite3.Database,
  });
  
  
  
  await db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL UNIQUE
    )
  `);

  return db;
}

module.exports = initDB();
