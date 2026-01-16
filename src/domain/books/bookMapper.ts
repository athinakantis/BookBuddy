import { Book, UpdateBookInput } from "@/types/books";

export const mapBookToForm = (book: Book): UpdateBookInput => {
  const {
    author: { id: authorId },
    created_at,
    started_at,
    finished_at,
    review,
    ...rest
  } = book;
  return {
    authorId,
    review,
    ...rest,
  };
};
