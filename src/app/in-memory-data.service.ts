import { InMemoryDbService } from "angular-in-memory-web-api";
import { Recipe } from "./recipe";
import { Injectable } from "@angular/core";
import { Favorite } from "./favorite";

@Injectable({
  providedIn: "root"
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const favorites: Favorite[] = [
      {
        id: 1,
        recipe_id: "52772",
        recipe_label: "Teriyaki Chicken Casserole",
        recipe_image:
          "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg"
      }
    ];
    return { favorites };
  }

  // Overrides the genId method to ensure that a favorite always has an id.
  // If the favorite array is empty,
  // the method below returns the initial number (1).
  // if the favorites array is not empty, the method below returns the highest
  // favorite id + 1.
  genId(favorites: Favorite[]): number {
    return favorites.length > 0
      ? Math.max(...favorites.map(favorite => favorite.id)) + 1
      : 1;
  }
}
