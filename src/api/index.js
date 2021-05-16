import express from 'express';
import { authRouter } from './resources/auth';
import { productRouter } from './resources/product';


export const restRouter = express.Router();
restRouter.use('/auth', authRouter);
restRouter.use('/product', productRouter);