import "reflect-metadata";
import { client } from "@gobot/discord";
import { API_PORT, TOKEN } from "@gobot/environment";
import { createAPI } from "@gobot/api";
import { logger } from "@gobot/logger";

async function main() {
  const api = await createAPI();

  client.login(TOKEN);
  api.listen(API_PORT, () => logger.info(`API listening on port ${API_PORT}`));
}

main().catch((err) => {
  logger.error(err);
});
