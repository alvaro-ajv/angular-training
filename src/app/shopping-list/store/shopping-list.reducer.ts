import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface State {
    ingredients: Ingredient[],
    editedIngredientIndex: number,
    editedIngredient: Ingredient
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ],
    editedIngredientIndex: -1,
    editedIngredient: null
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions){
    switch(action.type){
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload],
                editedIngredientIndex: -1,
                editedIngredient: null

            }
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload],
                editedIngredientIndex: -1,
                editedIngredient: null
            }
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: { ...state.ingredients[action.payload]}
            }
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex]
            const updatedIngredient = {
                ...ingredient,
                ...action.payload
            }
            const updatedIngredients = [...state.ingredients]
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient
            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredientIndex: -1,
                editedIngredient: null
            }
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredientIndex: -1,
                editedIngredient: null
            }

        case ShoppingListActions.DELETE_INGREDIENT:
            const ingredients = [...state.ingredients]
            ingredients.splice(state.editedIngredientIndex, 1)
            return {
                ...state,
                ingredients,
                editedIngredientIndex: -1,
                editedIngredient: null
            }
            
        default:
            return state

    }
}