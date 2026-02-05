import { Book } from "./books";

export type List = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  books: Book[];
  hasBook?: boolean
};

export type GetListsResponse = {
  lists: List[];
};