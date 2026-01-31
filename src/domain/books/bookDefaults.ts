import { AddBookInput } from "@/types/books";

type BookFormInput = Omit<AddBookInput, "authorId"> & {
  author: {
    id: string,
    name: string,
  }
}

export const initialBookValues: BookFormInput = {
  title: "",
  author: {
    id: "",
    name: "",
  },
  status: "UNREAD",
  rating: undefined,
  review: null,
};