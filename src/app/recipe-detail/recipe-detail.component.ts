import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Recipe } from "../recipe";
import { EdamamService } from "../edamam.service";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"]
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private edamamService: EdamamService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe(): void {
    const uri = this.route.snapshot.queryParamMap.get("uri");
    this.edamamService
      .getRecipe(uri)
      .subscribe(recipe => (this.recipe = recipe));
  }

  goBack(): void {
    this.location.back();
  }
}
