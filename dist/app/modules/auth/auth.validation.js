"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidations = void 0;
const zod_1 = require("zod");
const loginValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'E-mail is required' }),
        password: zod_1.z.string({ required_error: 'Password is required' })
    })
});
const registerValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }),
        email: zod_1.z.string({ required_error: 'E-mail is required' }),
        password: zod_1.z.string({ required_error: 'Password is required' }),
    })
});
exports.authValidations = {
    loginValidation,
    registerValidation
};
