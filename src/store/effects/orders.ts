import {Actions} from "../actions/orders";
import {call, put} from "redux-saga/effects";
import * as Api from './api';

export function* sendOrder(action: any) {
    const { order, token } = action.payload;
    try {
        yield put(Actions.orderSent());
        const { data } = yield call(Api.sendOrder, order, token);
        yield put(Actions.orderArrived({ ...order, id: data.name }));
    } catch (error) {
        yield put(Actions.orderFailed(error.message));
    }
}

export function* fetchOrders(action: any) {
    const { token, userId } = action.payload;
    try {
        yield put(Actions.orderSent());
        const { data } = yield call(Api.getOrders, token, userId);
        const orders = Object.keys(data).map(key => ({ ...data[key], id: key }));
        yield put(Actions.ordersFetched(orders));
    } catch (error) {
        yield put(Actions.ordersFetchedError(error.message));
    }
}