import express from 'express';
import { authControllers } from './auth.controller';
import { authValidations } from './auth.validation';
import validateRequest from '../../middlewares/validateRequest';

const route = express.Router();

route.post('/auth/login', validateRequest(authValidations.loginValidation), authControllers.loginUser);

route.post('/auth/register', validateRequest(authValidations.registerValidation), authControllers.registerUser);

route.get('/auth/myProfile/:id', authControllers.myProfile);



export const authRoutes = route;