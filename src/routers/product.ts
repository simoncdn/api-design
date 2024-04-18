
import { Router } from 'express';
import { validate } from '../modules/middleware';
import { productSchema } from '../schemas/product';
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from '../handlers/product';

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.post("/", validate(productSchema), createProduct);
productRouter.get("/:id", getProduct);
productRouter.put("/:id", validate(productSchema), updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
