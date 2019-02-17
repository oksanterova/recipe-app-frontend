import {
  Component,
  OnInit,
  AfterContentInit,
  AfterViewInit
} from "@angular/core";
import { Observable, Subject } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap
} from "rxjs/operators";

import { ThemealdbService } from "../themealdb.service";
import { Recipe } from "../recipe";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent implements OnInit, AfterViewInit {
  recipes$: Observable<Recipe[]>;

  private queries = new Subject<string>();

  constructor(private themealdbService: ThemealdbService) {}

  search(query: string): void {
    this.queries.next(query);
  }

  ngOnInit() {
    this.recipes$ = this.queries.pipe(
      // wait 300ms after each keystroke before considering the query
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the query changes
      switchMap((query: string) => {
        if (query.length == 0) {
          return this.themealdbService.getLatest();
        } else {
          return this.themealdbService.search(query);
        }
      })
    );
  }
  ngAfterViewInit() {
    this.queries.next("");
  }
}
