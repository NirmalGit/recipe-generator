
export interface Recipe {
  recipeName: string;
  description: string;
  ingredients: {
    name: string;
    amount: string;
  }[];
  instructions: string[];
  servings: string;
  prepTime: string;
}
