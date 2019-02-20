import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, Subject, of } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
  tap
} from "rxjs/operators";

import { ThemealdbService } from "../themealdb.service";
import { Recipe, Category } from "../recipe";
import { FavoritesService } from "../favorites.service";
import { Favorite } from "../favorite";

class Filter {
  query?: string;
  category?: string;
}

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent implements OnInit, AfterViewInit {
  recipes$: Observable<Recipe[]>;
  categories$: Observable<Category[]>;
  activeCategory?: string;
  favorites: Favorite[];

  private filters = new Subject<Filter>();

  constructor(
    private themealdbService: ThemealdbService,
    private favoritesService: FavoritesService,
    private route: ActivatedRoute
  ) {}

  search(query: string): void {
    this.filters.next({ query: query });
    document.querySelector("#recipes").scrollIntoView();
  }

  filter(category: string): void {
    this.filters.next({ category: category });
    document.querySelector("#recipes").scrollIntoView();
  }

  removeFilter(): void {
    this.filters.next({});
    document.querySelector("#recipes-sidebar").scrollIntoView();
  }

  addFavorite(recipe: Recipe): void {
    this.favoritesService
      .addFavorite({
        recipe_id: recipe.id,
        recipe_label: recipe.label,
        recipe_image: recipe.image
      })
      .subscribe(favorite => {
        this.favorites.push(favorite);
      });
  }

  deleteFavorite(recipe: Recipe): void {
    const favorite = this.favorites.find(f => f.recipe_id === recipe.id);

    if (favorite) {
      this.favoritesService.deleteFavorite(favorite.id).subscribe(_ => {
        this.favorites = this.favorites.filter(f => f !== favorite);
      });
    }
  }

  isFavorite(recipe: Recipe): boolean {
    if (this.favorites === undefined) {
      return false;
    }

    return this.favorites.some(f => f.recipe_id === recipe.id);
  }

  ngOnInit() {
    this.filters.subscribe(filter => {
      this.activeCategory = filter.category;
    });
    this.activeCategory = this.route.snapshot.queryParamMap.get("category");

    this.recipes$ = this.filters.pipe(
      // wait 300ms after each keystroke before considering the query
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the query changes
      switchMap((filter: Filter) => {
        if (filter.query) {
          if (filter.query.length == 0) {
            return this.themealdbService.getLatest();
          } else {
            return this.themealdbService.search(filter.query);
          }
        } else if (filter.category) {
          return this.themealdbService.filter(filter.category);
        } else {
          return this.themealdbService.getLatest();
        }
      })
    );

    this.favoritesService
      .getFavorites()
      .subscribe(favorites => (this.favorites = favorites));

    this.categories$ = this.themealdbService.getCategories();
  }

  ngAfterViewInit() {
    const category = this.route.snapshot.queryParamMap.get("category");

    this.filters.next({ category: category });
  }
}
