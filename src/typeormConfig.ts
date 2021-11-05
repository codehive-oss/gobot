import config from "../ormconfig.json";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./constants";

export const typeormOrmConfig: PostgresConnectionOptions = {
  ...config,
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
};
