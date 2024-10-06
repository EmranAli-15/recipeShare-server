import { z } from "zod";

const loginValidation = z.object({
    body: z.object({
        email: z.string({ required_error: 'E-mail is required' }),
        password: z.string({ required_error: 'Password is required' })
    })
});

const registerValidation = z.object({
    body: z.object({
        name: z.string({ required_error: 'Name is required' }),
        email: z.string({ required_error: 'E-mail is required' }),
        password: z.string({ required_error: 'Password is required' }),
    })
})


export const authValidations = {
    loginValidation,
    registerValidation
}