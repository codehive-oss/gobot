
import "reflect-metadata";
import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import graphqlPlayground from "graphql-playground-middleware-express";
import { MyContext } from "./types";
import { typeormOrmConfig } from "./typeormConfig";
import { HelloResolver } from "../db/resolvers/hello";

export const createAPI = async () => {
  const conn = await createConnection(typeormOrmConfig);
  conn.runMigrations();

  const schema = await buildSchema({
    resolvers: [HelloResolver],
    validate: false,
  });

  const app = express();
  app.set("trust proxy", 1);

  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use("/playground", graphqlPlayground({ endpoint: "/graphql" }));
  app.use(
    "/graphql",
    graphqlHTTP((req, res, _graphQLParams) => {
      const context: MyContext = { req, res };
      return {
        schema,
        context,
      };
    })
  );

  app.get("/", (_req, res) => {
    res.send("Hello world!");
  });

  return app;
};
