import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { FavoriteListComponent } from "./favorite-list/favorite-list.component";

const routes: Routes = [
  { path: "recipes/:id", component: RecipeDetailComponent },
  { path: "recipes", component: RecipeListComponent },
  { path: "favorites", component: FavoriteListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
