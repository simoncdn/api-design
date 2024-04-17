import express from "express";

const app = express();

app.get("/", (_req, res) => {
  res.status(200);
  res.json({ message: "Hello world!" });
});

export default app;
