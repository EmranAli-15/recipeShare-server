"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidations = void 0;
const zod_1 = require("zod");
const createUserValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
        role: zod_1.z.enum(['admin', 'user']),
        isDeleted: zod_1.z.boolean().optional(),
    })
});
const updateUserValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional(),
        password: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        role: zod_1.z.enum(['admin', 'user']).optional(),
        address: zod_1.z.string().optional(),
        photo: zod_1.z.string().optional(),
        bio: zod_1.z.string().optional(),
        experience: zod_1.z.number().optional(),
        following: zod_1.z.string().optional(),
        followers: zod_1.z.string().optional(),
        totalRecipes: zod_1.z.number().optional(),
        isDeleted: zod_1.z.boolean().optional(),
        OTP: zod_1.z.string().optional()
    })
});
exports.userValidations = {
    createUserValidation,
    updateUserValidation
};
