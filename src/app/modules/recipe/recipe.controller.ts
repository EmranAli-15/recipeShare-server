import catchAsync from "../../utils/catchAsync";
import { recipeServices } from "./recipe.service";

const createARecipe = catchAsync(
    async (req, res) => {
        const body = req.body;

        const result = await recipeServices.createRecipeIntoDB(body);

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Recipe uploaded successfully',
            data: result
        });
    }
);

const getRecipes = catchAsync(
    async (req, res) => {
        const { page, limit, category } = req.query;

        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        const result = await recipeServices.getRecipesFormDB(pageNumber, limitNumber, category);

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Recipes Fetched successfully',
            data: result
        });
    }
);

const updateRecipe = catchAsync(
    async (req, res) => {
        const body = req.body;
        const { recipeId } = req.params;

        const result = await recipeServices.updateRecipeIntoDB({ body, recipeId });

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Recipes updated successfully',
            data: result
        });
    }
);

const getSingleRecipe = catchAsync(
    async (req, res) => {
        const { id } = req.params;

        const result = await recipeServices.getSingleRecipeFromDB(id);

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Recipe Fetched successfully',
            data: result
        });
    }
);

const getMyRecipe = catchAsync(
    async (req, res) => {
        const { userId } = req.params;

        const result = await recipeServices.getMyRecipesFromDB(userId);

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'My recipes fetched successfully',
            data: result
        });
    }
);

const createCommentInARecipe = catchAsync(
    async (req, res) => {
        const { recipeId } = req.params;
        const comment = req.body;


        const result = await recipeServices.createCommentInARecipeIntoDB({ recipeId, comment });

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Your comment has successfully paste',
            data: result
        });
    }
);

const updateLikeInRecipe = catchAsync(
    async (req, res) => {
        const { recipeId } = req.params;
        const { isLiked, userId } = req.body;

        const result = await recipeServices.updateLikesInRecipeIntoDB({ userId, recipeId, isLiked });

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Your comment has successfully paste',
            data: result
        });
    }
);

export const recipeControllers = {
    getSingleRecipe,
    createARecipe,
    getRecipes,
    getMyRecipe,
    updateRecipe,
    createCommentInARecipe,
    updateLikeInRecipe
};