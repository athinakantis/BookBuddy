const typeDefs = `#graphql
    type Book {
      id: ID!
      title: String!
      status: BookStatus!
      author: Author!
      rating: Int
      review: String
      created_at: String!
      started_at: String
      finished_at: String
    }

    type Author {
      id: ID!
      name: String!
      books: [Book!]!
      totalCount: Int!
    }

    type List {
      id: ID!
      name: String!
      description: String
      created_at: String
      updated_at: String
      books: [Book!]!
      hasBook(bookId: ID): Boolean!
      is_favorite: Boolean!
    }

    type ListBook {
      list_id: ID!
      book_id: ID!
      position: Int
      added_at: String
    }

    input ListFilter {
      isFavorite: Boolean
    }

    type GetBooksResponse {
      total: Int!
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
      created_at: String
      started_at: String
      finished_at: String
    }

    input RateBookInput {
      bookId: ID!
      rating: Int!
    }

    type GetAuthorsResponse {
      totalCount: Int!
      items: [Author!]
    }


    type Query {
      books(
        filter: BookFilterInput
        orderBy: BookOrderInput
        limit: Int
        offset: Int
      ): GetBooksResponse!
      authors(search: String limit: Int page: Int): GetAuthorsResponse!
      list(id: ID!, bookId: ID): List!
      lists(limit: Int offset: Int, bookId: ID, filter: ListFilter): [List]
      book(id: ID!): Book
      booksByStatus(status: BookStatus!): [Book!]!
      distinctAuthors: Int
      readBookCount: Int
      readBookYearCount: Int

    }

    type Mutation {
      addBook(input: AddBookInput!): Book!
      updateBook(input: UpdateBookInput!): Book!
      booksByStatus(status: BookStatus!): [Book!]!
      createList(name: String!, description: String): List
      removeList(id: ID!): Boolean
      updateList(id: ID! name: String description: String): List
      removeBook(bookId: ID!): Boolean
      addAuthor(name: String!): Author
      rateBook(input: RateBookInput!): Book!
      removeAuthor(authorId: ID!): Boolean
      updateAuthor(authorId: ID! bookId: ID!): Book!
      updateBookStatus(status: BookStatus! bookId: ID!): Boolean
      addToList(listId: ID!, bookId: ID!): Boolean
      removeFromList(listId: ID!, bookId: ID!): Boolean
    }
  `;

export default typeDefs;
