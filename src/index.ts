import "reflect-metadata";
import { createConnection } from "typeorm";
import { GoUser } from "./db/entity/GoUser";
import { client } from "./utils/client";
import { TOKEN } from "./utils/constants";
import { typeormOrmConfig } from "./utils/typeormConfig";

async function main() {
  const conn = await createConnection(typeormOrmConfig);
  await conn.runMigrations();

  // GoUser.delete({});

  await client.login(TOKEN);


}

main().catch((err) => {
  console.error(err);
});
