export const __prod__ = process.env.NODE_ENV == "production";
export const backendUrl = __prod__ ? "https://go-bot.xyz/api" : "https://localhost:3000/api";