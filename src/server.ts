import express from "express";
import router from "./router";

const app = express();

app.get("/", (_req, res) => {
	res.status(200);
	res.json({ message: "Hello world!" });
});

app.use("/api", router);

export default app;
