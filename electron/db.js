import Database from "better-sqlite3";

export const db = new Database("books.db");

// TODO: add created_at, finished_at and started_at timestamps to books
db.exec(`
  CREATE TABLE IF NOT EXISTS authors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    status TEXT NOT NULL,
    rating INTEGER,
    review VARCHAR(500) DEFAULT NULL,
    author_id INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    started_at TEXT DEFAULT NULL,
    finished_at TEXT DEFAULT NULL,
    FOREIGN KEY (author_id) REFERENCES authors(id)
  );
`);

const authorCount = db
  .prepare("SELECT COUNT(*) as count FROM authors")
  .get().count;

if (authorCount === 0) {
  db.prepare("INSERT INTO authors (name) VALUES (?)").run("George Orwell");
  db.prepare("INSERT INTO authors (name) VALUES (?)").run("J.K. Rowling");

  db.prepare(
    "INSERT INTO books (title, status, author_id) VALUES (?, ?, ?)"
  ).run("1984", "READ", 1);
  db.prepare(
    "INSERT INTO books (title, status, author_id) VALUES (?, ?, ?)"
  ).run("Harry Potter", "UNREAD", 2);
}

export default db;
