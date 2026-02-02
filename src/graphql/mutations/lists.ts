import { gql } from "@apollo/client";

const CREATE_LIST = gql`
  mutation CreateList($name: String, $description: String) {
    createList(name: $name, description: $description) {
      id
      description
      name
    }
  }
`;

const REMOVE_LIST = gql`
  mutation RemoveList($id: ID!) {
    removeBook(id: $id)
  }
`;

const UPDATE_LIST = gql`
  mutation UpdateList($updateListId: ID!, $name: String, $description: String) {
    updateList(id: $updateListId, name: $name, description: $description) {
      description
      id
      name
      updated_at
    }
  }
`;

const ADD_TO_LIST = gql`
  mutation AddToList($listId: ID!, $bookId: ID!) {
    addToList(listId: $listId, bookId: $bookId)
  }
`;

const REMOVE_FROM_LIST = gql`
  mutation RemoveFromList($listId: ID!, $bookId: ID!) {
    removeFromList(listId: $listId, bookId: $bookId)
  }
`;

export { CREATE_LIST, UPDATE_LIST, REMOVE_LIST, ADD_TO_LIST, REMOVE_FROM_LIST };
