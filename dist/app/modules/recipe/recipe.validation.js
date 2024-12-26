"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeValidations = void 0;
const zod_1 = require("zod");
const createRecipeValidation = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.string(),
        title: zod_1.z.string(),
        image: zod_1.z.string(),
        recipe: zod_1.z.string(),
        category: zod_1.z.string(),
        totalComment: zod_1.z.string().optional(),
        rating: zod_1.z.number().optional(),
        likes: zod_1.z.string().optional(),
        comments: zod_1.z.string().array().optional(),
        isDeleted: zod_1.z.boolean().optional(),
    })
});
const updateRecipeValidation = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.string().optional(),
        title: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        recipe: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        totalComment: zod_1.z.string().optional(),
        rating: zod_1.z.number().optional(),
        likes: zod_1.z.string().optional(),
        comments: zod_1.z.object({
            userId: zod_1.z.string(),
            comment: zod_1.z.string()
        }).optional(),
        isDeleted: zod_1.z.boolean().optional(),
    })
});
exports.recipeValidations = {
    createRecipeValidation,
    updateRecipeValidation
};
