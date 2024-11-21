import express from 'express';
import { userControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from './user.validation';
import auth from '../../middlewares/auth';

const route = express.Router();

route.patch('/user/updateUser/:id', auth("admin", "user"), validateRequest(userValidations.updateUserValidation), userControllers.updateAUser);

route.patch('/user/updateFollowing', auth("admin", "user"), validateRequest(userValidations.updateUserValidation), userControllers.updateFollowing);

route.get('/auth/myProfile/:id', auth("user", "admin"), userControllers.myProfile);

route.get('/user/anyUserProfile/:id', userControllers.anyUserProfile);

export const userRoutes = route;