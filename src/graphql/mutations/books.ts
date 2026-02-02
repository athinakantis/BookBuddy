import { gql } from "@apollo/client";

const ADD_BOOK = gql`
  mutation AddBook($input: AddBookInput!) {
    addBook(input: $input) {
      id
      title
      status
      author {
        name
      }
    }
  }
`;

const REMOVE_BOOK = gql`
  mutation RemoveBook($bookId: ID!) {
    removeBook(bookId: $bookId)
  }
`;

const UPDATE_BOOK = gql`
  mutation UpdateBook($input: UpdateBookInput!) {
    updateBook(input: $input) {
      id
      title
      status
      author {
        name
      }
    }
  }
`;

const UPDATE_BOOK_STATUS = gql`
  mutation updateBookStatus($status: BookStatus!, $bookId: ID!) {
    updateBookStatus(status: $status, bookId: $bookId)
  }
`;

export { ADD_BOOK, REMOVE_BOOK, UPDATE_BOOK, UPDATE_BOOK_STATUS };
