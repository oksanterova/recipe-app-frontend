import { Injectable } from "@angular/core";
import { Observable, of, ReplaySubject } from "rxjs";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { switchMap } from "rxjs/operators";

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
  constructor(private http: HttpClient) {
    this.token.next(localStorage.getItem("token"));
  }

  private baseUrl = "http://recipe-app-backend.test/api/auth";
  private logoutUrl = `${this.baseUrl}/logout`;
  private loginUrl = `${this.baseUrl}/login`;
  private meUrl = `${this.baseUrl}/me`;

  token = new ReplaySubject<string>(1);

  login(email: string, password: string): Observable<User> {
    const credentials = { email, password };

    return this.http.post<Token>(this.loginUrl, credentials, httpOptions).pipe(
      switchMap(data => {
        localStorage.setItem("token", data.access_token);
        this.token.next(data.access_token);
        return this.me();
      })
    );
  }

  me(): Observable<User> {
    return this.token.pipe(
      switchMap(token => {
        if (token) {
          return this.http.post<User>(this.meUrl, httpOptions);
        } else {
          return of(null);
        }
      })
    );
  }

  currentToken(): string {
    return localStorage.getItem("token");
  }

  removeToken(): void {
    localStorage.removeItem("token");
    this.token.next(null);
  }

  logout(): void {
    const token = this.currentToken();

    if (token) {
      this.removeToken();

      this.http.post<void>(this.logoutUrl, {}, httpOptions);
    }
  }
}
