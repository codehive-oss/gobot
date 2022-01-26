import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  __prod__,
} from "@utils/constants";
import { join } from "path";
import { PinoTypeormLogger } from "@utils/PinoLogger";
import { logger } from "@utils/logger";
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
  entities: [join(__dirname, "..", "db", "entities", "**", "*.{ts,js}")],
  migrations: [join(__dirname, "..", "db", "migrations", "**", "*.{ts,js}")],
  subscribers: [join(__dirname, "..", "db", "subscribers", "**", "*.{ts,js}")],
  cli: {
    entitiesDir: join(__dirname, "..", "db", "entities"),
    migrationsDir: join(__dirname, "..", "db", "migrations"),
    subscribersDir: join(__dirname, "..", "db", "subscribers"),
  },
} as PostgresConnectionOptions;
