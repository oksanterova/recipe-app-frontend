import { Component, OnInit } from "@angular/core";
import { AuthService, User } from "../auth.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  private user$: Observable<User>;
  private hasToken: boolean;

  ngOnInit() {
    this.user$ = this.authService.me();
    this.hasToken = this.authService.currentToken() != null;
  }
}
