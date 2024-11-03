import { z } from "zod";

const createUserValidation = z.object({
    body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
        role: z.enum(['admin', 'user']),
        isDeleted: z.boolean().optional(),
    })
});

const updateUserValidation = z.object({
    body: z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        password: z.string().optional(),
        phone: z.string().optional(),
        role: z.enum(['admin', 'user']).optional(),
        address: z.string().optional(),
        photo: z.string().optional(),
        bio: z.string().optional(),
        experience: z.number().optional(),
        following: z.string().optional(),
        followers: z.string().optional(),
        totalRecipes: z.number().optional(),
        isDeleted: z.boolean().optional(),
        OTP: z.string().optional()
    })
});


export const userValidations = {
    createUserValidation,
    updateUserValidation
};