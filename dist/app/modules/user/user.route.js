"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const route = express_1.default.Router();
route.patch('/user/updateUser/:id', (0, auth_1.default)("admin", "user"), (0, validateRequest_1.default)(user_validation_1.userValidations.updateUserValidation), user_controller_1.userControllers.updateAUser);
route.patch('/user/updateFollowing', (0, auth_1.default)("admin", "user"), (0, validateRequest_1.default)(user_validation_1.userValidations.updateUserValidation), user_controller_1.userControllers.updateFollowing);
route.get('/auth/myProfile/:id', (0, auth_1.default)("user", "admin"), user_controller_1.userControllers.myProfile);
route.get('/user/anyUserProfile/:id', user_controller_1.userControllers.anyUserProfile);
exports.userRoutes = route;
