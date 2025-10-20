
import React from 'react';
import type { Recipe } from '../types';

interface RecipeDisplayProps {
  recipe: Recipe;
  language: 'en' | 'hi';
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, language }) => {
  const prepTimeLabel = language === 'hi' ? 'तैयारी का समय' : 'Prep Time';
  const servingsLabel = language === 'hi' ? 'सर्विंग्स' : 'Servings';
  const ingredientsLabel = language === 'hi' ? 'सामग्री' : 'Ingredients';
  const itemsLabel = language === 'hi' ? 'आइटम्स' : 'items';
  const instructionsLabel = language === 'hi' ? 'निर्देश' : 'Instructions';
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 border border-orange-100 animate-fade-in">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{recipe.recipeName}</h2>
      <p className="text-gray-600 mb-6 italic">{recipe.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
        <div className="bg-orange-50 p-4 rounded-lg">
            <p className="font-bold text-orange-800">{prepTimeLabel}</p>
            <p className="text-gray-700">{recipe.prepTime}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
            <p className="font-bold text-green-800">{servingsLabel}</p>
            <p className="text-gray-700">{recipe.servings}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="font-bold text-yellow-800">{ingredientsLabel}</p>
            <p className="text-gray-700">{recipe.ingredients.length} {itemsLabel}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-orange-200 pb-2">{ingredientsLabel}</h3>
            <ul className="space-y-2">
            {recipe.ingredients.map((ing, index) => (
                <li key={index} className="flex items-start">
                    <span className="text-orange-500 font-bold mr-2"></span>
                    <span className="text-gray-700"><span className="font-semibold">{ing.amount}</span> {ing.name}</span>
                </li>
            ))}
            </ul>
        </div>

        <div className="lg:col-span-3">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-green-200 pb-2">{instructionsLabel}</h3>
            <ol className="space-y-4">
            {recipe.instructions.map((step, index) => (
                <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 bg-green-500 text-white font-bold rounded-full h-6 w-6 text-sm flex items-center justify-center mr-3 mt-1">{index + 1}</span>
                    <span className="text-gray-700">{step}</span>
                </li>
            ))}
            </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDisplay;
