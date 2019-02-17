import { Component, OnInit } from "@angular/core";
import { EdamamService } from "../edamam.service";
import { Recipe } from "../recipe";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent implements OnInit {
  
  selectedRecipe: Recipe;
  
  recipes: Recipe[];

  constructor(private edamamService: EdamamService) {}


  getRecipes(): void {
    this.edamamService.getRecipes()
    .subscribe(recipes => this.recipes = recipes);
  }

  ngOnInit() {
    this.getRecipes();
  }

  onSelect(recipe: Recipe): void {
    this.selectedRecipe = recipe;
  }
}
