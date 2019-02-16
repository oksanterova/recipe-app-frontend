import { Component, OnInit } from "@angular/core";
import { EdamamService } from "../edamam.service";
import { Recipe } from "../recipe";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent implements OnInit {
  constructor(private edamamService: EdamamService) {}

  recipes: Recipe[];

  getRecipes(): void {
    this.recipes = this.edamamService.getRecipes();
  }

  ngOnInit() {
    this.getRecipes();
  }
}
