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

  // private baseUrl = "http://recipe-app-backend.test/api";
  private baseUrl = "http://recipe-api.oksanakanterova.chas.academy/api";

  private registerUrl = `${this.baseUrl}/register`;
  private logoutUrl = `${this.baseUrl}/auth/logout`;
  private loginUrl = `${this.baseUrl}/auth/login`;
  private meUrl = `${this.baseUrl}/auth/me`;

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

  register(name: string, email: string, password: string): Observable<User> {
    const credentials = { name, email, password };

    return this.http.post<any>(this.registerUrl, credentials, httpOptions).pipe(
      switchMap(data => {
        return this.login(email, password);
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
