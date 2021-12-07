import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  __prod__,
} from "./constants";
import { join } from "path";
import { PinoTypeormLogger } from "./PinoLogger";
import { logger } from "./logger";

export const typeormOrmConfig: PostgresConnectionOptions = {
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: true,
  logger: new PinoTypeormLogger(logger),
  entities: [join(__dirname, "..", "db", "entities", "**", "*.{ts,js}")],
  migrations: [join(__dirname, "..", "db", "migrations", "**", "*.{ts,js}")],
  subscribers: [join(__dirname, "..", "db", "subscribers", "**", "*.{ts,js}")],
};
