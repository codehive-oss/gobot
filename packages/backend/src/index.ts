import "reflect-metadata";
import { client } from "./utils/client";
import { API_PORT, TOKEN } from "./utils/constants";
import { createAPI } from "./utils/createAPI";
import logger from "./utils/logger";

async function main() {
  const api = await createAPI();

  client.login(TOKEN);
  api.listen(API_PORT, () => logger.info(`API listening on port ${API_PORT}`));
}

main().catch((err) => {
  logger.error(err);
});
