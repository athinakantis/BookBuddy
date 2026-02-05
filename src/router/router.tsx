import { createHashRouter } from "react-router-dom";

import Root from "../layout/Root";
import Home from "@/pages/Home";
import List from "@/pages/List";
import Book from "@/pages/Book";
import BookForm from "@/pages/BookForm";
import GeneralError from "@/pages/Error";

export const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <GeneralError />,

    children: [
      { path: "/", element: <Home /> },
      { path: "/book/:bookId", element: <Book /> },
      { path: "/book/:bookId/edit", element: <BookForm /> },
      { path: "/books/new", element: <BookForm /> },
      { path: "/books/status/:status", element: <List /> },
      { path: "/lists/:listId", element: <List /> },
    ],
  },
]);
