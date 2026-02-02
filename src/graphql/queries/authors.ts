import { gql } from "@apollo/client";

const GET_AUTHORS = gql`
  query ($search: String, $page: Int, $limit: Int) {
    authors(search: $search, page: $page, limit: $limit) {
      items {
        id
        name
      }
      totalCount
    }
  }
`;

export { GET_AUTHORS };
