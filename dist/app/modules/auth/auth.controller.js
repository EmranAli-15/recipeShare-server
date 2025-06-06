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
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authServices.loginUser(req.body);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User logged in successfully",
        data: result
    });
}));
const registerUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authServices.registerUser(req.body);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User created successfully",
        data: result
    });
}));
const googleSignIn = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    const result = yield auth_service_1.authServices.googleSignIn(name, email);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User created successfully",
        data: result
    });
}));
const getOTP = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const result = yield auth_service_1.authServices.getOTP(email);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "OTP sent successfully",
        data: result
    });
}));
const setForgotPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, OTP, newPassword } = req.body;
    const result = yield auth_service_1.authServices.setForgotPassword(email, OTP, newPassword);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Password updated",
        data: result
    });
}));
exports.authControllers = {
    loginUser,
    registerUser,
    getOTP,
    googleSignIn,
    setForgotPassword
};
