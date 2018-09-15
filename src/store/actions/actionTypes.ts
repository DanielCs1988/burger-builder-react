export const enum ActionTypes {
    ORDER_INIT = 'ORDER_INIT',
    ORDER_SENT = 'ORDER_SENT',
    ORDER_ARRIVED = 'ORDER_ARRIVED',
    ORDER_FAILED = 'ORDER_FAILED',
    ORDERS_FETCHED = 'ORDERS_FETCHED',
    ORDERS_FETCHED_ERROR = 'ORDERS_FETCHED_ERROR',

    ADD_INGREDIENT = 'ADD_INGREDIENT',
    REMOVE_INGREDIENT = 'REMOVE_INGREDIENT',
    FETCH_INGREDIENTS_STARTED = 'FETCH_INGREDIENTS_START',
    FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS',
    FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENTS_FAILED'
}