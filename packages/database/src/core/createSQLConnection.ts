import { GoServer } from "../entities/GoServer";
import { GoUser } from "../entities/GoUser";
import { ReactionRoleMessage } from "../entities/moderation/ReactionRoleMessage";
import { logger } from "@gobot/logger";
import { createConnection } from "typeorm";
import ormConfig from "../ormconfig";

export const createSQLConnection = async () => {
  logger.info("Creating SQL connection...");
  await createConnection(ormConfig);
  logger.info(
    `SQL connection on ${ormConfig.host}:${ormConfig.port} connected`,
  );

  logger.info(`Found ${await GoUser.count()} users in database`);
  logger.info(`Found ${await GoServer.count()} servers in database`);
  logger.info(
    `Found ${await ReactionRoleMessage.count()} reaction role messages in database`,
  );
};
