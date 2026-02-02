import { gql } from "@apollo/client";

const GET_BOOKS = gql`
  query books(
    $filter: BookFilterInput
    $orderBy: BookOrderInput
    $limit: Int
    $offset: Int
  ) {
    books(filter: $filter, orderBy: $orderBy, limit: $limit, offset: $offset) {
      books {
        id
        title
        status
        rating
        author {
          id
          name
        }
      }
      total
    }
  }
`;

const GET_BOOK = gql`
  query ($bookId: ID!) {
    book(id: $bookId) {
      title
      id
      rating
      status
      review
      created_at
      finished_at
      started_at
      author {
        id
        name
      }
    }
  }
`;

const GET_BOOKS_BY_STATUS = gql`
  query ($status: BookStatus!) {
    booksByStatus(status: $status) {
      id
      title
      rating
      status
      created_at
      finished_at
      started_at
      author {
        id
        name
      }
    }
  }
`;

export { GET_BOOK, GET_BOOKS, GET_BOOKS_BY_STATUS };
