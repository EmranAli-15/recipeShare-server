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
exports.authControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const auth_service_1 = require("./auth.service");
// secure: process.env.NODE_ENV === "production",
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authServices.loginUser(req.body);
    const { accessToken, isUserExist } = result;
    res.cookie('accessToken', accessToken, {
        httpOnly: false, // Secure the cookie
        secure: false, // Only send cookies over HTTPS
        sameSite: 'none', // Required for cross-origin
        maxAge: 24 * 60 * 60 * 1000, // Optional: Set expiration (1 day in this case)
    });
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User logged in successfully",
        data: isUserExist
    });
}));
const registerUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authServices.registerUser(req.body);
    const { accessToken, createUser } = result;
    res.cookie('accessToken', accessToken, {
        httpOnly: false, // Secure the cookie
        secure: false, // Only send cookies over HTTPS
        sameSite: 'none', // Required for cross-origin
        maxAge: 24 * 60 * 60 * 1000, // Optional: Set expiration (1 day in this case)
    });
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User created successfully",
        data: createUser
    });
}));
exports.authControllers = {
    loginUser,
    registerUser,
};
