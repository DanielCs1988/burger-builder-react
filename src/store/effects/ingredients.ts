import {Actions, ActionTypes} from "../actions/ingredients";
import {call, put, takeLatest} from "redux-saga/effects";
import * as Api from './api';

export function* ingredientSagas() {
    yield takeLatest(ActionTypes.INIT_FETCH_INGREDIENTS, fetchIngredients);
}

export function* fetchIngredients() {
    try {
        yield put(Actions.fetchIngredientsStarted());
        const data = yield call(Api.getIngredients);
        yield put(Actions.fetchIngredientsSuccess(data));
    } catch (error) {
        yield put(Actions.fetchIngredientsFailed(error.message));
    }
}