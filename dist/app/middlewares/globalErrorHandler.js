"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const validatorError_1 = __importDefault(require("../errors/validatorError"));
const mongoServerError_1 = __importDefault(require("../errors/mongoServerError"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const zodError_1 = __importDefault(require("../errors/zodError"));
const globalErrorHandler = (error, req, res, next) => {
    let handledErrors;
    let status = 400;
    if (error instanceof zod_1.ZodError) {
        const simplifiedErrors = (0, zodError_1.default)(error);
        handledErrors = simplifiedErrors;
        status = simplifiedErrors.status;
    }
    else if (error.name === 'ValidationError') {
        const simplifiedErrors = (0, validatorError_1.default)(error);
        handledErrors = simplifiedErrors;
        status = simplifiedErrors.status;
    }
    else if (error.name === 'MongoServerError') {
        const simplifiedErrors = (0, mongoServerError_1.default)(error);
        handledErrors = simplifiedErrors;
        status = simplifiedErrors.status;
    }
    else if (error instanceof AppError_1.default) {
        const instanceofAppError = {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
            errorMessages: [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message
                }
            ],
            status: error.statusCode,
            stack: (error === null || error === void 0 ? void 0 : error.stack) ? error.stack : ''
        };
        handledErrors = instanceofAppError;
        status = error.statusCode;
    }
    else if (error instanceof Error) {
        const instanceofAppError = {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
            errorMessages: [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message
                }
            ],
            status: 400,
            stack: (error === null || error === void 0 ? void 0 : error.stack) ? error.stack : ''
        };
        handledErrors = instanceofAppError;
        status = 400;
    }
    return res.status(status).json({
        success: handledErrors === null || handledErrors === void 0 ? void 0 : handledErrors.success,
        message: handledErrors === null || handledErrors === void 0 ? void 0 : handledErrors.message,
        errorSources: handledErrors === null || handledErrors === void 0 ? void 0 : handledErrors.errorMessages,
        stack: handledErrors === null || handledErrors === void 0 ? void 0 : handledErrors.stack
    });
};
exports.default = globalErrorHandler;
