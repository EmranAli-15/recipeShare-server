import { TRecipe } from "./recipe.interface";
import { Recipe } from "./recipe.model";
import { Types } from "mongoose";

const createRecipeIntoDB = async (payload: TRecipe) => {
    payload.like = 0;
    payload.rating = 5;

    const result = await Recipe.create(payload);
    return result;
};

const getRecipesFormDB = async (page: number, limit: number) => {
    const result = await Recipe.aggregate([
        { $skip: page },
        { $limit: limit },
        {
            $lookup: {
                from: "users",       // Name of the user collection
                localField: "user",  // Field in Recipe collection that references user
                foreignField: "_id", // Field in user collection that matches localField
                as: "user"
            }
        },
        { $unwind: "$user" },  // Unwind to handle single user object instead of array
        {
            $project: {
                title: 1,
                image: 1,
                rating: 1,
                "user.name": 1 // Only include the name field from userInfo
            }
        }
    ]);

    return result;
};

const getSingleRecipeFromDB = async (id: string) => {
    const result = await Recipe.findById(id).populate("user", "name photo").populate("comments.userId", "name photo");

    return result;
};

const updateRecipeIntoDB = async (payload: { body: any, recipeId: string }) => {
    const result = await Recipe.findByIdAndUpdate(
        payload.recipeId,
        { $set: payload.body },
        { new: true, runValidators: true }
    );

    return result;
};

const getMyRecipesFromDB = async (userId: string) => {
    const result = await Recipe.aggregate([{ $match: { user: new Types.ObjectId(userId) } }]).project({ image: 1, title: 1 });
    return result
};

const createCommentInARecipeIntoDB = async ({ recipeId, comment }: { recipeId: string, comment: string }) => {
    const result = await Recipe.findByIdAndUpdate(
        recipeId,
        { $push: { comments: comment } }
    )
    return result;
};

export const recipeServices = {
    getSingleRecipeFromDB,
    createRecipeIntoDB,
    getRecipesFormDB,
    getMyRecipesFromDB,
    updateRecipeIntoDB,
    createCommentInARecipeIntoDB
};