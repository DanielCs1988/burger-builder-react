import axios from 'axios';
import {Credentials, Order} from "../../models";

const ordersBaseUrl = 'https://burger-builder-738ba.firebaseio.com';
const registerEndpoint = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser';
const loginEndpoint = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword';
const key = 'AIzaSyBXA34yX9HExl3Hvdl1dN6fvr4fuVbaVS4';

export const authenticate = (isLogin: boolean, credentials: Credentials) => {
    const endpoint = isLogin ? loginEndpoint : registerEndpoint;
    return axios.post(
        endpoint,
        { ...credentials, returnSecureToken: true },
        { params: { key } }
    );
};

export const getIngredients = () => {
    return axios.get(`${ordersBaseUrl}/ingredients.json`);
};

export const getOrders = (token: string, userId: string) => {
    const params = { auth: token, orderBy: '"userId"', equalTo: `"${userId}"` };
    return axios.get(`${ordersBaseUrl}/orders.json`, { params });
};

export const sendOrder = (order: Order, token: string) => {
    const params = { auth: token };
    return axios.post(`${ordersBaseUrl}/orders.json`, order, { params });
};