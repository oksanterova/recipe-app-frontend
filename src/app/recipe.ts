export class Recipe {
  id: string;
  label: string;
  image: string;
  instructions: string[];
  ingredients: Ingredient[];
}

export class Ingredient {
  label: string;
  measure: string;
}

export class Category {
  label: string;
  image: string;
}
