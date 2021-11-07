import dotenv from "dotenv";

dotenv.config();

export const TOKEN = process.env.TOKEN!;
export const __prod__ = process.env.NODE_ENV === "production";
export const PREFIX = "go ";

export const DB_NAME = process.env.DB_NAME!;
export const DB_USER = process.env.DB_USER!;
export const DB_PORT = +process.env.DB_PORT!;
export const DB_PASSWORD = process.env.DB_PASSWORD!;
export const DB_HOST = process.env.DB_HOST!;
