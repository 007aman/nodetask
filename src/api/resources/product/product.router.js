import express from 'express';
import productController from './product.controller';
import { jwtStrategy } from '../../../middleware/strategy';
import { sanitize } from '../../../middleware/sanitizer';
import { validateBody, schemas } from '../../../middleware/validator';

export const productRouter = express.Router();
productRouter.route('/wish_list').get(jwtStrategy, productController.index);
productRouter.route('/like_dislike').post(sanitize(), validateBody(schemas.likedSchema), jwtStrategy, productController.liked);
