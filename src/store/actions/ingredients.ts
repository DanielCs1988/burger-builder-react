import {Ingredient, Ingredients} from "../../models";
import {createAction} from "../helpers/action-creator";
import {ActionsUnion} from "../types";

export const enum ActionTypes {
    ADD_INGREDIENT = 'ADD_INGREDIENT',
    REMOVE_INGREDIENT = 'REMOVE_INGREDIENT',
    FETCH_INGREDIENTS_STARTED = 'FETCH_INGREDIENTS_START',
    FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS',
    FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENTS_FAILED'
}

export const Actions = {
    addIngredient: (ingredient: Ingredient) => createAction(ActionTypes.ADD_INGREDIENT, ingredient),
    removeIngredient: (ingredient: Ingredient) => createAction(ActionTypes.REMOVE_INGREDIENT, ingredient),
    fetchIngredientsSuccess: (ingredients: Ingredients) => createAction(ActionTypes.FETCH_INGREDIENTS_SUCCESS, ingredients),
    fetchIngredientsFailed: (error: string) => createAction(ActionTypes.FETCH_INGREDIENTS_FAILED, error),
    fetchIngredientsStarted: () => createAction(ActionTypes.FETCH_INGREDIENTS_STARTED)
};

export type IngredientActions = ActionsUnion<typeof Actions>;