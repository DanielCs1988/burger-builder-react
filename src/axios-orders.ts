import axios from 'axios';

const ordersApi = axios.create({
    baseURL: 'https://burger-builder-738ba.firebaseio.com/'
});

export default ordersApi;