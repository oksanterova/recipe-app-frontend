import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { map, filter, retryWhen, concatMap, delay } from "rxjs/operators";

import { Recipe } from "./recipe";

interface Meals {
  meals?: Meal[];
}

interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
}

@Injectable({
  providedIn: "root"
})
export class ThemealdbService {
  constructor(private http: HttpClient) {}

  createRecipe(meal: Meal): Recipe {
    return {
      id: meal.idMeal,
      label: meal.strMeal,
      image: meal.strMealThumb
    };
  }

  getLatest(): Observable<Recipe[]> {
    const url = "https://www.themealdb.com/api/json/v1/1/latest.php";

    return this.http
      .get<Meals>(url)
      .pipe(map(res => res.meals.map(this.createRecipe)));
  }

  search(query: string): Observable<Recipe[]> {
    const url = "https://www.themealdb.com/api/json/v1/1/search.php";

    return this.http.get<Meals>(url, { params: { s: query } }).pipe(
      map(res => {
        if (res.meals) {
          return res.meals.map(this.createRecipe);
        } else {
          return [];
        }
      })
    );
  }

  getRecipe(id: string): Observable<Recipe> {
    const url = "https://www.themealdb.com/api/json/v1/1/lookup.php";

    return this.http
      .get<Meals>(url, { params: { i: id } })
      .pipe(map(res => this.createRecipe(res.meals[0])));
  }
}
