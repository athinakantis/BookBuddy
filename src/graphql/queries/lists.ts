import { gql } from "@apollo/client";

const GET_LIST = gql`
  query list($id: ID!) {
    id
    name
    description
    created_at
    updated_at
    books {
      title
      status
      id
      rating
    }
  }
`;

const GET_LISTS = gql`
  query lists($limit: Int, $offset: Int) {
    id
    name
    updated_at
    description
  }
`;

export { GET_LIST, GET_LISTS };
