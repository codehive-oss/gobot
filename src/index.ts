import "reflect-metadata";
import { createConnection } from "typeorm";
import { client } from "./client";
import { TOKEN } from "./constants";
import { typeormOrmConfig } from "./typeormConfig";

async function main() {
    await createConnection(typeormOrmConfig);
    await client.login(TOKEN);

}

main().catch(err => {
    console.error(err)
})



