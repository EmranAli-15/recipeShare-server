"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoServerError = (error) => {
    const errObg = {
        path: "",
        message: error.message
    };
    const handledErrors = {
        success: false,
        message: 'Duplicate Data',
        errorMessages: [errObg],
        status: 400,
        stack: (error === null || error === void 0 ? void 0 : error.stack) ? error.stack : ''
    };
    return handledErrors;
};
exports.default = mongoServerError;
