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

const updateList = (_, { id, name, description, isFavorite }) => {
  if (!name && !description) throw new Error("Missing updated details");
  const updates = [];
  const params = [];

  if (name !== undefined) {
    updates.push("name = ?");
    params.push(name);
  }
  if (description !== undefined) {
    updates.push("description = ?");
    params.push(description);
  }

  if (isFavorite !== undefined) {
    updates.push("is_favorite = ?");
    params.push(isFavorite === true ? 1 : 0);
  }

  params.push(id);
  const sql = `UPDATE lists SET ${updates.join(", ")} WHERE id = ?`;
  db.prepare(sql).run(...params);

  return db.prepare("SELECT * FROM lists WHERE id = ?").get(id);
};

const list = (_, { id }) => {
  return db.prepare("SELECT * FROM lists WHERE id = ?").get(id);
};

const lists = (_, { limit = 10, offset = 0, bookId, filter }) => {
  let whereSql = "";
  const whereParams = [];

  if (filter) {
    const conditions = [];
    if (filter.isFavorite) {
      conditions.push("is_favorite = ?");
      whereParams.push(filter.isFavorite === true ? 1 : 0);
    }

    if (conditions.length) {
      whereSql = "WHERE " + conditions.join(" AND ");
    }
  }

  // DATA QUERY
  let dataSql = `SELECT * FROM lists ${whereSql} LIMIT ? OFFSET ?`;
  const dataParams = [...whereParams, limit, offset];

  const rows = db.prepare(dataSql).all(...dataParams);

  // Attach bookId to each list
  return rows.map((list) => ({
    ...list,
    _bookId: bookId ?? null,
  }));
};

const addToList = (_, { listId, bookId }) => {
  const result = db
    .prepare("INSERT INTO list_books (list_id, book_id) VALUES (?,?)")
    .run(listId, bookId);

  return result.changes > 0;
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
      return db
        .prepare(
          `
        SELECT b.*
        FROM books b
        JOIN list_books lb ON lb.book_id = b.id
        WHERE lb.list_id = ?
      `,
        )
        .all(list.id);
    },

    hasBook: (list) => {
      if (!list._bookId) return false;

      const row = db
        .prepare(
          "SELECT 1 FROM list_books WHERE list_id = ? AND book_id = ? LIMIT 1",
        )
        .get(list.id, list._bookId);

      return !!row;
    },
  },
};
