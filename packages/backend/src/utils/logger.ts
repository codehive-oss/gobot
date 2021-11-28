import pino from "pino";
import expressPinoLogger from "express-pino-logger";
import pinoPretty from "pino-pretty";
import { buildMode, __prod__ } from "./constants";
import fs from "fs";

const prettifier = pinoPretty({
  colorize: true,
  translateTime: "SYS:standard",
  hideObject: true,
  messageFormat: (log: pino.LogDescriptor) => {
    if (log.req) {
      return `${log.req.method} ${log.req.url}: ${log.responseTime}ms - [${log.res.statusCode}] ${log.msg}`;
    }
    return `${log.msg}`;
  },
}) as any;

const logsDir = `./logs`;
if (__prod__ && !fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

export const logger = pino(
  {
    level: "trace",
  },
  !__prod__
    ? prettifier
    : pino.destination(`${logsDir}/${Date.now()}-${buildMode}.log`)
);

export const expressLogger = expressPinoLogger({ logger });
