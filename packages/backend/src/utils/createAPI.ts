import "reflect-metadata";
import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import graphqlPlayground from "graphql-playground-middleware-express";
import { MyContext } from "./types";
import { typeormOrmConfig } from "./ormconfig";
import { DiscordServerResolver } from "../db/resolvers/DiscordServerResolver";
import { CommandResolver } from "../db/resolvers/CommandResolver";
import { GoUserResolver } from "../db/resolvers/GoUserResolver";
import logger from "./logger";
import morgan from "morgan";
import { router } from "../routes/auth";
import passport from "passport";
import { COOKIE_NAME, SESSION_SECRET, __prod__ } from "./constants";
import cookieSession from "cookie-session";

export const createAPI = async () => {
  logger.info("Creating SQL connection...");
  const conn = await createConnection(typeormOrmConfig);
  await conn.runMigrations();

  logger.info("Building graphql schema...");
  const schema = await buildSchema({
    resolvers: [CommandResolver, DiscordServerResolver, GoUserResolver],
    validate: false,
  });

  logger.info("Initializing express app...");
  const app = express();
  app.set("trust proxy", 1);

  app.use(morgan("tiny"));
  app.use(
    cors({
      origin: ["http://localhost:3000", "https://go-bot.xyz"],
      credentials: true,
    })
  );
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(
    cookieSession({
      secret: SESSION_SECRET,
      name: COOKIE_NAME,
      secure: __prod__,
      sameSite: "lax",
      // expires and maxAge are set in the cookie-session package
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

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

  app.use("/auth", router);

  return app;
};
