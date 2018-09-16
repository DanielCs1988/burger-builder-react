import { ActionTypes } from "../actions/orders";
import { OrderActions } from "../actions/orders";
import { OrderState } from "../types";

export const initialState: OrderState = {
    orders: [],
    loading: false,
    fetched: false,
    purchased: false
};

const reducer = (state = initialState, action: OrderActions) => {
    switch (action.type) {
        case ActionTypes.ORDER_INIT:
            return {
                ...state,
                purchased: false
            };
        case ActionTypes.ORDER_SENT:
            return {
                ...state,
                loading: true
            };
        case ActionTypes.ORDER_FAILED:
        case ActionTypes.ORDERS_FETCHED_ERROR:
            return {
                ...state,
                loading: false
            };
        case ActionTypes.ORDER_ARRIVED:
            return {
                ...state,
                orders: [...state.orders, action.payload],
                loading: false,
                purchased: true
            };
        case ActionTypes.ORDERS_FETCHED:
            const presentOrderIds = new Set(state.orders.map(order => order.id));
            return {
                ...state,
                orders: [
                    ...action.payload.filter(order => !presentOrderIds.has(order.id)),  // Filter duplicates
                    ...state.orders
                ],
                loading: false,
                fetched: true
            };
        default:
            return state;
    }
};

export default reducer;