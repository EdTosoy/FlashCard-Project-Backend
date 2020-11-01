import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

const main = async () => {
  await createConnection();
  const app = express();

  const schema = await buildSchema({
    resolvers: [__dirname + "/resolvers/**/*.ts"],
    authChecker: ({ context: { req } }) => {
      if (!req.session!.userId) {
        return false;
      }
      return true;
    },
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(
      `Server ready at http://localhost:4000${apolloServer.graphqlPath}`
    );
  });
};

try {
  main();
} catch (err) {
  console.error(err);
}
