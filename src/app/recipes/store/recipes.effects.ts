import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import { Recipe } from "../recipe.model";
import * as RecipesActions from './recipes.actions'
import * as fromApp from '../../store/app.reducer'

@Injectable()
export class RecipeEffects {
    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(() => {
            return this.http.get<Recipe[]>(
                'https://ng-recipes-d6442-default-rtdb.firebaseio.com/recipes.json'
            ).pipe(
                map(
                    recipes => {
                        return recipes.map(recipe => {
                            return {
                                ...recipe,
                                ingredients: recipe.ingredients? recipe.ingredients: []
                            }
                        })    
                    }
                ),
                map(
                    recipes => {
                        return new RecipesActions.SetRecipes(recipes)
                    }
                ),
                catchError(error => {
                    return of(new RecipesActions.FetchRecipesFail('An error occurred!'))
                }),
            )
        })
    )

    @Effect({dispatch: false})
    storeRecipes = this.actions$.pipe(
        ofType(RecipesActions.STORE_RECIPES),
        withLatestFrom(
            this.store.select('recipes')
        ),
        switchMap(([actionData, recipesState])=> {
            return this.http
            .put(
                'https://ng-recipes-d6442-default-rtdb.firebaseio.com/recipes.json',
                recipesState.recipes
            )
        })
    )

    constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}
}