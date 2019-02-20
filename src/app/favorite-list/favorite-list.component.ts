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
}
