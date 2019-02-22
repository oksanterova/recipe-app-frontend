import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { tap, map, switchMap } from "rxjs/operators";

export class User {
  name: string;
  email: string;
}

interface Token {
  access_token: string;
}

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private baseUrl = "http://recipe-app-backend.test/api/auth";
  private logoutUrl = `${this.baseUrl}/logout`;
  private loginUrl = `${this.baseUrl}/login`;
  private meUrl = `${this.baseUrl}/me`;

  login(email: string, password: string): Observable<User> {
    const credentials = { email, password };

    return this.http.post<Token>(this.loginUrl, credentials, httpOptions).pipe(
      switchMap(data => {
        localStorage.setItem("token", data.access_token);
        return this.me();
      })
    );
  }

  me(): Observable<User> {
    if (this.currentToken()) {
      return this.http.post<User>(this.meUrl, httpOptions);
    } else {
      return of(null);
    }
  }

  currentToken(): string | null {
    return localStorage.getItem("token");
  }

  removeToken(): void {
    return localStorage.removeItem("token");
  }

  logout(): Observable<void> {
    if (this.currentToken()) {
      return this.http.post<void>(this.logoutUrl, {}, httpOptions);
    } else {
      return of(null);
    }
  }
}
