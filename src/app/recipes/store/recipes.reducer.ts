import { Recipe } from "../recipe.model";
import * as RecipesActions from './recipes.actions'


export interface State {
    recipes: Recipe[],
    error_message: string
}

const initialState: State = {
    recipes: [],
    error_message: null
}

export function recipeReducer(state = initialState, action: RecipesActions.RecipesActions){
    switch(action.type){
        case RecipesActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload],
                error_message: null
            }
        case RecipesActions.FETCH_RECIPES_FAIL:
            return {
                ...state,
                error_message: action.payload
            }
        case RecipesActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload],
                error_message: null                
            }
        case RecipesActions.UPDATE_RECIPE:
            const updatedRecipe = {
                ...state.recipes[action.payload.index],
                ...action.payload.newRecipe
            }
            const updatedRecipes = [...state.recipes]
            updatedRecipes[action.payload.index] = updatedRecipe
            return {
                ...state,
                recipes: updatedRecipes,
                error_message: null
            }
        case RecipesActions.DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter((r, index) => {
                    return index !== action.payload
                }),
                error_message: null
            }
        default:
            return state
    }
}