
import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe } from '../types';


const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY!,
});

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    recipeName: { type: Type.STRING, description: "The name of the recipe." },
    description: { type: Type.STRING, description: "A short, enticing description of the dish." },
    ingredients: {
      type: Type.ARRAY,
      description: "A list of all ingredients needed for the recipe.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "The name of the ingredient." },
          amount: { type: Type.STRING, description: "The quantity of the ingredient, e.g., '2 cups', '1 tbsp'." },
        },
        required: ["name", "amount"],
      },
    },
    instructions: {
      type: Type.ARRAY,
      description: "Step-by-step instructions to prepare the dish.",
      items: { type: Type.STRING },
    },
    servings: { type: Type.STRING, description: "How many people this recipe serves." },
    prepTime: { type: Type.STRING, description: "The estimated preparation time for the recipe." },
  },
  required: ["recipeName", "description", "ingredients", "instructions", "servings", "prepTime"],
};


export const generateRecipe = async (ingredients: string[], language: 'en' | 'hi'): Promise<Recipe> => {
  if (ingredients.length === 0) {
    throw new Error("Please provide at least one ingredient.");
  }
  let prompt = `You are a creative chef. Generate a delicious recipe using ONLY the following ingredients: ${ingredients.join(", ")}. If some common pantry staples are needed (like salt, pepper, oil, water, flour), you can assume they are available. The tone should be enthusiastic and encouraging.\n\nBased on the ingredients provided, create a complete recipe.\n\nAvailable ingredients: ${ingredients.join(", ")}`;
  if (language === 'hi') {
    prompt += '\n\nRespond in Hindi.';
  } else {
    prompt += '\n\nRespond in English.';
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
      },
    });
    const text = response.text.trim();
    const sanitizedText = text.replace(/^```json\s*|```\s*$/g, '');
    const recipeData: Recipe = JSON.parse(sanitizedText);
    return recipeData;
  } catch (error) {
    console.error("Error generating recipe:", error);
    throw new Error("Failed to generate a recipe. The model might be busy, or the ingredients might be too unusual. Please try again.");
  }
};
