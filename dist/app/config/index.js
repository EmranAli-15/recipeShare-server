"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join((process.cwd(), '.env')) });
exports.default = {
    port: process.env.PORT,
    db_url: process.env.DB_URL,
    saltRounds: process.env.SALT_ROUNDS,
    userPassword: process.env.USER_PASSWORD,
    accessToken: process.env.ACCESS_TOKEN,
    nodemailer_pass: process.env.NODEMAILER_PASS,
    gemini_api_key: process.env.GEMINI_API_KEY
};
