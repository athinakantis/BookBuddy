import { gql } from "@apollo/client";

const ADD_AUTHOR = gql`
  mutation AddAuthor($name: String!) {
    addAuthor(name: $name) {
      id
      name
    }
  }
`;

const REMOVE_AUTHOR = gql`
  mutation RemoveAuthor($id: ID!) {
    removeAuthor(authorId: $id)
  }
`;

export { REMOVE_AUTHOR, ADD_AUTHOR };
