import reducer, { initialState } from "./orders";
import { Actions, OrderActions } from "../actions/orders";
import { OrderState } from "../types";
import { DeliveryMethod, Order } from "../../models";

describe('Ingredients Reducer', () => {

    const testOrder: Order = {
        id: 'veryUniqueId',
        ingredients: { meat: 10, bacon: 5, cheese: 5 },  // Bacon is veggie
        orderData: {
            name: 'John Cena',
            email: 'release@the.memes',
            zipCode: 'zip.it',
            street: '01011001',
            deliveryMethod: DeliveryMethod.FASTEST
        }
    };
    const otherOrder = { ...testOrder, id: 'too_lazy_to_modify_anything_else' };
    let defaultState: OrderState;

    beforeEach(() => {
        defaultState = {
            ...initialState,
            orders: [ testOrder ]
        };
    });

    it('should return default state on invalid action', () => {
        expect(reducer(defaultState, {} as OrderActions)).toEqual(defaultState);
    });

    it('should initialize the burger App after redirecting to the Burger Builder', () => {
        const result = reducer({ ...defaultState, purchased: true }, Actions.orderInit());
        expect(result).toEqual(defaultState);
    });

    it('should turn on loading when an order was sent', () => {
        const result = reducer(defaultState, Actions.orderSent());
        expect(result).toEqual({ ...defaultState, loading: true });
    });

    it('should turn off loading when sending an order resulted in an error', () => {
        const result = reducer(
            { ...defaultState, loading: true },
            Actions.orderFailed(new Error('Oops...'))
        );
        expect(result).toEqual(defaultState);
    });

    it('should turn off loading when fetching orders resulted in an error', () => {
        const result = reducer(
            { ...defaultState, loading: true },
            Actions.ordersFetchedError(new Error('Oops...'))
        );
        expect(result).toEqual(defaultState);
    });

    it('should set global UI state and register new order in the cache when the ID arrives', () => {
        const result = reducer({ ...defaultState, loading: true }, Actions.orderArrived(otherOrder));
        expect(result).toEqual({
            ...defaultState,
            loading: false,
            purchased: true,
            orders: [ testOrder, otherOrder ]
        });
    });

    it('should save fetched orders', () => {
        const result = reducer(
            { ...defaultState, loading: true, orders: [] },
            Actions.ordersFetched([ testOrder, otherOrder ])
        );
        expect(result).toEqual({
            ...defaultState,
            loading: false,
            fetched: true,
            orders: [ testOrder, otherOrder ]
        });
    });

    it('should not save orders that are already present in the cache', () => {
        const result = reducer(
            { ...defaultState, loading: true },
            Actions.ordersFetched([ testOrder, otherOrder ])
        );
        expect(result).toEqual({
            ...defaultState,
            loading: false,
            fetched: true,
            orders: [ otherOrder, testOrder ]
        });
    });
});