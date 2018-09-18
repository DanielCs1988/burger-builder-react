import {Order} from "../../models";
import {Dispatch} from "redux";
import ordersApi from "../../axios-orders";
import {Actions} from "../actions/orders";

export const sendOrder = (order: Order, token: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(Actions.orderSent());
        const { data } = await ordersApi.post('orders.json', order, { params: { auth: token } });
        dispatch(Actions.orderArrived({ ...order, id: data.name }));
    } catch (error) {
        dispatch(Actions.orderFailed(error.message));
    }
};

export const fetchOrders = (token: string, userId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(Actions.orderSent());
        const params = { auth: token, orderBy: '"userId"', equalTo: `"${userId}"` };
        const { data } = await ordersApi.get('orders.json', { params });
        const orders = Object.keys(data).map(key => ({ ...data[key], id: key }));
        dispatch(Actions.ordersFetched(orders));
    } catch (error) {
        dispatch(Actions.ordersFetchedError(error.message));
    }
};