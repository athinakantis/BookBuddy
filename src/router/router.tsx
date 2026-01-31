import { createHashRouter } from "react-router-dom";

import Root from "../layout/Root";
import Home from "@/pages/Home";
import List from "@/pages/List";
import Book from "@/pages/Book";
import EditBook from "@/pages/EditBook";

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
