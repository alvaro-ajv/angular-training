import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RecipeService } from '../recipe.service';
import * as fromApp from '../../store/app.reducer'
import * as RecipesActions from '../store/recipes.actions'
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css']
})
export class RecipesEditComponent implements OnInit {
  id: number
  editMode = false
  recipeForm: FormGroup
  storeSub: Subscription

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id']
        this.editMode = params['id'] != null
        this.initForm()
      }
    )
  }

  onSubmit(){
    const value = this.recipeForm.value
    // const newRecipe = new Recipe(value['name'], value['description'], value['imagePath'], value['ingredients'])
    if (this.editMode) {
      this.store.dispatch(new RecipesActions.UpdateRecipe({index: this.id, newRecipe: value}))
    }else{
      this.store.dispatch(new RecipesActions.AddRecipe(value))
    }
    this.onCancel()
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private initForm() {
    let recipeName = ''
    let recipeImgPath = ''
    let recipeDescription = ''
    let recipeIngredients = new FormArray([])

    if (this.editMode) {
      this.storeSub = this.store.select('recipes').pipe(
        map(recipesState => {
          return recipesState.recipes.find((e,i)=> {
            return i == this.id
          })
        })
      ).subscribe(
        recipe => {
          recipeName = recipe.name
          recipeImgPath = recipe.imagePath
          recipeDescription = recipe.description
          if (recipe.ingredients) {
            for(let ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  'name': new FormControl(ingredient.name, Validators.required),
                  'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)])
                })
              )
            }
          }
        }
      )
      
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImgPath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    })
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)])
    }))
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

}
