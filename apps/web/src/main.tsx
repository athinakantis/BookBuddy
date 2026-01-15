import ReactDOM from "react-dom/client";

import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { removeTypenameFromVariables } from "@apollo/client/link/remove-typename";

import { ApolloProvider } from "@apollo/client/react";
import "./index.css"; // <-- Tailwind
import { UIProvider } from "./context/UIProvider.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.tsx";

const removeTypenameLink = removeTypenameFromVariables();
const link = from([
  removeTypenameLink,
  new HttpLink({ uri: "http://localhost:4000" }),
]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <UIProvider>
      <RouterProvider router={router} />
    </UIProvider>
  </ApolloProvider>
);
