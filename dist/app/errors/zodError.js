"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zodError = (error) => {
    const errorMessages = error.issues.map(err => {
        return {
            path: err.path[err.path.length - 1],
            message: err.message
        };
    });
    const handledErrors = {
        success: false,
        message: "Something went wrong!!",
        errorMessages: errorMessages,
        status: 400,
        stack: (error === null || error === void 0 ? void 0 : error.stack) ? error.stack : ''
    };
    return handledErrors;
};
exports.default = zodError;
