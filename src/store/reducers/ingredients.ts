import { ActionTypes } from "../actions/actionTypes";
import {IngredientState} from "../types";
import {IngredientActions} from "../actions/ingredients";

export const initialState: IngredientState = {
    ingredients: {},
    price: 4,
    error: null,
    loading: false
};

export const PRICES = {
    'salad': 0.2,
    'bacon': 0.3,
    'cheese': 0.5,
    'meat': 1
};

const reducer = (state = initialState, action: IngredientActions) => {
    switch (action.type) {
        case ActionTypes.ADD_INGREDIENT:
            return {
                ...state,
                price: state.price + PRICES[action.payload],
                ingredients: {
                    ...state.ingredients,
                    [action.payload]: state.ingredients[action.payload]! + 1
                }
            };
        case ActionTypes.REMOVE_INGREDIENT:
            if (state.ingredients[action.payload]! < 1) {
                return state;
            }
            return {
                ...state,
                price: state.price - PRICES[action.payload],
                ingredients: {
                    ...state.ingredients,
                    [action.payload]: state.ingredients[action.payload]! - 1
                }
            };
        case ActionTypes.FETCH_INGREDIENTS_STARTED:
            return {
                ...state,
                loading: true
            };
        case ActionTypes.FETCH_INGREDIENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                price: initialState.price,
                ingredients: action.payload
            };
        case ActionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default reducer;