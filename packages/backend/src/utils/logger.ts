import pino from "pino";
import expressPinoLogger from "express-pino-logger";

export const logger = pino({
  prettyPrint: {
    colorize: true,
    translateTime: "SYS:standard",
    messageFormat: (log) => {
      if (log.req)
        return `${log.req.method} ${log.req.url}: ${log.responseTime}ms - [${log.res.statusCode}] ${log.msg}`;
      return `${log.msg}`;
    },
    hideObject: true,
  },
  level: "trace",
});

export const expressLogger = expressPinoLogger({ logger });


