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

  private filters = new Subject<Filter>();

  constructor(
    private themealdbService: ThemealdbService,
    private route: ActivatedRoute
  ) {}

  search(query: string): void {
    this.filters.next({ query: query });
  }

  filter(category: string): void {
    this.filters.next({ category: category });
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

    this.categories$ = this.themealdbService.getCategories();
  }

  ngAfterViewInit() {
    const category = this.route.snapshot.queryParamMap.get("category");

    this.filters.next({ category: category });
  }
}
