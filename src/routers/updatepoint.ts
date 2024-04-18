import { Router } from "express";

const updatepointRouter = Router();

updatepointRouter.get("/", (req, res) => { });
updatepointRouter.post("/", (req, res) => { });
updatepointRouter.get("/:id", (req, res) => { });
updatepointRouter.put("/:id", (req, res) => { });
updatepointRouter.delete("/:id", (req, res) => { });

export default updatepointRouter;
