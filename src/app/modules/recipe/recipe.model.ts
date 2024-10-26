import { Schema, model } from "mongoose";
import { TRecipe } from "./recipe.interface";

const recipeSchema = new Schema<TRecipe>(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false
        },
        recipe: {
            type: String,
            required: true
        },
        totalComment: {
            type: Number,
            required: false
        },
        comments: {
            type: [],
            required: false
        },
        like: {
            type: Number,
            required: false
        },
        category: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: false
        },
        isDeleted: {
            type: Boolean,
            required: false
        }
    },
    {
        timestamps: true
    }
);

export const Recipe = model<TRecipe>('Recipe', recipeSchema);