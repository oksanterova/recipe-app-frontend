import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Recipe } from "../recipe";
import { ThemealdbService } from "../themealdb.service";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"]
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private themealdbService: ThemealdbService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.themealdbService
      .getRecipe(id)
      .subscribe(recipe => (this.recipe = recipe));
  }

  goBack(): void {
    this.location.back();
  }
}
