import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { recipeControllers } from './recipe.controller';
import { recipeValidations } from './recipe.validation';

const route = express.Router();

route.post('/recipe/createRecipe', validateRequest(recipeValidations.createRecipeValidation), recipeControllers.createARecipe);

route.get('/recipe/getRecipes', recipeControllers.getRecipes);


export const recipeRoutes = route;