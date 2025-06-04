import config from "../../config";
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(config.gemini_api_key as string);

const generateAiRecipe = async (payload: any) => {
    const ingredients = payload;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
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

        const result = await model.generateContent(prompt);
        let output = result.response.candidates;

        return output;

    } catch (error) {
        throw new Error("Something went wrong!")
    }
};

export const aiRecipeServices = {
    generateAiRecipe
};