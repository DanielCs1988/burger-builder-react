import { Order } from "../../models";
import { createAction } from "../action-creator";
import { ActionsUnion } from "../types";

export const enum ActionTypes {
    ORDER_INIT = 'ORDER_INIT',
    ORDER_SENT = 'ORDER_SENT',
    ORDER_ARRIVED = 'ORDER_ARRIVED',
    ORDER_FAILED = 'ORDER_FAILED',
    ORDERS_FETCHED = 'ORDERS_FETCHED',
    ORDERS_FETCHED_ERROR = 'ORDERS_FETCHED_ERROR',
    INIT_SEND_ORDER = 'INIT_SEND_ORDER',
    INIT_FETCH_ORDERS = 'INIT_FETCH_ORDERS'
}

export const Actions = {
    orderSent: () => createAction(ActionTypes.ORDER_SENT),
    orderArrived: (order: Order) => createAction(ActionTypes.ORDER_ARRIVED, order),
    orderFailed: (error: string) => createAction(ActionTypes.ORDER_FAILED, error),
    ordersFetched: (orders: Order[]) => createAction(ActionTypes.ORDERS_FETCHED, orders),
    ordersFetchedError: (error: string) => createAction(ActionTypes.ORDERS_FETCHED_ERROR, error),
    orderInit: () => createAction(ActionTypes.ORDER_INIT),
    initSendOrder: (payload: { order: Order, token: string }) => createAction(ActionTypes.INIT_SEND_ORDER, payload),
    initFetchOrders: (payload: { token: string, userId: string }) => createAction(ActionTypes.INIT_FETCH_ORDERS, payload)
};

export type OrderActions = ActionsUnion<typeof Actions>;