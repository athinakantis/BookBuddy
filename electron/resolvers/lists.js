import db from "../db.js";

const createList = (_, { name, description }) => {
  const result = db
    .prepare("INSERT INTO lists (name, description) VALUES (?, ?)")
    .run(name, description);

  return db
    .prepare("SELECT * FROM lists WHERE id = ?")
    .get(result.lastInsertRowid);
};

const removeList = (_, { id }) => {
  db.prepare("DELETE FROM lists WHERE id = ?").run(id);
  return true;
};

const updateList = (_, { id, name, description }) => {
  if (!name && !description) throw new Error("Missing updated details");
  db.prepare(
    "UPDATE lists SET name = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
  ).run(name, description, id);

  return db.prepare("SELECT * FROM lists WHERE id = ?").get(id);
};

const list = (_, { id }) => {
  return db.prepare("SELECT * FROM lists WHERE id = ?").get(id);
};

const lists = (_, { limit = 10, offset = 0 }) => {
  return db.prepare("SELECT * FROM lists LIMIT ? OFFSET ?").all(limit, offset);
};

const addToList = (_, { listId, bookId }) => {
  return db
    .prepare("INSERT INTO list_books (list_id, book_id) VALUES (?,?)")
    .run(listId, bookId);
};

const removeFromList = (_, { listId, bookId }) => {
  const result = db
    .prepare("DELETE FROM list_books WHERE book_id = ? AND list_id = ?")
    .run(bookId, listId);

  return result.changes > 0;
};

export default {
  Query: {
    list,
    lists,
  },
  Mutations: {
    removeList,
    createList,
    updateList,
    addToList,
    removeFromList,
  },
  List: {
    books: (list) => {
      const listBooksResult = db
        .prepare("SELECT * FROM list_books WHERE list_id = ?")
        .all(list.id);
      const bookIds = listBooksResult.map((row) => row.book_id);
      const placeholders = bookIds.map(() => "?").join(",");

      const books = db
        .prepare(`SELECT * FROM books WHERE id IN (${placeholders})`)
        .all(...bookIds);

      return books;
    },
  },
};
