import AuthorResolvers from "./resolvers/authors.js";
import BookResolvers from "./resolvers/books.js";
import StatisticResolvers from "./resolvers/statistics.js";
import ListResolvers from "./resolvers/lists.js";

const resolvers = {
  Query: {
    ...BookResolvers.Query,
    ...AuthorResolvers.Query,
    ...StatisticResolvers.Query,
    ...ListResolvers.Query,
  },

  Mutation: {
    ...BookResolvers.Mutations,
    ...AuthorResolvers.Mutations,
    ...ListResolvers.Mutations,
  },

  Book: {
    ...BookResolvers.Book,
  },

  Author: {
    ...AuthorResolvers.Author,
  },

  List: {
    ...ListResolvers.List
  }
};

export default resolvers;
