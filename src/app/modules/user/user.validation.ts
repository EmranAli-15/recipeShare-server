import { z } from "zod";

const createUserValidation = z.object({
    body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
        phone: z.string().optional(),
        role: z.enum(['admin', 'user']),
        address: z.string().optional(),
        photo: z.string().optional(),
        OTP:z.string().optional()
    })
});


export const userValidations = {
    createUserValidation
};