import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./schema.js";
import resolvers from "./resolvers.js";
import logger from "./logger.js";

export async function startGraphQL() {
  const server = new ApolloServer({ typeDefs, resolvers });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  logger.info({ url }, "GraphQL running");
}
