import express from 'express';
import authController from './auth.controller';
import { localStrategy, jwtStrategy } from '../../../middleware/strategy';
import { sanitize } from '../../../middleware/sanitizer';
import { validateBody, schemas } from '../../../middleware/validator';

export const authRouter = express.Router();
authRouter.route('/login').post(sanitize(), validateBody(schemas.loginSchema), localStrategy, authController.login);
authRouter.route('/register').post(sanitize(), validateBody(schemas.registerSchema), authController.register);
