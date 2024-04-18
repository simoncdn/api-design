
import { Router } from 'express';
import { body } from 'express-validator';
import { handleInputErrors } from '../modules/middleware';

const productRouter = Router();

productRouter.get("/", (req, res) => {
	res.status(200);
	res.json({ message: "Hello world!" });
});
productRouter.post("/", (req, res) => { });

productRouter.get("/:id", (req, res) => { });

productRouter.put("/:id", body('name').isString(), handleInputErrors, (req, res) => {
	res.status(200);
	res.json({ message: req.body });
});

productRouter.delete("/:id", (req, res) => { });

export default productRouter;
