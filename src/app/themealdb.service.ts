import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { map, filter, retryWhen, concatMap, delay } from "rxjs/operators";

import { Recipe, Category } from "./recipe";

interface ThemealdbMeals {
  meals?: ThemealdbMeal[];
}

interface ThemealdbMeal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
}

interface ThemealdbCategories {
  categories: ThemealdbCategory[];
}

interface ThemealdbCategory {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

@Injectable({
  providedIn: "root"
})
export class ThemealdbService {
  constructor(private http: HttpClient) {}

  createRecipe(meal: ThemealdbMeal): Recipe {
    return {
      id: meal.idMeal,
      label: meal.strMeal,
      image: meal.strMealThumb
    };
  }

  createCategory(category: ThemealdbCategory): Category {
    return {
      label: category.strCategory,
      image: category.strCategoryThumb
    };
  }

  getLatest(): Observable<Recipe[]> {
    const url = "https://www.themealdb.com/api/json/v1/1/latest.php";

    return this.http
      .get<ThemealdbMeals>(url)
      .pipe(map(res => res.meals.map(this.createRecipe)));
  }

  search(query: string): Observable<Recipe[]> {
    const url = "https://www.themealdb.com/api/json/v1/1/search.php";

    return this.http.get<ThemealdbMeals>(url, { params: { s: query } }).pipe(
      map(res => {
        if (res.meals) {
          return res.meals.map(this.createRecipe);
        } else {
          return [];
        }
      })
    );
  }

  getCategories(): Observable<Category[]> {
    const url = "https://www.themealdb.com/api/json/v1/1/categories.php";

    return this.http
      .get<ThemealdbCategories>(url)
      .pipe(map(res => res.categories.map(this.createCategory)));
  }

  getRecipe(id: string): Observable<Recipe> {
    const url = "https://www.themealdb.com/api/json/v1/1/lookup.php";

    return this.http
      .get<ThemealdbMeals>(url, { params: { i: id } })
      .pipe(map(res => this.createRecipe(res.meals[0])));
  }
}
