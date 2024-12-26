"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const route = express_1.default.Router();
route.post('/auth/login', (0, validateRequest_1.default)(auth_validation_1.authValidations.loginValidation), auth_controller_1.authControllers.loginUser);
route.post('/auth/register', (0, validateRequest_1.default)(auth_validation_1.authValidations.registerValidation), auth_controller_1.authControllers.registerUser);
exports.authRoutes = route;
