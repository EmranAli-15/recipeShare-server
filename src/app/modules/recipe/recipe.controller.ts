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
        const { page, limit } = req.query;

        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        const result = await recipeServices.getRecipesFormDB(pageNumber, limitNumber);

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Recipes Fetched successfully',
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
)

export const recipeControllers = {
    getSingleRecipe,
    createARecipe,
    getRecipes
};