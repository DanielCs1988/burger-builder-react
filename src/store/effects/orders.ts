import {Order} from "../../models";
import {Dispatch} from "redux";
import ordersApi from "../../axios-orders";
import {Actions} from "../actions/orders";

export const sendOrder = (order: Order) => async (dispatch: Dispatch) => {
    try {
        dispatch(Actions.orderSent());
        const { data } = await ordersApi.post('orders.json', order);
        dispatch(Actions.orderArrived({ ...order, id: data.name }));
    } catch (error) {
        dispatch(Actions.orderFailed(error.message));
    }
};

export const fetchOrders = () => async (dispatch: Dispatch) => {
    try {
        dispatch(Actions.orderSent());
        const { data } = await ordersApi.get('orders.json');
        const orders = Object.keys(data).map(key => ({ ...data[key], id: key }));
        dispatch(Actions.ordersFetched(orders));
    } catch (error) {
        dispatch(Actions.ordersFetchedError(error.message));
    }
};