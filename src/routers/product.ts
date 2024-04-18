
import { Router } from 'express';
import { validate } from '../modules/middleware';
import { productSchema } from '../schemas/product';

const productRouter = Router();

productRouter.get("/", (req, res) => {
	res.status(200);
	res.json({ message: "Hello world!" });
});
productRouter.post("/", (req, res) => { });

productRouter.get("/:id", (req, res) => { });

productRouter.put("/:id", validate(productSchema), (req, res) => {
	res.status(200);
	res.json({ message: req.body });
});

productRouter.delete("/:id", (req, res) => { });

export default productRouter;
