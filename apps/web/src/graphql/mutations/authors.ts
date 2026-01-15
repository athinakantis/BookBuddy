import { gql } from "@apollo/client";

export const ADD_AUTHOR = gql`
  mutation AddAuthor($name: String!) {
    addAuthor(name: $name) {
      id
      name
    }
  }
`;