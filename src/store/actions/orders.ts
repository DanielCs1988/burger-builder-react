import { Order } from "../../models";
import { createAction } from "../helpers/action-creator";
import { ActionsUnion } from "../types";

export const enum ActionTypes {
    ORDER_INIT = 'ORDER_INIT',
    ORDER_SENT = 'ORDER_SENT',
    ORDER_ARRIVED = 'ORDER_ARRIVED',
    ORDER_FAILED = 'ORDER_FAILED',
    ORDERS_FETCHED = 'ORDERS_FETCHED',
    ORDERS_FETCHED_ERROR = 'ORDERS_FETCHED_ERROR'
}

export const Actions = {
    orderSent: () => createAction(ActionTypes.ORDER_SENT),
    orderArrived: (order: Order) => createAction(ActionTypes.ORDER_ARRIVED, order),
    orderFailed: (error: string) => createAction(ActionTypes.ORDER_FAILED, error),
    ordersFetched: (orders: Order[]) => createAction(ActionTypes.ORDERS_FETCHED, orders),
    ordersFetchedError: (error: string) => createAction(ActionTypes.ORDERS_FETCHED_ERROR, error),
    orderInit: () => createAction(ActionTypes.ORDER_INIT)
};

export type OrderActions = ActionsUnion<typeof Actions>;