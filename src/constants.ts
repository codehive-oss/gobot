import dotenv from "dotenv";

dotenv.config();

export const TOKEN = process.env.TOKEN!;
export const __prod__ = process.env.NODE_ENV === "production";
export const PREFIX = "go";