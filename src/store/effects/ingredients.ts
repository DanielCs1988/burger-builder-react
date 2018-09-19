import {Actions, IngredientActions} from "../actions/ingredients";
import {call, put} from "redux-saga/effects";
import * as Api from './api';

export function* fetchIngredients(action: IngredientActions) {
    try {
        yield put(Actions.fetchIngredientsStarted());
        const { data } = yield call(Api.getIngredients);
        yield put(Actions.fetchIngredientsSuccess(data));
    } catch (error) {
        yield put(Actions.fetchIngredientsFailed(error.message));
    }
}