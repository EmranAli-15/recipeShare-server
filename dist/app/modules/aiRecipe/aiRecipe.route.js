"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiRecipeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const aiRecipe_controllers_1 = require("./aiRecipe.controllers");
const route = express_1.default.Router();
route.post("/aiRecipe/generateAiRecipe", aiRecipe_controllers_1.aiRecipeControllers.generateAiRecipe);
exports.aiRecipeRoutes = route;
