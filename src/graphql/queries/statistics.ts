import { gql } from "@apollo/client";

export const GET_STATISTICS = gql`
  query Query {
    readBookCount
    distinctAuthors
    readBookYearCount
  }
`;
