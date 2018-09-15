import ordersApi from "../../axios-orders";
import { ActionTypes } from "./actionTypes";
import {Dispatch} from "redux";
import {Ingredient, Ingredients} from "../../models";
import {createAction} from "../helpers/action-creator";
import {ActionsUnion} from "../types";

export const Actions = {
    addIngredient: (ingredient: Ingredient) => createAction(ActionTypes.ADD_INGREDIENT, ingredient),
    removeIngredient: (ingredient: Ingredient) => createAction(ActionTypes.REMOVE_INGREDIENT, ingredient),
    fetchIngredientsSuccess: (ingredients: Ingredients) => createAction(ActionTypes.FETCH_INGREDIENTS_SUCCESS, ingredients),
    fetchIngredientsFailed: (error: Error) => createAction(ActionTypes.FETCH_INGREDIENTS_FAILED, error),
    fetchIngredientsStarted: () => createAction(ActionTypes.FETCH_INGREDIENTS_STARTED)
};

export const fetchIngredients = () => async (dispatch: Dispatch) => {
    try {
        const { data } = await ordersApi.get('ingredients.json');
        dispatch(Actions.fetchIngredientsSuccess(data));
    } catch (error) {
        dispatch(Actions.fetchIngredientsFailed(error));
    }
};

export type IngredientActions = ActionsUnion<typeof Actions>;