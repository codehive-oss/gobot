import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  __prod__,
} from "@gobot/environment";
import { join } from "path";
import { PinoTypeormLogger, logger } from "@gobot/logger";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export default {
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: false,
  logging: true,
  logger: new PinoTypeormLogger(logger),
  entities: [join(__dirname, "entities", "**", "*.{ts,js}")],
  migrations: [join(__dirname, "migrations", "**", "*.{ts,js}")],
  subscribers: [join(__dirname, "subscribers", "**", "*.{ts,js}")],
  cli: {
    entitiesDir: join(__dirname, "entities"),
    migrationsDir: join(__dirname, "migrations"),
    subscribersDir: join(__dirname, "subscribers"),
  },
} as PostgresConnectionOptions;
