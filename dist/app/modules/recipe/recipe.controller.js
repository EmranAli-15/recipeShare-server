"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const recipe_service_1 = require("./recipe.service");
const createARecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const result = yield recipe_service_1.recipeServices.createRecipeIntoDB(body);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Recipe uploaded successfully',
        data: result
    });
}));
const getRecipes = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, category } = req.query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const result = yield recipe_service_1.recipeServices.getRecipesFormDB(pageNumber, limitNumber, category);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Recipes Fetched successfully',
        data: result
    });
}));
const searchRecipes = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, limit, lastFetchedId } = req.query;
    const limitNumber = Number(limit);
    const result = yield recipe_service_1.recipeServices.searchRecipesFromDB(search, limitNumber, lastFetchedId);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Recipes searched successfully',
        data: result
    });
}));
const getCategoryRecipes = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lastFetchedId, limit, category } = req.query;
    const limitNumber = Number(limit);
    const result = yield recipe_service_1.recipeServices.getCategoryRecipesFormDB(lastFetchedId, limitNumber, category);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Recipes Fetched successfully',
        data: result
    });
}));
const updateRecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { recipeId } = req.params;
    const result = yield recipe_service_1.recipeServices.updateRecipeIntoDB({ body, recipeId });
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Recipes updated successfully',
        data: result
    });
}));
const deleteRecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { recipeId } = req.params;
    const result = yield recipe_service_1.recipeServices.deleteRecipeFromDB(recipeId);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Recipe deleted successfully',
        data: result
    });
}));
const getSingleRecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield recipe_service_1.recipeServices.getSingleRecipeFromDB(id);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Recipe Fetched successfully',
        data: result
    });
}));
const getMyRecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield recipe_service_1.recipeServices.getMyRecipesFromDB(userId);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'My recipes fetched successfully',
        data: result
    });
}));
const createCommentInARecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { recipeId } = req.params;
    const comment = req.body;
    const result = yield recipe_service_1.recipeServices.createCommentInARecipeIntoDB({ recipeId, comment });
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Your comment has successfully paste',
        data: result
    });
}));
const updateLikeInRecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { recipeId } = req.params;
    const { isLiked, userId } = req.body;
    const result = yield recipe_service_1.recipeServices.updateLikesInRecipeIntoDB({ userId, recipeId, isLiked });
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Your comment has successfully paste',
        data: result
    });
}));
exports.recipeControllers = {
    getSingleRecipe,
    createARecipe,
    getRecipes,
    getMyRecipe,
    updateRecipe,
    deleteRecipe,
    createCommentInARecipe,
    updateLikeInRecipe,
    getCategoryRecipes,
    searchRecipes
};
