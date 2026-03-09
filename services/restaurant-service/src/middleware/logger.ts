import winston from "winston";

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.json(),
  defaultMeta: { service: process.env.SERVICE_NAME },
  transports: [
    new winston.transports.Console()
  ]
});