"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeServices = void 0;
const recipe_model_1 = require("./recipe.model");
const mongoose_1 = __importStar(require("mongoose"));
const { ObjectId } = mongoose_1.default.Types;
const createRecipeIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.rating = 5;
    const result = yield recipe_model_1.Recipe.create(payload);
    return result;
});
const getRecipesFormDB = (page, limit, category) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_model_1.Recipe.aggregate([
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
});
const getCategoryRecipesFormDB = (lastFetchedId, limit, category) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (lastFetchedId == "0") {
        result = yield recipe_model_1.Recipe.find({
            $or: [
                { isDeleted: false },
                { isDeleted: { $exists: false } }
            ],
            category: category,
        }).limit(limit).populate("user", "name");
    }
    else {
        result = yield recipe_model_1.Recipe.find({
            $or: [
                { isDeleted: false },
                { isDeleted: { $exists: false } }
            ],
            _id: { $gt: new ObjectId(lastFetchedId) },
            category: category,
        })
            .limit(limit)
            .populate("user", "name");
    }
    return result;
});
const getSingleRecipeFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_model_1.Recipe.findById(id).populate("user").populate("comments.userId", "name photo role");
    return result;
});
const updateRecipeIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_model_1.Recipe.findByIdAndUpdate(payload.recipeId, { $set: payload.body }, { new: true, runValidators: true });
    return result;
});
const deleteRecipeFromDB = (recipeId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = recipe_model_1.Recipe.findByIdAndUpdate(recipeId, { isDeleted: true });
    return result;
});
const searchRecipesFromDB = (search, limit, lastFetchedId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_model_1.Recipe.aggregate([
        { $match: { $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }] } },
        { $match: Object.assign({}, (lastFetchedId && { _id: { $gt: new ObjectId(lastFetchedId) } })) },
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
});
const getMyRecipesFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_model_1.Recipe.aggregate([
        { $match: { $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }] } },
        { $match: { user: new mongoose_1.Types.ObjectId(userId) } }
    ]).project({ image: 1, title: 1, rating: 1 });
    return result;
});
const createCommentInARecipeIntoDB = (_a) => __awaiter(void 0, [_a], void 0, function* ({ recipeId, comment }) {
    const result = yield recipe_model_1.Recipe.findByIdAndUpdate(recipeId, { $push: { comments: comment } });
    return result;
});
const updateLikesInRecipeIntoDB = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, recipeId, isLiked }) {
    if (isLiked) {
        yield recipe_model_1.Recipe.findByIdAndUpdate(recipeId, { $pull: { likes: userId } });
    }
    else {
        yield recipe_model_1.Recipe.findByIdAndUpdate(recipeId, { $addToSet: { likes: userId } });
    }
    return;
});
exports.recipeServices = {
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
