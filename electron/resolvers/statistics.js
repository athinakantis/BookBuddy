import db from "../db.js";

// Get amount of authors user has read at least one book from
const distinctAuthors = () => {
  const result = db
    .prepare(`SELECT COUNT(DISTINCT author_id) AS count FROM books WHERE status = 'READ'`)
    .get();
  return result.count;
};

// Get total amount of read books
const readBookCount = () => {
  const result = db
    .prepare(
      `SELECT COUNT(*) AS total_read_books FROM books WHERE status = 'READ'`,
    )
    .get();
  return result.total_read_books;
};

// Get amount of books read this year
const readBookYearCount = () => {
  const THIS_YEAR = new Date().getFullYear();

  const result = db
    .prepare(
      `SELECT COUNT(*) AS yearly_read_books 
       FROM books 
       WHERE status = 'READ' 
       AND finished_at LIKE ?`,
    )
    .get(`%${THIS_YEAR}%`);

  return result ? result.yearly_read_books : 0;
};

export default {
  Query: {
    distinctAuthors,
    readBookCount,
    readBookYearCount
  },
};
