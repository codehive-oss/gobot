import "reflect-metadata";
import express from "express";
import cors from "cors";
import { buildSchema } from "type-graphql";
import { DiscordServerResolver } from "@db/resolvers/DiscordServerResolver";
import { CommandResolver } from "@db/resolvers/CommandResolver";
import { GoUserResolver } from "@db/resolvers/GoUserResolver";
import { expressLogger, logger } from "@utils/logger";
import passport from "passport";
import {
  COOKIE_NAME,
  REDIS_HOST,
  SESSION_SECRET,
  __prod__,
} from "@utils/constants";
import { createRouter } from "../routes";
import expressSession from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import { createSQLConnection } from "./createSQLConnection";

export const createAPI = async () => {
  await createSQLConnection();

  logger.info("Building graphql schema...");
  const schema = await buildSchema({
    resolvers: [CommandResolver, DiscordServerResolver, GoUserResolver],
    validate: false,
  });

  logger.info("Initializing express app...");
  const app = express();
  const RedisStore = connectRedis(expressSession);
  const redis = new Redis(REDIS_HOST);

  app.enable("trust proxy");

  if (!__prod__) app.use(expressLogger);

  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(
    expressSession({
      name: COOKIE_NAME,
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      proxy: true,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
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
