import { TRecipe } from "./recipe.interface";
import { Recipe } from "./recipe.model";
import mongoose, { Types } from "mongoose";
const { ObjectId } = mongoose.Types;

const createRecipeIntoDB = async (payload: TRecipe) => {
    payload.rating = 5;

    const result = await Recipe.create(payload);
    return result;
};

const getRecipesFormDB = async (page: number, limit: number, category: any) => {
    const result = await Recipe.aggregate([
        { $match: { $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }] } },
        { $skip: page * limit },
        ...(category ? [{ $match: { category } }] : []),
        { $limit: limit },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user"
            }
        },
        { $unwind: "$user" },
        {
            $project: {
                title: 1,
                image: 1,
                rating: 1,
                "user.name": 1
            }
        }
    ]);

    return result;
};

const getCategoryRecipesFormDB = async (lastFetchedId: string | number, limit: number, category: any) => {
    let result;

    if (lastFetchedId == "0") {
        result = await Recipe.find({
            $or: [
                { isDeleted: false },
                { isDeleted: { $exists: false } }
            ],
            category: category,
        }).limit(limit).populate("user", "name")
    } else {
        result = await Recipe.find(
            {
                $or: [
                    { isDeleted: false },
                    { isDeleted: { $exists: false } }
                ],
                _id: { $gt: new ObjectId(lastFetchedId) },
                category: category,
            },
        )
            .limit(limit)
            .populate("user", "name")
    }

    return result;
};

const getSingleRecipeFromDB = async (id: string) => {
    const result = await Recipe.findById(id).populate("user").populate("comments.userId", "name photo");

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

const deleteRecipeFromDB = async (recipeId: string) => {
    const result = Recipe.findByIdAndUpdate(recipeId, { isDeleted: true });
    return result;
};

const searchRecipesFromDB = async (search: string, limit: number, lastFetchedId: string) => {
    const result = await Recipe.aggregate([
        { $match: { $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }] } },
        { $match: { ...(lastFetchedId && { _id: { $gt: new ObjectId(lastFetchedId) } }) } },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user"
            }
        },
        { $unwind: "$user" },
        {
            $match: {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { "user.name": { $regex: search, $options: "i" } }
                ]
            }
        },
        { $limit: limit },
        {
            $project: { title: 1, image: 1, "user.name": 1 }
        }
    ]);

    return result;
}

const getMyRecipesFromDB = async (userId: string) => {
    const result = await Recipe.aggregate([
        { $match: { $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }] } },
        { $match: { user: new Types.ObjectId(userId) } }
    ]).project({ image: 1, title: 1, rating: 1 });
    return result
};

const createCommentInARecipeIntoDB = async ({ recipeId, comment }: { recipeId: string, comment: string }) => {
    const result = await Recipe.findByIdAndUpdate(
        recipeId,
        { $push: { comments: comment } }
    )
    return result;
};

const updateLikesInRecipeIntoDB = async ({ userId, recipeId, isLiked }: { userId: string, recipeId: string, isLiked: boolean }) => {
    if (isLiked) {
        await Recipe.findByIdAndUpdate(recipeId, { $pull: { likes: userId } });
    } else {
        await Recipe.findByIdAndUpdate(recipeId, { $addToSet: { likes: userId } });
    }

    return;
}

export const recipeServices = {
    getSingleRecipeFromDB,
    createRecipeIntoDB,
    getRecipesFormDB,
    getMyRecipesFromDB,
    updateRecipeIntoDB,
    deleteRecipeFromDB,
    createCommentInARecipeIntoDB,
    updateLikesInRecipeIntoDB,
    getCategoryRecipesFormDB,
    searchRecipesFromDB
};