import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';

import { Recipe } from "./recipe";
import { RECIPES } from "./mock-recipes";

@Injectable({
  providedIn: "root"
})
export class EdamamService {
  constructor() {}

  getRecipes(): Observable<Recipe[]> {
    return of(RECIPES);
  }

  getRecipe(label: string): Observable<Recipe> {
    return of(RECIPES.find(recipe => recipe.label === label));
  }
}
