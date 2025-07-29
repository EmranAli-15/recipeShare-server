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
exports.aiRecipeServices = void 0;
const config_1 = __importDefault(require("../../config"));
const generative_ai_1 = require("@google/generative-ai");
const genAI = new generative_ai_1.GoogleGenerativeAI(config_1.default.gemini_api_key);
const generateAiRecipe = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const ingredients = payload;
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const prompt = `You are a helpful recipe generator.
                        Generate a creative and delicious recipe using the following ingredients: ${ingredients}.
                        Please strictly follow this JSON output format:
                        {
                            "recipe_name": "Name of the recipe",
                            "ingredients": [
                              "Quantity + ingredient (e.g., '2 cups of flour')",
                              ...
                            ],
                            "instructions": [
                              "Step-by-step instruction 1",
                              "Step-by-step instruction 2",
                              ...
                            ]
                        }

                        Guidelines:
                        - Only use the provided ingredients.
                        - Make the recipe coherent and realistic.
                        - Use metric measurements if possible.
                        - Keep instructions concise but clear.
                        `;
        const result = yield model.generateContent(prompt);
        return result;
    }
    catch (error) {
        throw new Error("Something went wrong!");
    }
});
exports.aiRecipeServices = {
    generateAiRecipe
};
