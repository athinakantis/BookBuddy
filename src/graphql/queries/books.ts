import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
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

export const GET_BOOK = gql`
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

export const GET_BOOKS_BY_STATUS = gql`
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
