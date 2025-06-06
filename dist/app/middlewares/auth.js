"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRole = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const config_1 = __importDefault(require("../config"));
exports.userRole = {
    admin: 'admin',
    user: 'user'
};
const auth = (...requiredFields) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.accesstoken;
        if (!token) {
            throw new AppError_1.default(400, 'Please login first!');
        }
        ;
        jsonwebtoken_1.default.verify(token, config_1.default.accessToken, (error, decoded) => {
            if (error) {
                throw new AppError_1.default(401, 'Please login again!');
            }
            ;
            const { role } = decoded;
            if (requiredFields && !requiredFields.includes(role)) {
                throw new AppError_1.default(401, 'You are not authorized person !');
            }
            ;
            req.user = decoded;
            next();
        });
    }));
};
exports.default = auth;
