"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validatorError = (error) => {
    const keys = Object.keys(error.errors);
    const errArr = keys.map((key) => {
        return error.errors[key];
    }).map((data) => {
        return {
            path: data.path,
            message: data.message
        };
    });
    const handledErrors = {
        success: false,
        message: error.message,
        errorMessages: errArr,
        status: 400,
        stack: (error === null || error === void 0 ? void 0 : error.stack) ? error.stack : ''
    };
    return handledErrors;
};
exports.default = validatorError;
