import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>()

  //recipeSelected = new EventEmitter<Recipe>()

  // private recipes: Recipe[] = [
  //   new Recipe('Tasty Schnitzel', 'A super-tasty Schnitzel - just awesome!', 
  //   'https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_1280.png',
  //   [
  //     new Ingredient("Meat", 1),
  //     new Ingredient("French Fries", 20),
  //   ]),
  //   new Recipe('Big Fat Burger', 'What else you need to say?', 
  //   'https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_1280.png',
  //   [
  //     new Ingredient('Buns', 2),
  //     new Ingredient('Meat', 1)
  //   ])
  // ]
  private recipes: Recipe[] = []

  constructor(private slService: ShoppingListService) {} 

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes
    this.recipesChanged.next(recipes.slice())
  }

  getRecipes(){
    return this.recipes.slice()
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients)
  }

  getRecipe(id: number){
    return this.recipes[id]
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe)
    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1)
    this.recipesChanged.next(this.recipes.slice())
  }
}
