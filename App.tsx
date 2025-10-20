
import React, { useState, useCallback } from 'react';
import { LanguageProvider, useLanguage } from './components/LanguageContext';
import type { Recipe } from './types';
import { generateRecipe } from './services/geminiService';
import IngredientInput from './components/IngredientInput';
import RecipeDisplay from './components/RecipeDisplay';
import { ChefHatIcon } from './components/icons/ChefHatIcon';
import { SparklesIcon } from './components/icons/SparklesIcon';

const AppContent: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [ingredients, setIngredients] = useState<string[]>(['Tomatoes', 'Onion', 'Garlic']);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRecipe = useCallback(async () => {
    if (ingredients.length === 0) {
      setError("Please add at least one ingredient.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setRecipe(null);
    try {
      const generatedRecipe = await generateRecipe(ingredients, language);
      setRecipe(generatedRecipe);
    } catch (e: any) {
      setError(e.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [ingredients, language]);

  return (
    <div className="min-h-screen bg-orange-50 font-sans text-gray-800">
      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex justify-end mb-4">
          <label className="mr-2 font-semibold">Language:</label>
          <select
            value={language}
            onChange={e => setLanguage(e.target.value as 'en' | 'hi')}
            className="border rounded px-2 py-1"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
          </select>
        </div>
        <header className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-4">
            <ChefHatIcon className="w-16 h-16 text-orange-500" />
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">
              Recipe Generator
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            What's in your fridge? Turn your available ingredients into a delicious meal with the power of AI.
          </p>
        </header>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 border border-orange-100">
          <IngredientInput ingredients={ingredients} setIngredients={setIngredients} language={language} />
          
          <div className="text-center mt-8">
            <button
              onClick={handleGenerateRecipe}
              disabled={isLoading || ingredients.length === 0}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 text-white font-semibold rounded-full shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300 disabled:bg-orange-300 disabled:cursor-not-allowed transform hover:scale-105"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-6 h-6" />
                  Generate Recipe
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg animate-fade-in" role="alert">
              <p className="font-bold">Oh no!</p>
              <p>{error}</p>
            </div>
          )}
          {recipe && <RecipeDisplay recipe={recipe} language={language} />}
        </div>
      </main>
      <footer className="text-center py-6 text-gray-500">
        <p>Powered by AI</p>
      </footer>
    </div>
  );
};

const App: React.FC = () => (
  <LanguageProvider>
    <AppContent />
  </LanguageProvider>
);

export default App;
