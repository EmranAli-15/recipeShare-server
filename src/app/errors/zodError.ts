import { ZodError } from "zod";
import { errorsType } from "../interface/error.interface";

const zodError = (error: ZodError) => {
    const errorMessages = error.issues.map(err => {
        return {
            path: err.path[err.path.length-1],
            message: err.message
        }
    });

    const handledErrors: errorsType = {
        success: false,
        message: "Something went wrong!!",
        errorMessages: errorMessages,
        status: 400,
        stack: error?.stack ? error.stack : ''
    };

    return handledErrors;

};

export default zodError;