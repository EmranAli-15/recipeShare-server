import { z } from "zod";

const createRecipeValidation = z.object({
    body: z.object({
        user: z.string(),
        title: z.string(),
        image: z.string(),
        recipe: z.string(),
        category: z.string(),
        totalComment: z.string().optional(),
        rating: z.number().optional(),
        like: z.number().optional(),
        comments: z.string().array().optional(),
        isDeleted: z.boolean().optional(),
    })
});


export const recipeValidations = {
    createRecipeValidation
};