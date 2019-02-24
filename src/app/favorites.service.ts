import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Favorite } from "./favorite";
import { map } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class FavoritesService {
  constructor(private http: HttpClient) {}

  // private baseUrl = "http://recipe-app-backend.test/api/favorite";
  private baseUrl =
    "http://recipe-api.oksanakanterova.chas.academy/api/favorite";

  /** GET favorites from the server */
  getFavorites(): Observable<Favorite[]> {
    return this.http
      .get<any>(this.baseUrl)
      .pipe(map(res => res.data.favorites as Favorite[]));
  }

  addFavorite(favorite: Favorite): Observable<Favorite> {
    return this.http.post<Favorite>(this.baseUrl, favorite, httpOptions);
  }

  deleteFavorite(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<void>(url, httpOptions);
  }

  updateFavorite(id: number, label: string): Observable<Favorite> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.patch<Favorite>(url, { recipe_label: label }, httpOptions);
  }
}
