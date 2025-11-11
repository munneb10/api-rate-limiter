import express from "express";
import { rateLimiter } from "./rateLimiter";

const app = express();
app.use(rateLimiter);

app.get("/", (_req, res) => {
  res.send("Hello! You’re within your rate limit 🚀");
});

app.listen(3000, () => console.log("Server running on port 3000"));
