import AuthorResolvers from "./resolvers/authors.js";
import BookResolvers from "./resolvers/books.js";
import StatisticResolvers from "./resolvers/statistics.js";

const resolvers = {
  Query: {
    ...BookResolvers.Query,
    ...AuthorResolvers.Query,
    ...StatisticResolvers.Query,
  },

  Mutation: {
    ...BookResolvers.Mutations,
    ...AuthorResolvers.Mutations,
  },

  Book: {
    ...BookResolvers.Book,
  },

  Author: {
    ...AuthorResolvers.Author,
  },
};

export default resolvers;
