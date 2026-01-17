const typeDefs = `#graphql
    type Book {
      id: ID!
      title: String!
      status: BookStatus!
      author: Author!
      rating: Int,
      review: String,
      created_at: String!,
      started_at: String,
      finished_at: String
    }

    type Author {
      id: ID!
      name: String!
      books: [Book!]!,
      bookCount: Int!
    }


    type GetBooksResponse {
      total: Int!,
      books: [Book!]
    }
    
    enum BookOrderBy {
      CREATED_AT
      TITLE
      RATING
      FINISHED_AT
    }

    enum OrderDirection {
      ASC
      DESC
    }
    input BookFilterInput {
      status: BookStatus
      authorId: ID
    }

    input BookOrderInput {
      field: BookOrderBy!
      direction: OrderDirection = DESC
    }

    enum BookStatus {
      READ
      UNREAD
      READING
    }

    input AddBookInput {
      title: String!
      authorId: ID!
      status: BookStatus!
      rating: Int
      review: String
    }

    input UpdateBookInput {
      id: ID!
      title: String
      authorId: ID
      status: BookStatus
      rating: Int
      review: String
    }

    input RateBookInput {
      bookId: ID!,
      rating: Int!
    }



    type Query {
      books(
        filter: BookFilterInput
        orderBy: BookOrderInput
        limit: Int
        offset: Int
      ): GetBooksResponse!
      authors: [Author!]!
      book(id: ID!): Book,
      booksByStatus(status: BookStatus!): [Book!]!
    }

    type Mutation {
      addBook(input: AddBookInput!): Book!
      updateBook(input: UpdateBookInput!): Book!
      booksByStatus(status: BookStatus!): [Book!]!,
      removeBook(bookId: ID!): Boolean,
      addAuthor(name: String!): Author,
      rateBook(input: RateBookInput!): Book!,
      removeAuthor(authorId: ID!): Boolean,
      updateAuthor(authorId: ID!, bookId: ID!): Book!,
      updateBookStatus(status: BookStatus!, bookId: ID!): Boolean,
    }

  `;

export default typeDefs;
