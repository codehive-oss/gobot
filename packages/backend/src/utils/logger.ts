import pino from "pino";

const logger = pino({ transport: { target: "pino-pretty" } });
logger.level = "trace";

export default logger;
