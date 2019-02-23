import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error = "";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.register(this.f.name.value, this.f.email.value, this.f.password.value).subscribe(
      user => {
        this.router.navigate(["/recipes"]);
      },
      error => {
        this.error = error;
        this.loading = false;
      }
    );
  }
}
