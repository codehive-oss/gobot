export const __prod__ = process.env.NODE_ENV == "production";
export const backendUrl = __prod__ ? "https://go-bot.xyz:8443" : "https://localhost:4000";