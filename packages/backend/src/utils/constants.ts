import dotenv from "dotenv";
import { prefix } from "../config.json";

dotenv.config();

export const __prod__ = process.env.NODE_ENV === "production";
export const TOKEN = process.env.TOKEN!;
export const PREFIX = prefix;

export const DB_NAME = process.env.DB_NAME!;
export const DB_USER = process.env.DB_USER!;
export const DB_PORT = +process.env.DB_PORT!;
export const DB_PASSWORD = process.env.DB_PASSWORD!;
export const DB_HOST = process.env.DB_HOST!;

export const API_PORT = +process.env.API_PORT!;