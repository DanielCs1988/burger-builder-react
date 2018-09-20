import {fetchIngredients} from "./ingredients";
import {call, put} from "redux-saga/effects";
import {Actions} from "../actions/ingredients";
import * as Api from './api';

describe('Ingredient Saga', () => {

    it('should fetch ingredients from the server', () => {
        const saga = fetchIngredients();
        const data = { meat: 0, cheese: 1, bacon: 12 };
        expect(saga.next().value).toEqual(put(Actions.fetchIngredientsStarted()));
        expect(saga.next().value).toEqual(call(Api.getIngredients));
        expect(saga.next(data).value).toEqual(put(Actions.fetchIngredientsSuccess(data)));
        expect(saga.next().done).toBe(true);
    });
});