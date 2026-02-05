import { gql } from "@apollo/client";

const GET_LIST = gql`
  query List($id: ID!, $bookId: ID) {
    list(id: $id) {
      id
      name
      description
      created_at
      updated_at
      books {
        id
        title
        rating
        review
        status
        author {
          id
          name
        }
      }
      is_favorite
      hasBook(bookId: $bookId)
    }
  }
`;

const GET_LISTS = gql`
  query Lists($limit: Int, $offset: Int, $bookId: ID, $filter: ListFilter) {
    lists(limit: $limit, offset: $offset, bookId: $bookId, filter: $filter) {
      id
      name
      updated_at
      description
      is_favorite
      hasBook(bookId: $bookId)
      books {
        title
        rating
        id
        author {
          name
          id
        }
      }
    }
  }
`;

export { GET_LIST, GET_LISTS };
