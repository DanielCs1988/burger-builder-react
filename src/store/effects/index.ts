import {all, takeEvery, takeLatest} from "redux-saga/effects";
import {ActionTypes as AuthActions} from "../actions/auth";
import {ActionTypes as IngredientActions} from "../actions/ingredients";
import {ActionTypes as OrderActions} from "../actions/orders";
import {authenticate, logout, logoutWhenTokenExpires, tryAuthenticate} from "./auth";
import {fetchIngredients} from "./ingredients";
import {fetchOrders, sendOrder} from "./orders";

export function* sagas() {
    yield all([
        takeEvery(AuthActions.INIT_LOGOUT, logout),
        takeEvery(AuthActions.INIT_LOGOUT_TIMER, logoutWhenTokenExpires),
        takeEvery(AuthActions.INIT_AUTHENTICATE, authenticate),
        takeEvery(AuthActions.INIT_TRY_AUTHENTICATE, tryAuthenticate),

        takeLatest(IngredientActions.INIT_FETCH_INGREDIENTS, fetchIngredients),

        takeLatest(OrderActions.INIT_SEND_ORDER, sendOrder),
        takeLatest(OrderActions.INIT_FETCH_ORDERS, fetchOrders)
    ]);
}