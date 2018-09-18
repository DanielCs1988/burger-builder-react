import reducer, {initialState, PRICES} from "./ingredients";
import {Actions, IngredientActions} from "../actions/ingredients";
import {Ingredient} from "../../models";
import {IngredientState} from "../types";

describe('Ingredients Reducer', () => {

    let defaultState: IngredientState;

    beforeEach(() => {
        defaultState = {
            ...initialState,
            building: true,
            price: 4.70,
            ingredients: {
                meat: 0,
                cheese: 1,
                bacon: 0,
                salad: 1
            }
        };
    });

    it('should return default state on invalid action', () => {
        expect(reducer(defaultState, {} as IngredientActions)).toEqual(defaultState);
    });

    it('should add ingredient and leave building true', () => {
        const result = reducer(defaultState, Actions.addIngredient(Ingredient.MEAT));
        expect(result).toEqual({
            ...defaultState,
            building: true,
            ingredients: { ...defaultState.ingredients, meat: 1 },
            price: defaultState.price + PRICES['meat']
        });
    });

    it('should remove ingredient and leave building true when any ingredients are left', () => {
        const result = reducer(defaultState, Actions.removeIngredient(Ingredient.SALAD));
        expect(result).toEqual({
            ...defaultState,
            building: true,
            ingredients: { ...defaultState.ingredients, salad: 0 },
            price: defaultState.price - PRICES['salad']
        });
    });

    it('should set building to false when all the ingredients are removed', () => {
        const currentState = {
            ...defaultState,
            price: 4.20,
            ingredients: { ...defaultState.ingredients, cheese: 0 }
        };
        const result = reducer(currentState, Actions.removeIngredient(Ingredient.SALAD));
        expect(result).toEqual({
            ...currentState,
            building: false,
            ingredients: { ...currentState.ingredients, salad: 0 },
            price: currentState.price - PRICES['salad']
        });
    });

    it('should set loading to true and building to false when ingredients are being fetched', () => {
        const result = reducer(defaultState, Actions.fetchIngredientsStarted());
        expect(result).toEqual({
            ...defaultState,
            loading: true,
            building: false
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
            cheese: 1,
            bacon: 0,
            salad: 1
        };
        const result = reducer(oldState, Actions.fetchIngredientsSuccess(newIngredients));
        expect(result).toEqual(defaultState);
    });

    it('should register the error and cancel loading when fetching error occurs', () => {
        const result = reducer({...defaultState, loading: true}, Actions.fetchIngredientsFailed('(T_T)'));
        expect(result).toEqual({
            ...defaultState, error: '(T_T)'
        });
    });
});