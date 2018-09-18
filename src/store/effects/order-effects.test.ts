import configureStore, { MockStore } from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as nock from 'nock';
import {fetchOrders, sendOrder} from "./orders";
import {DeliveryMethod, Order} from "../../models";
import {Actions} from "../actions/orders";

const storeCreator = configureStore([thunk]);

describe('Order Effects', () => {
    const order: Order = {
        userId: 'VAD3R',
        ingredients: { meat: 10, cheese: 5, bacon: 5 },
        orderData: {
            name: 'admin',
            email: 'abc@qwerty.com',
            street: 'Sesam',
            zipCode: '123',
            deliveryMethod: DeliveryMethod.FASTEST }
    };
    let store: MockStore;

    beforeEach(() => {
        store = storeCreator({});
    });

    afterEach(() => nock.cleanAll());
    afterAll(() => nock.restore());

    it('should handle a successful sendOrder', async () => {
        expect.assertions(1);
        nock('https://burger-builder-738ba.firebaseio.com')
            .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
            .post('/orders.json')
            .reply(200, {
                name: 'abc'
            });
        // @ts-ignore
        await store.dispatch(sendOrder(order));
        const actions = store.getActions();
        expect(actions).toEqual([Actions.orderSent(), Actions.orderArrived({...order, id: 'abc'})]);
    });

    it('should handle errors in sendOrder', async () => {
        expect.assertions(1);
        nock('https://burger-builder-738ba.firebaseio.com')
            .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
            .post('/orders.json')
            .reply(400);
        // @ts-ignore
        await store.dispatch(sendOrder(order));
        const actions = store.getActions();
        expect(actions).toEqual([
            Actions.orderSent(),
            Actions.orderFailed('Request failed with status code 400')
        ]);
    });

    it('should handle a successful fetchOrders', async () => {
        expect.assertions(1);
        nock('https://burger-builder-738ba.firebaseio.com')
            .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
            .get(/\/orders.json/)
            .reply(200, {
                'veryUniqueId': order,
                'anEvenMoreUniqueId': order
            });
        // @ts-ignore
        await store.dispatch(fetchOrders());
        const actions = store.getActions();
        expect(actions).toEqual([Actions.orderSent(), Actions.ordersFetched([
            { ...order, id: 'veryUniqueId' },
            { ...order, id: 'anEvenMoreUniqueId' }
        ])]);
    });

    it('should handle errors in fetchOrders', async () => {
        expect.assertions(1);
        nock('https://burger-builder-738ba.firebaseio.com')
            .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
            .get(/\/orders.json/)
            .reply(400);
        // @ts-ignore
        await store.dispatch(fetchOrders());
        const actions = store.getActions();
        expect(actions).toEqual([
            Actions.orderSent(),
            Actions.ordersFetchedError('Request failed with status code 400')
        ]);
    });
});