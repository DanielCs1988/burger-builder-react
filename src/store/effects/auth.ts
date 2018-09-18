import axios from 'axios';
import {Credentials} from "../../models";
import {Actions} from "../actions/auth";

const registerEndpoint = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser';
const loginEndpoint = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword';
const key = 'AIzaSyBXA34yX9HExl3Hvdl1dN6fvr4fuVbaVS4';

export const register = (credentials: Credentials) => async (dispatch: any) => {
    return authenticate(false, credentials, dispatch);
};

export const login = (credentials: Credentials) => async (dispatch: any) => {
    return authenticate(true, credentials, dispatch);
};

const authenticate = async (isLogin: boolean, credentials: Credentials, dispatch: any) => {
    try {
        const endpoint = isLogin ? loginEndpoint : registerEndpoint;
        dispatch(Actions.authStart());
        const { data: { idToken, localId, expiresIn } } = await axios.post(
            endpoint,
            { ...credentials, returnSecureToken: true },
            { params: { key } }
        );
        const expiresAt = new Date().getTime() + expiresIn * 1000 + '';
        storeAuthPayload(idToken, localId, expiresAt);
        dispatch(Actions.authSuccess({ idToken, userId: localId }));
        dispatch(logoutWhenTokenExpires(+expiresIn));
    } catch (e) {
        dispatch(Actions.authFailed(e.message));
    }
};

export const logoutWhenTokenExpires = (expiresIn: number) => (dispatch: any) => new Promise((resolve => {
    setTimeout(() => {
        dispatch(logout());
        resolve();
    }, expiresIn * 1000);
}));

export const logout = () => (dispatch: any) => {
    clearStorage();
    dispatch(Actions.authLogout());
};

export const tryAuthenticate = () => (dispatch: any) => {
    if (!localStorage.getItem('expiresAt')) {
        return;
    }
    const expiresAt = +localStorage.getItem('expiresAt')!;
    const now = new Date().getTime();
    if (now > expiresAt) {
        return clearStorage();
    }
    const idToken = localStorage.getItem('token')!;
    const userId = localStorage.getItem('userId')!;
    dispatch(Actions.authSuccess({ idToken, userId }));
    dispatch(logoutWhenTokenExpires((expiresAt - now) / 1000));
};

const storeAuthPayload = (token: string, userId: string, expiresAt: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('expiresAt', expiresAt);
};

const clearStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiresAt');
};
