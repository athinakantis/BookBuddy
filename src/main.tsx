import ReactDOM from "react-dom/client";

import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { RemoveTypenameFromVariablesLink } from "@apollo/client/link/remove-typename";

import { RouterProvider } from "react-router-dom";
import { UIProvider } from "./context/UIProvider.tsx";
import "./index.css";
import { router } from "./router/router.tsx";
import { ApolloProvider } from "@apollo/client/react";

const removeTypenameLink = new RemoveTypenameFromVariablesLink();
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
