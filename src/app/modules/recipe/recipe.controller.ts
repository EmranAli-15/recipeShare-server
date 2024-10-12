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

export const recipeControllers = {
    createARecipe,
};