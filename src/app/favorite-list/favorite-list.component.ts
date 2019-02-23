import { Component, OnInit } from "@angular/core";
import { Favorite } from "../favorite";
import { FavoritesService } from "../favorites.service";

@Component({
  selector: "app-favorite-list",
  templateUrl: "./favorite-list.component.html",
  styleUrls: ["./favorite-list.component.css"]
})
export class FavoriteListComponent implements OnInit {
  favorites: Favorite[];

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    this.favoritesService
      .getFavorites()
      .subscribe(favorites => (this.favorites = favorites));
  }

  deleteFavorite(favorite: Favorite): void {
    this.favoritesService.deleteFavorite(favorite.id).subscribe(v => {
      this.favorites = this.favorites.filter(f => f !== favorite);
    });
  }

  editFavorite(favorite: Favorite): void {
    const label = prompt("Please enter new label", favorite.recipe_label);

    if (label) {
      this.favoritesService
        .updateFavorite(favorite.id, label)
        .subscribe(newFavorite => {
          this.favorites = this.favorites.map(f => {
            if (f.id == newFavorite.id) {
              return newFavorite;
            } else {
              return f;
            }
          });
        });
    } else {
      // cancelled
    }
  }
}
