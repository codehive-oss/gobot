import pino from "pino";
import expressPinoLogger from "express-pino-logger";
import pinoPretty from "pino-pretty";
import { __prod__ } from "./constants";

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

export const logger = pino(
  {
    level: "trace",
  },
  prettifier
);

export const expressLogger = expressPinoLogger({ logger });
