import catchAsync from "../../utils/catchAsync";
import { aiRecipeServices } from "./aiRecipe.services";

const generateAiRecipe = catchAsync(
    async (req, res) => {
        const { ingredients } = req.body;
        const result = await aiRecipeServices.generateAiRecipe(ingredients);

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Ai recipe generated successfully',
            data: result
        });
    }
);

export const aiRecipeControllers = {
    generateAiRecipe
}