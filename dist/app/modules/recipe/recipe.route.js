"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const recipe_controller_1 = require("./recipe.controller");
const recipe_validation_1 = require("./recipe.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const route = express_1.default.Router();
route.post('/recipe/createRecipe', (0, auth_1.default)("user", "admin"), (0, validateRequest_1.default)(recipe_validation_1.recipeValidations.createRecipeValidation), recipe_controller_1.recipeControllers.createARecipe);
route.get('/recipe/getRecipes', recipe_controller_1.recipeControllers.getRecipes);
route.get('/recipe/getCategoryRecipes', recipe_controller_1.recipeControllers.getCategoryRecipes);
route.get('/recipe/searchRecipes', recipe_controller_1.recipeControllers.searchRecipes);
route.get('/recipe/getSingleRecipe/:id', recipe_controller_1.recipeControllers.getSingleRecipe);
route.get("/recipe/getMyRecipe/:userId", recipe_controller_1.recipeControllers.getMyRecipe);
route.patch('/recipe/updateRecipe/:recipeId', (0, auth_1.default)("user", "admin"), (0, validateRequest_1.default)(recipe_validation_1.recipeValidations.updateRecipeValidation), recipe_controller_1.recipeControllers.updateRecipe);
route.patch('/recipe/pasteComment/:recipeId', (0, auth_1.default)("user", "admin"), (0, validateRequest_1.default)(recipe_validation_1.recipeValidations.updateRecipeValidation), recipe_controller_1.recipeControllers.createCommentInARecipe);
route.patch('/recipe/updateLike/:recipeId', (0, auth_1.default)("user", "admin"), (0, validateRequest_1.default)(recipe_validation_1.recipeValidations.updateRecipeValidation), recipe_controller_1.recipeControllers.updateLikeInRecipe);
exports.recipeRoutes = route;