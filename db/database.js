import Database from "better-sqlite3";

const db = new Database('database.db');
// activer les clés étrangères
db.pragma('foreign_keys = ON');


export default db;