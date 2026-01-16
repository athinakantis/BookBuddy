import { AddBookInput } from "@/types/books";

export const initialBookValues: AddBookInput = {
  title: "",
  authorId: "",
  status: "UNREAD",
  rating: undefined,
  review: undefined
};