import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { recipeControllers } from './recipe.controller';
import { recipeValidations } from './recipe.validation';
import auth from '../../middlewares/auth';

const route = express.Router();

route.post('/recipe/createRecipe', validateRequest(recipeValidations.createRecipeValidation), recipeControllers.createARecipe);

route.get('/recipe/getRecipes', recipeControllers.getRecipes);

route.get('/recipe/getSingleRecipe/:id', recipeControllers.getSingleRecipe);

route.get("/recipe/getMyRecipe/:userId", recipeControllers.getMyRecipe);

route.patch('/recipe/updateRecipe/:recipeId', auth("user", "admin"), validateRequest(recipeValidations.updateRecipeValidation), recipeControllers.updateRecipe);

route.patch('/recipe/pasteComment/:recipeId', validateRequest(recipeValidations.updateRecipeValidation), recipeControllers.createCommentInARecipe);

route.patch('/recipe/updateLike/:recipeId', validateRequest(recipeValidations.updateRecipeValidation), recipeControllers.updateLikeInRecipe);


export const recipeRoutes = route;