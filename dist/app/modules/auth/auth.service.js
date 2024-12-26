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
exports.authServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createAccessToken_1 = require("../../utils/createAccessToken");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.findOne({
        email: payload === null || payload === void 0 ? void 0 : payload.email
    });
    if (!isUserExist) {
        throw new AppError_1.default(400, 'Could not find any user!');
    }
    ;
    // make the password in plaintext and check the password is matched or not
    const isPasswordMatched = yield bcrypt_1.default.compare(payload.password, isUserExist.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(403, 'Email or password not matched!');
    }
    ;
    const jwtPayload = {
        email: isUserExist.email,
        role: isUserExist.role,
        userId: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist._id
    };
    const accessToken = (0, createAccessToken_1.createAccessToken)(jwtPayload);
    return {
        accessToken,
        isUserExist
    };
});
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.findOne({
        email: payload === null || payload === void 0 ? void 0 : payload.email
    });
    if (isUserExist) {
        throw new AppError_1.default(400, 'The email is already registered!');
    }
    ;
    const role = "user";
    const data = Object.assign(Object.assign({}, payload), { role });
    const createUser = yield user_model_1.User.create(data);
    const jwtPayload = {
        email: createUser.email,
        role: createUser.role,
        userId: createUser._id
    };
    const accessToken = (0, createAccessToken_1.createAccessToken)(jwtPayload);
    return {
        accessToken,
        createUser
    };
});
exports.authServices = {
    loginUser,
    registerUser,
};
