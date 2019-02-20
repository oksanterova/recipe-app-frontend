import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Favorite } from "./favorite";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class FavoritesService {
  constructor(private http: HttpClient) {}

  private baseUrl = "api/favorites";

  /** GET favorites from the server */
  getFavorites(): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(this.baseUrl);
  }

  addFavorite(favorite: Favorite): Observable<Favorite> {
    return this.http.post<Favorite>(this.baseUrl, favorite, httpOptions);
  }

    deleteFavorite(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<void>(url, httpOptions);
  }
}
