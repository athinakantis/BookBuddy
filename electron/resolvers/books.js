import db from "../db.js";

const addBook = (_, { input: { title, authorId, status, rating, review } }) => {
  const result = db
    .prepare(
      "INSERT INTO books (title, status, author_id, rating) VALUES (?, ?, ?, ?)",
    )
    .run(title, status, authorId, rating);

  return db
    .prepare("SELECT * FROM books WHERE id = ?")
    .get(result.lastInsertRowid);
};

const updateBook = async (
  _,
  {
    input: {
      id,
      title,
      authorId,
      status,
      rating,
      review,
      started_at,
      finished_at,
      created_at,
    },
  },
) => {
  const book = db.prepare("SELECT * FROM books WHERE id = ?").get(id);

  if (!book) throw new Error("Book not found");

  const updates = [];
  const params = [];

  if (title !== undefined) {
    updates.push("title = ?");
    params.push(title);
  }

  if (status !== undefined) {
    updates.push("status = ?");
    params.push(status);
  }

  if (rating !== null) {
    if (rating < 1 || rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }
    updates.push("rating = ?");
    params.push(rating);
  }

  if (review !== null) {
    if (review.length < 1 || review.length > 500) {
      throw new Error("Review is too short or too long");
    }
    updates.push("review = ?");
    params.push(review);
  }

  if (authorId !== undefined) {
    updates.push("author_id = ?");
    params.push(authorId);
  }

  if (started_at !== undefined) {
    updates.push("started_at = ?");
    params.push(started_at);
  }
  
  if (created_at !== undefined) {
    updates.push("created_at = ?");
    params.push(created_at);
  }

  if (finished_at !== undefined) {
    updates.push("finished_at = ?");
    params.push(finished_at);
  }

  if (updates.length === 0) return book;

  params.push(id);
  const sql = `UPDATE books SET ${updates.join(", ")} WHERE id = ?`;
  db.prepare(sql).run(...params);

  return db.prepare("SELECT * FROM books WHERE id = ?").get(id);
};

const removeBook = (_, { bookId }) => {
  db.prepare("DELETE FROM books WHERE id = ?").run(bookId);
  return true;
};

const updateBookStatus = (_, { status, bookId }) => {
  const book = db.prepare("SELECT status FROM books WHERE id = ?").get(bookId);
  if (!book) throw new Error("Book not found");

  const now = db.prepare("SELECT datetime('now') AS now").get().now;

  let sql = "UPDATE books SET status = ?";
  const params = [status];

  if (status === "UNREAD") {
    sql += ", started_at = NULL, finished_at = NULL";
  }

  if (status === "READING") {
    // Only set started_at if transitioning from UNREAD
    if (book.status === "UNREAD") {
      sql += ", started_at = ?";
      params.push(now);
    }
    sql += ", finished_at = NULL";
  }

  if (status === "READ") {
    // Ensure started_at exists
    if (!book.started_at) {
      sql += ", started_at = ?";
      params.push(now);
    }
    sql += ", finished_at = ?";
    params.push(now);
  }

  sql += " WHERE id = ?";
  params.push(bookId);

  db.prepare(sql).run(...params);

  return db.prepare("SELECT * FROM books WHERE id = ?").get(bookId);
};

const books = (_, { filter, orderBy, limit, offset }) => {
  let whereSql = "";
  const whereParams = [];

  // FILTERS
  if (filter) {
    const conditions = [];

    if (filter.status) {
      conditions.push("status = ?");
      whereParams.push(filter.status);
    }

    if (filter.authorId) {
      conditions.push("author_id = ?");
      whereParams.push(filter.authorId);
    }

    if (conditions.length) {
      whereSql = " WHERE " + conditions.join(" AND ");
    }
  }

  // TOTAL COUNT (no pagination)
  const countSql = `SELECT COUNT(*) as total FROM books${whereSql}`;
  const { total } = db.prepare(countSql).get(...whereParams);

  // DATA QUERY
  let dataSql = `SELECT * FROM books${whereSql}`;
  const dataParams = [...whereParams];

  // ORDER BY (allow-list only)
  if (orderBy) {
    const orderMap = {
      CREATED_AT: "created_at",
      TITLE: "title",
      RATING: "rating",
      FINISHED_AT: "finished_at",
    };

    const column = orderMap[orderBy.field];
    const direction = orderBy.direction === "ASC" ? "ASC" : "DESC";

    if (column) {
      dataSql += ` ORDER BY ${column} ${direction}`;
    }
  }

  // PAGINATION
  if (typeof limit === "number") {
    dataSql += " LIMIT ?";
    dataParams.push(limit);
  }

  if (typeof offset === "number") {
    dataSql += " OFFSET ?";
    dataParams.push(offset);
  }

  const rows = db.prepare(dataSql).all(...dataParams);

  return {
    total,
    books: rows,
  };
};

const book = (_, { id }) => {
  return db.prepare("SELECT * FROM books WHERE id = ?").get(id);
};

const booksByStatus = (_, { status }) => {
  return db.prepare("SELECT * FROM books WHERE status = ?").all(status);
};

export default {
  Query: {
    books,
    book,
    booksByStatus,
  },
  Mutations: {
    addBook,
    updateBook,
    removeBook,
    updateBookStatus,
  },
  Book: {
    author: (book) => {
      return db
        .prepare("SELECT * FROM authors WHERE id = ?")
        .get(book.author_id);
    },
  },
};
