import {IngredientState} from "../types";
import {ActionTypes, IngredientActions} from "../actions/ingredients";

export const initialState: IngredientState = {
    ingredients: {},
    price: 4,
    error: null,
    loading: false,
    building: false
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
                building: true,
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
            const newPrice = state.price - PRICES[action.payload];
            return {
                ...state,
                building: newPrice !== initialState.price,
                price: newPrice,
                ingredients: {
                    ...state.ingredients,
                    [action.payload]: state.ingredients[action.payload]! - 1
                }
            };
        case ActionTypes.FETCH_INGREDIENTS_STARTED:
            return {
                ...state,
                building: false,
                loading: true
            };
        case ActionTypes.FETCH_INGREDIENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                price: initialState.price + Object.keys(action.payload)
                    .map(ingKey => PRICES[ingKey] * action.payload[ingKey])
                    .reduce((a, b) => a + b, 0),
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