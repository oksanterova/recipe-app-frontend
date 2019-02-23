import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { FavoriteListComponent } from "./favorite-list/favorite-list.component";
import { AuthGuard } from "./auth.guard";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
  { path: "", redirectTo: "recipes", pathMatch: "full" },
  { path: "recipes/:id", component: RecipeDetailComponent },
  { path: "recipes", component: RecipeListComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },

  {
    path: "favorites",
    component: FavoriteListComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
