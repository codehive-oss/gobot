import { Router } from "express";
import { GraphQLSchema } from "graphql";
import { MyContext } from "../utils/types";
import { __prod__ } from "@gobot/environment";
import { authRouter } from "./auth";
import { graphqlHTTP } from "express-graphql";
import graphqlPlayground from "graphql-playground-middleware-express";
import { expressLogger } from "@gobot/logger";

export const createRouter = (schema: GraphQLSchema): Router => {
  const router = Router();

  router.get("/", (_req, res) => {
    res.send("Hello World!");
  });

  router.use(expressLogger);

  // Add graphql playground when in development
  if (!__prod__) {
    router.use("/playground", graphqlPlayground({ endpoint: "/graphql" }));
  }

  router.use(
    "/graphql",
    graphqlHTTP((req, res, _graphQLParams) => {
      const context: MyContext = { req, res };
      return {
        schema,
        context,
      };
    })
  );

  router.use("/auth", authRouter);

  return router;
};
