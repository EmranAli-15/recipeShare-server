import { errorsType } from "../interface/error.interface";

const mongoServerError = (error: any) => {
    const errObg = {
        path: "",
        message: error.message
    }

    const handledErrors: errorsType = {
        success: false,
        message: 'Duplicate Data',
        errorMessages: [errObg],
        status: 400,
        stack: error?.stack ? error.stack : ''
    };
    return handledErrors;

};

export default mongoServerError;