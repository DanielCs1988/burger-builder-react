import {fetchOrders, sendOrder as sendOrderSaga} from "./orders";
import {call, put} from "redux-saga/effects";
import {Actions} from "../actions/orders";
import * as Api from './api';

describe('Orders Sagas', () => {

    const order = {
        ingredients: { meat: 200, cheese: 120, bacon: 80, salad: 1 },
        userId: 'KEKL0RD',
        orderData: {}
    };

    describe('when sending orders', () => {
        const action = {
            payload: {
                token: 'T0K3N',
                order
            }
        };

        it('should send an Order', () => {
            const saga = sendOrderSaga(action);
            expect(saga.next().value).toEqual(put(Actions.orderSent()));
            expect(saga.next().value).toEqual(call(Api.sendOrder, action.payload.order, action.payload.token));
            expect(saga.next({ name: 'actuallyId' }).value)
                .toEqual(put(Actions.orderArrived({ ...action.payload.order, id: 'actuallyId' })));
            expect(saga.next().done).toBe(true);
        });

        it('should handle sendError errors', () => {
            const saga = sendOrderSaga(action);
            const error = new Error('Oops...');
            expect(saga.next().value).toEqual(put(Actions.orderSent()));
            expect(saga.throw!(error).value).toEqual(put(Actions.orderFailed('Oops...')));
        });
    });

    describe('when fetching orders', () => {
        const action = {
            payload: {
                token: 'T0KK3N',
                userId: 'Joe'
            }
        };

        it('should fetch the orders and map them', () => {
            const saga = fetchOrders(action);
            expect(saga.next().value).toEqual(put(Actions.orderSent()));
            expect(saga.next().value).toEqual(call(Api.getOrders, action.payload.token, action.payload.userId));
            expect(saga.next({ 'id': order, 'otherId': order }).value)
                .toEqual(put(Actions.ordersFetched([ { ...order, id: 'id' }, { ...order, id: 'otherId' } ])));
            expect(saga.next().done).toBe(true);
        });

        it('should handle errors when fetching orders fails', () => {
            const saga = fetchOrders(action);
            const error = new Error('Oops...');
            expect(saga.next().value).toEqual(put(Actions.orderSent()));
            expect(saga.throw!(error).value).toEqual(put(Actions.ordersFetchedError('Oops...')));
        });
    });
});