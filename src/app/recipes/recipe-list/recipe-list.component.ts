import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer'


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  @Output() recipeWasSelected = new EventEmitter<Recipe>()
  recipes: Recipe[]
  subscription: Subscription

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscription = this.store.select('recipes').subscribe(
      storeData => {
        this.recipes = storeData.recipes
        if (storeData.error_message){
          console.log(storeData.error_message)
        }
      }
    )
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
