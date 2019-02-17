import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Recipe } from "./recipe";

interface EdamamHits {
  hits: EdamamHit[];
}

interface EdamamHit {
  recipe: Recipe;
}

@Injectable({
  providedIn: "root"
})
export class EdamamService {
  constructor(private http: HttpClient) {}

  app_id = "fdb0a900";
  app_key = "805c92f373e4cb03216e2bc4c4cc2da4";
  base_url = "https://api.edamam.com/search";

  getRecipes(): Observable<Recipe[]> {
    return this.http
      .get<EdamamHits>(this.base_url, {
        params: {
          q: "owl",
          app_id: this.app_id,
          app_key: this.app_key
        }
      })
      .pipe(
        map(res =>
          res.hits.map(hit => {
            return hit.recipe;
          })
        )
      );
  }

  getRecipe(uri: string): Observable<Recipe> {
    return this.http
      .get<Recipe[]>(this.base_url, {
        params: {
          r: uri,
          app_id: this.app_id,
          app_key: this.app_key
        }
      })
      .pipe(map(res => res[0]));
  }
}
