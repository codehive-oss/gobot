import dotenv from "dotenv";

export const buildMode = (process.env.NODE_ENV || "development") as
  | "development"
  | "production";

dotenv.config({ path: `.env.${buildMode}` });

export const __prod__ = buildMode === "production";

export const TOKEN = process.env.TOKEN!;
export const DEFAULT_PREFIX = "go ";

export const DB_NAME = process.env.DB_NAME || "GoBot";
export const DB_USER = process.env.DB_USER || "postgres";
export const DB_PORT = process.env.DB_PORT ? +process.env.DB_PORT : 5432;
export const DB_PASSWORD = process.env.DB_PASSWORD || "postgres";
export const DB_HOST = process.env.DB_HOST!;

export const REDIS_HOST = process.env.REDIS_HOST!;

export const API_PORT = process.env.API_PORT ? +process.env.API_PORT : 4000;

export const CLIENT_ID = process.env.CLIENT_ID!;
export const CLIENT_SECRET = process.env.CLIENT_SECRET!;

export const SESSION_SECRET = process.env.SESSION_SECRET || "verySecretSession";
export const COOKIE_NAME = process.env.COOKIE_NAME || "GoBot";

export const FRONTEND_URL = process.env.FRONTEND_URL || "https://localhost:8443";

export const DISCORD_API_ENDPOINT = "https://discord.com/api/v9";