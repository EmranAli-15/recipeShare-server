"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(status, message) {
        super(message);
        this.statusCode = status;
    }
    ;
}
;
exports.default = AppError;
