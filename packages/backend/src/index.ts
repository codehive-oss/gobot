import "reflect-metadata";
import { client } from "./utils/client";
import { API_PORT, TOKEN } from "./utils/constants";
import { createAPI } from "./utils/createAPI";

async function main() {
  const api = await createAPI();

  await client.login(TOKEN);
  api.listen(API_PORT, () => console.log(`API listening on port ${API_PORT}`));
}

main().catch((err) => {
  console.error(err);
});
