import db from "../db.js";

const addAuthor = (_, { name }) => {
  const result = db.prepare("INSERT INTO authors (name) VALUES (?)").run(name);

  return db
    .prepare("SELECT id, name FROM authors WHERE id = ?")
    .get(result.lastInsertRowid);
};

const removeAuthor = (_, { authorId }) => {
  db.prepare("DELETE FROM authors WHERE id = ?").run(authorId);
  return true;
};

const updateAuthor = (_, { authorId, bookId }) => {
  const result = db.prepare("SELECT author_id, WHERE id = ?").run(bookId);
  if (authorId === result.author_id)
    throw new GraphQLError("New author cannot be the same as previous author");

  return db
    .prepare("UPDATE books SET author_id = ? WHERE id = ?")
    .run(authorId, bookId);
};

const authors = () => {
  return db.prepare("SELECT * FROM authors").all();
};

export default {
  Query: {
    authors,
  },
  Mutations: {
    addAuthor,
    removeAuthor,
    updateAuthor,
  },
  Author: {
    books: (author) => {
      return db
        .prepare("SELECT * FROM books WHERE author_id = ?")
        .all(author.id);
    },
  },
};
