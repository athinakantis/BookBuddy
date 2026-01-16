import { createHashRouter } from "react-router-dom";

import Root from "../layout/Root";
import BookForm from "@/components/BookForm";
import Home from "@/pages/Home";
import List from "@/pages/List";
import Book from "@/pages/Book";
import EditBook from "@/pages/EditBook";

// TODO: define routes
export const router = createHashRouter([
  {
    path: "/",
    element: <Root />,

    children: [
      { path: "/", element: <Home /> },
      { path: "/book/:bookId", element: <Book /> },
      { path: "/book/:bookId/edit", element: <EditBook /> },
      { path: "/books/new", element: <EditBook /> },
      { path: "/lists/:status", element: <List /> },
    ],
  },
]);
