import { TRecipe } from "./recipe.interface";
import { Recipe } from "./recipe.model";

const createRecipeIntoDB = async (payload: TRecipe) => {
    payload.like = 0;
    payload.comments = [];
    payload.rating = 5;
    payload.totalComment = 0;
    payload.isDeleted = false;

    console.log(payload);


    // const result = await Recipe.create(payload);
    // return result;
};

export const recipeServices = {
    createRecipeIntoDB
};