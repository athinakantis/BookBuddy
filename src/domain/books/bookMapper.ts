import { Book, UpdateBookInput } from "@/types/books";

export const mapBookToForm = (book: Book): UpdateBookInput => {
  const {
    author,
    created_at,
    started_at,
    finished_at,
    ...rest
  } = book;


  return {
    author: {
      id: author.id,
      name: author.name ?? ""
    },
    ...rest,
  };
};
