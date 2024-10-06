import { ZodError } from "zod";
import { errorsType } from "../interface/error.interface";
import { ErrorRequestHandler } from "express";
import validatorError from "../errors/validatorError";
import mongoServerError from "../errors/mongoServerError";
import AppError from "../errors/AppError";
import zodErrors from "../errors/zodError";

const globalErrorHandler: ErrorRequestHandler = (error, req, res: any, next) => {
    let handledErrors;
    let status = 400;


    if (error instanceof ZodError) {
        const simplifiedErrors = zodErrors(error);
        handledErrors = simplifiedErrors;
        status = simplifiedErrors.status;
    }
    else if (error.name === 'ValidationError') {
        const simplifiedErrors = validatorError(error);
        handledErrors = simplifiedErrors;
        status = simplifiedErrors.status;
    }
    else if (error.name === 'MongoServerError') {
        const simplifiedErrors = mongoServerError(error);
        handledErrors = simplifiedErrors;
        status = simplifiedErrors.status;
    }
    else if (error instanceof AppError) {
        const instanceofAppError: errorsType = {
            success: false,
            message: error?.message,
            errorMessages: [
                {
                    path: '',
                    message: error?.message
                }
            ],
            status: error.statusCode,
            stack: error?.stack ? error.stack : ''
        };
        handledErrors = instanceofAppError;
        status = error.statusCode;
    }
    else if (error instanceof Error) {
        const instanceofAppError: errorsType = {
            success: false,
            message: error?.message,
            errorMessages: [
                {
                    path: '',
                    message: error?.message
                }
            ],
            status: 400,
            stack: error?.stack ? error.stack : ''
        };
        handledErrors = instanceofAppError;
        status = 400;
    }


    return res.status(status).json({
        success: handledErrors?.success,
        message: handledErrors?.message,
        errorSources: handledErrors?.errorMessages,
        stack: handledErrors?.stack
    });
};

export default globalErrorHandler;