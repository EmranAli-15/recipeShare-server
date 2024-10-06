import express from 'express';
import { userControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from './user.validation';

const route = express.Router();

route.post('/auth/signup', validateRequest(userValidations.createUserValidation), userControllers.createAUser);


export const userRoutes = route;