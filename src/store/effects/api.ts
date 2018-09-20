import axios from 'axios';
import {Credentials, Order} from "../../models";

const ordersBaseUrl = 'https://burger-builder-738ba.firebaseio.com';
const registerEndpoint = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser';
const loginEndpoint = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword';
const key = 'AIzaSyBXA34yX9HExl3Hvdl1dN6fvr4fuVbaVS4';

export const authenticate = async (isLogin: boolean, credentials: Credentials) => {
    const endpoint = isLogin ? loginEndpoint : registerEndpoint;
    const { data } = await axios.post(
        endpoint,
        { ...credentials, returnSecureToken: true },
        { params: { key } }
    );
    return data;
};

export const getIngredients = async () => {
    const { data } = await axios.get(`${ordersBaseUrl}/ingredients.json`);
    return data;
};

export const getOrders = async (token: string, userId: string) => {
    const params = { auth: token, orderBy: '"userId"', equalTo: `"${userId}"` };
    const { data } = await axios.get(`${ordersBaseUrl}/orders.json`, { params });
    return data;
};

export const sendOrder = async (order: Order, token: string) => {
    const params = { auth: token };
    const { data } = await axios.post(`${ordersBaseUrl}/orders.json`, order, { params });
    return data;
};