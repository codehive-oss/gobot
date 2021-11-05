import "reflect-metadata";
import { createConnection } from "typeorm";
import { client } from "./client";
import { TOKEN } from "./constants";
import { typeormOrmConfig } from "./typeormConfig";

createConnection(typeormOrmConfig);
client.login(TOKEN);
