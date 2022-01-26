import { isServerSide } from "./isServerSide";

export const __prod__ = process.env.NODE_ENV == "production";

// Use absolute path when running on the server
export const backendUrl = "/api";
export const urqlBackendUrl = isServerSide()
  ? "http://app:4000/api"
  : "/api";
  