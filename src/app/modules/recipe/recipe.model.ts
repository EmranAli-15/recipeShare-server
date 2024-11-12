import { Schema, Types, model } from "mongoose";
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
            userId: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
            comment: {
                type: String,
            }
        },
        likes: {
            type: [Types.ObjectId],
            require: false
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