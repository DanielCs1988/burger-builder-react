import ordersApi from "../../axios-orders";
import { ActionTypes } from './actionTypes';
import { Dispatch } from "redux";
import { Order } from "../../models";
import { createAction } from "../helpers/action-creator";
import { ActionsUnion } from "../types";

export const Actions = {
    orderSent: () => createAction(ActionTypes.ORDER_SENT),
    orderArrived: (order: Order) => createAction(ActionTypes.ORDER_ARRIVED, order),
    orderFailed: (error: Error) => createAction(ActionTypes.ORDER_FAILED, error),
    ordersFetched: (orders: Order[]) => createAction(ActionTypes.ORDERS_FETCHED, orders),
    ordersFetchedError: (error: Error) => createAction(ActionTypes.ORDERS_FETCHED_ERROR, error),
    orderInit: () => createAction(ActionTypes.ORDER_INIT)
};

export const sendOrder = (order: Order) => async (dispatch: Dispatch) => {
    try {
        dispatch(Actions.orderSent());
        const { data } = await ordersApi.post('orders.json', order);
        dispatch(Actions.orderArrived({ ...order, id: data.name }));
    } catch (error) {
        dispatch(Actions.orderFailed(error));
    }
};

export const fetchOrders = () => async (dispatch: Dispatch) => {
    try {
        const { data } = await ordersApi.get('orders.json');
        const orders = Object.keys(data).map(key => ({ ...data[key], id: key }));
        dispatch(Actions.ordersFetched(orders));
    } catch (error) {
        dispatch(Actions.ordersFetchedError(error));
    }
};

export type OrderActions = ActionsUnion<typeof Actions>;