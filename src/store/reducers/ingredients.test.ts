import reducer, {initialState, PRICES} from "./ingredients";
import {Actions, IngredientActions} from "../actions/ingredients";
import {Ingredient} from "../../models";
import {IngredientState} from "../types";

describe('Ingredients Reducer', () => {

    let defaultState: IngredientState;

    beforeEach(() => {
        defaultState = {
            ...initialState,
            ingredients: {
                meat: 0,
                cheese: 0,
                bacon: 0,
                salad: 1
            }
        };
    });

    it('should return default state on invalid action', () => {
        expect(reducer(defaultState, {} as IngredientActions)).toEqual(defaultState);
    });

    it('should add ingredient', () => {
        const result = reducer(defaultState, Actions.addIngredient(Ingredient.MEAT));
        expect(result).toEqual({
            ...defaultState,
            ingredients: { ...defaultState.ingredients, meat: 1 },
            price: defaultState.price + PRICES['meat']
        });
    });

    it('should remove ingredient', () => {
        const result = reducer(defaultState, Actions.removeIngredient(Ingredient.SALAD));
        expect(result).toEqual({
            ...defaultState,
            ingredients: { ...defaultState.ingredients, salad: 0 },
            price: defaultState.price - PRICES['salad']
        });
    });

    it('should set loading to true when ingredients are being fetched', () => {
        const result = reducer(defaultState, Actions.fetchIngredientsStarted());
        expect(result).toEqual({
            ...defaultState,
            loading: true
        });
    });

    it('should reset reset state and initialize newly fetched ingredients', () => {
        const oldState = {
            ...defaultState,
            loading: true,
            price: 14.2,
            ingredients: {
                ...defaultState.ingredients,
                meat: 10
            }
        };
        const newIngredients = {
            meat: 0,
            cheese: 0,
            bacon: 0,
            salad: 1
        };
        const result = reducer(oldState, Actions.fetchIngredientsSuccess(newIngredients));
        expect(result).toEqual(defaultState);
    });

    it('should register the error and cancel loading when fetching error occurs', () => {
        const error = new Error('(T_T)');
        const result = reducer({...defaultState, loading: true}, Actions.fetchIngredientsFailed(error));
        expect(result).toEqual({
            ...defaultState, error
        });
    });
});