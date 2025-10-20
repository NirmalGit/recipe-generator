
import React, { useState } from 'react';

interface IngredientInputProps {
  ingredients: string[];
  setIngredients: React.Dispatch<React.SetStateAction<string[]>>;
}

const IngredientInput: React.FC<IngredientInputProps> = ({ ingredients, setIngredients }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddIngredient = () => {
    const newIngredient = inputValue.trim();
    if (newIngredient && !ingredients.some(i => i.toLowerCase() === newIngredient.toLowerCase())) {
      setIngredients([...ingredients, newIngredient]);
      setInputValue('');
    }
  };

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    setIngredients(ingredients.filter(i => i !== ingredientToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  return (
    <div>
      <label htmlFor="ingredient-input" className="block text-xl font-semibold text-gray-700 mb-3">
        Your Ingredients
      </label>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          id="ingredient-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., chicken breast, bell peppers"
          className="flex-grow w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
        />
        <button
          onClick={handleAddIngredient}
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300 shrink-0"
        >
          Add
        </button>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {ingredients.map(ingredient => (
          <span
            key={ingredient}
            className="flex items-center bg-orange-100 text-orange-800 text-sm font-medium px-4 py-2 rounded-full"
          >
            {ingredient}
            <button
              onClick={() => handleRemoveIngredient(ingredient)}
              className="ml-2 text-orange-600 hover:text-orange-800 focus:outline-none"
              aria-label={`Remove ${ingredient}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default IngredientInput;
