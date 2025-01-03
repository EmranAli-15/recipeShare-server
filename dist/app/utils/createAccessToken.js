"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const createAccessToken = (jwtPayload) => {
    return jsonwebtoken_1.default.sign(jwtPayload, config_1.default.accessToken, {
        expiresIn: "1 days"
    });
};
exports.createAccessToken = createAccessToken;
