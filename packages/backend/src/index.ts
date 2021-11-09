import express from "express";
import { PORT } from "./utils/constants";

const app = express();

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});