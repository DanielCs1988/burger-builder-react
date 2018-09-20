import {all} from "redux-saga/effects";
import {authFlow} from "./effects/auth";
import {ingredientSagas} from "./effects/ingredients";
import {orderSagas} from "./effects/orders";

// TODO: connect an eventChannel factory to an observable - wrap around it

export function* rootSaga() {
    yield all([
        authFlow(),
        ingredientSagas(),
        orderSagas()
    ]);
}