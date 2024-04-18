import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createUser, signIn } from "./handlers/user";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
	res.status(200);
	res.json({ message: "Hello world!" });
});

app.post("/user", createUser);
app.post("/signin", signIn);

app.use("/api", protect, router);


export default app;
