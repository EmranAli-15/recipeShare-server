import { title } from "process";
import { TRecipe } from "./recipe.interface";
import { Recipe } from "./recipe.model";

const createRecipeIntoDB = async (payload: TRecipe) => {
    payload.like = 0;
    payload.comments = [];
    payload.rating = 5;
    payload.totalComment = 0;
    payload.isDeleted = false;

    const result = await Recipe.create(payload);
    return result;
};

const getRecipesFormDB = async (page: number, limit: number) => {
    const result = await Recipe.find().skip(page).limit(limit);
    return result;
};


// Just try to learn aggregation
// const getRecipesFormDB = async (page: number, limit: number) => {
//     const result = await Recipe.aggregate([{ $match: { title: {$regex: "the", $options:"i"} } }]);
//     return result
// };

const getSingleRecipeFromDB = async (id: string) => {
    const result = await Recipe.findById(id).populate("user");
    return result;
}

export const recipeServices = {
    getSingleRecipeFromDB,
    createRecipeIntoDB,
    getRecipesFormDB
};