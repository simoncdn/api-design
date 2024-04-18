import express from "express";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createUser, signIn } from "./handlers/user";
import router from "./routers/router";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", protect, router);

app.get("/", (_req, res) => {
	res.status(200);
	res.json({ message: "Hello world!" });
});

app.post("/user", createUser);
app.post("/signin", signIn);



export default app;
