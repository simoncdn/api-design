import { Router } from "express";
import { createUpdate, deleteUpdate, getAllUpdate, getUpdate, updateUpdate, } from "../handlers/update";
import { validate } from "../modules/middleware";
import { createUpdateSchema, editUpdateSchema } from "../schemas/update";

const updateRouter = Router();

updateRouter.get("/", getAllUpdate);
updateRouter.post("/", validate(createUpdateSchema), createUpdate);
updateRouter.get("/:id", getUpdate);
updateRouter.put("/:id", validate(editUpdateSchema), updateUpdate);
updateRouter.delete("/:id", deleteUpdate);

export default updateRouter;
