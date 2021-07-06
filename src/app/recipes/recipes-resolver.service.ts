import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";
import * as fromApp from '../store/app.reducer'
import * as RecipesActions from './store/recipes.actions'
import { Store } from "@ngrx/store";
import { map, switchMap, take } from "rxjs/operators";
import { of } from "rxjs";
import { Actions, ofType } from "@ngrx/effects";

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{
    constructor( 
        private dataStorageService: DataStorageService, 
        private recipesService: RecipeService,
        private store: Store<fromApp.AppState>,
        private actions$: Actions
    ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.store.select('recipes').pipe(
            take(1), //Executes the observable only one time
            map(recipesState => {
                return recipesState.recipes
            }),
            switchMap(recipes => {
                if(recipes.length === 0){
                    this.store.dispatch(new RecipesActions.FetchRecipes())
                    return this.actions$.pipe(ofType(RecipesActions.SET_RECIPES), take(1))
                }else{
                    return of(recipes)
                }
            })
        )        
        // const recipes = this.recipesService.getRecipes()
        // if(recipes.length == 0 ){
        //     return this.dataStorageService.fetchRecipes() // you dont need to subscribe to the observable because the router do that automatically            
        // } else{
        //     return recipes
        // }

    }
}