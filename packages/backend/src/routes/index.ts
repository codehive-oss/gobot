import { Router } from "express";
import { GraphQLSchema } from "graphql";
import { MyContext } from "@utils/types";
import { __prod__ } from "@utils/constants";
import { authRouter } from "./auth";
import { graphqlHTTP } from "express-graphql";
import graphqlPlayground from "graphql-playground-middleware-express";

export const createRouter = (schema: GraphQLSchema): Router => {
  const router = Router();

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

  router.get("/", (_req, res) => {
    res.send("Hello World!");
  });

  router.use("/auth", authRouter);

  return router;
};
