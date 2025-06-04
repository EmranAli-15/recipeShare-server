import express from 'express';
import { aiRecipeControllers } from './aiRecipe.controllers';
const route = express.Router();

route.post("/aiRecipe/generateAiRecipe", aiRecipeControllers.generateAiRecipe);

export const aiRecipeRoutes = route;