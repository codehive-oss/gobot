import "reflect-metadata";
import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import graphqlPlayground from "graphql-playground-middleware-express";
import { MyContext } from "./types";
import { typeormOrmConfig } from "./typeormConfig";
import { DiscordServerResolver } from "../db/resolvers/DiscordServerResolver";
import { CommandResolver } from "../db/resolvers/CommandResolver";
import logger from "./logger";
import morgan from "morgan";

export const createAPI = async () => {
  logger.info("Creating SQL connection...");
  const conn = await createConnection(typeormOrmConfig);
  await conn.runMigrations();

  logger.info("Building graphql schema...");
  const schema = await buildSchema({
    resolvers: [CommandResolver, DiscordServerResolver],
    validate: false,
  });

  logger.info("Initializing express app...");
  const app = express();
  app.set("trust proxy", 1);

  app.use(morgan("tiny"));
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
