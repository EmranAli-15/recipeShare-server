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
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../../config"));
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
const getOTP = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({
        email: userEmail
    });
    if (user) {
        const OTP = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
        yield user_model_1.User.findByIdAndUpdate(user._id, {
            OTP: OTP.toString()
        });
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "mohammademranali15@gmail.com",
                pass: config_1.default.nodemailer_pass
            },
        });
        yield new Promise((resolve, reject) => {
            // verify connection configuration
            transporter.verify(function (error, success) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(success);
                }
            });
        });
        function sendMail(to, sub, msg) {
            return __awaiter(this, void 0, void 0, function* () {
                yield new Promise((resolve, reject) => {
                    transporter.sendMail({
                        to: to,
                        subject: sub,
                        html: `<div><p>Do not share your OTP with others.</p><h1 style={{fontWeight: 'bold'}}>${msg}</h1></div>`
                    }, (err, info) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(info);
                        }
                    });
                });
            });
        }
        ;
        sendMail(userEmail, "OTP for FOOD RECIPE", OTP.toString());
    }
    else {
        throw new AppError_1.default(403, "User not exit.");
    }
});
const setForgotPassword = (userEmail, OTP, newPass) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: userEmail });
    if (OTP && (user === null || user === void 0 ? void 0 : user.OTP) == OTP) {
        const newHash = bcrypt_1.default.hashSync(newPass, Number(config_1.default.saltRounds));
        yield user_model_1.User.findByIdAndUpdate(user._id, {
            password: newHash
        });
        yield user_model_1.User.findByIdAndUpdate(user.id, {
            OTP: null
        });
    }
    else {
        throw new AppError_1.default(403, "Incorrect OTP");
    }
    return;
});
exports.authServices = {
    loginUser,
    registerUser,
    getOTP,
    setForgotPassword
};
