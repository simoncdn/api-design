import { Router } from 'express';
import productRouter from './product';
import updateRouter from './update';
import updatepointRouter from './updatepoint';

const router = Router();

router.use('/product', productRouter);
router.use('/update', updateRouter);
router.use('/updatepoint', updatepointRouter);

export default router;
