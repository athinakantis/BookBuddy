import { Author } from "./authors";

export type BookStatus = "READ" | "UNREAD" | "READING";

export interface Book {
  id: string;
  title: string;
  status: BookStatus;
  author: Author;
  rating?: number;
  created_at: string;
  review?: string;
  started_at?: string;
  finished_at?: string;
}

export interface GetBooksData {
  books: Book[];
}

export interface GetBookData {
  book: Book;
}

export interface AddBookInput {
  title: string;
  authorId: string;
  status: BookStatus;
  rating?: number;
  review?: string;
}

export interface UpdateBookInput extends AddBookInput {
  id: string;
}

export interface AddBookData {
  addBook: Book;
}

export type BookOrderBy = "CREATED_AT" | "TITLE" | "RATING" | "FINISHED_AT";
export type OrderDirection = "ASC" | "DESC";
export type BookFilterInput = Partial<{
  status: BookStatus;
  authorId: string;
}>;

