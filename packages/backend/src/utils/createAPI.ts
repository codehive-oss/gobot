import "reflect-metadata";
import express from "express";
import cors from "cors";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { typeormOrmConfig } from "./ormconfig";
import { DiscordServerResolver } from "../db/resolvers/DiscordServerResolver";
import { CommandResolver } from "../db/resolvers/CommandResolver";
import { GoUserResolver } from "../db/resolvers/GoUserResolver";
import { expressLogger, logger } from "./logger";
import passport from "passport";
import { COOKIE_NAME, SESSION_SECRET, __prod__ } from "./constants";
import { createRouter } from "../routes";
import expressSession from "express-session";

export const createAPI = async () => {
  logger.info("Creating SQL connection...");
  const conn = await createConnection(typeormOrmConfig);
  await conn.runMigrations();
  logger.info(
    `SQL connection on ${typeormOrmConfig.host}:${typeormOrmConfig.port} connected`
  );

  logger.info("Building graphql schema...");
  const schema = await buildSchema({
    resolvers: [CommandResolver, DiscordServerResolver, GoUserResolver],
    validate: false,
  });

  logger.info("Initializing express app...");
  const app = express();

  if (__prod__) app.set("trust proxy", 1);

  app.use(expressLogger);
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // TODO: use redis
  app.use(
    expressSession({
      name: COOKIE_NAME,
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      proxy: true,
      cookie: {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 14, // 2 weeks
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const router = createRouter(schema);
  app.use("/api", router);

  return app;
};
