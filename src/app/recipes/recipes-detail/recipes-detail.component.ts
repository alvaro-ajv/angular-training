import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as fromApp from '../../store/app.reducer'
import * as RecipesActions from '../store/recipes.actions'
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {

  //@Input() recipe: Recipe

  recipe: Recipe
  id: number

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.route.params.pipe(
      map(param => {
        return +param.id
      }),
      switchMap(id => {
        this.id = id
        return this.store.select('recipes')
      }),
      map(recipesState => {
        return recipesState.recipes.find((r,i) => {
          return i == this.id
        })
      })
    ).subscribe(recipe => {
      this.recipe = recipe
    })
  }

  onAddToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }

  onEditRecipe(){
    //this.router.navigate(['edit'], {relativeTo: this.route})
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route})
  }

  onDeleteRecipe(){
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id))
    this.router.navigate(['../'], {relativeTo: this.route})
  }

}
