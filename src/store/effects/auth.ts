import axios from 'axios';
import {Credentials} from "../../models";
import {Dispatch} from "redux";
import {Actions} from "../actions/auth";

const registerEndpoint = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser';
const loginEndpoint = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword';
const key = 'AIzaSyBXA34yX9HExl3Hvdl1dN6fvr4fuVbaVS4';

export const register = (credentials: Credentials) => async (dispatch: any) => {
    try {
        dispatch(Actions.authStart());
        const { data: { idToken, localId, expiresIn } } = await axios.post(
            registerEndpoint,
            { ...credentials, returnSecureToken: true },
            { params: { key } }
        );
        dispatch(Actions.authSuccess({ idToken, userId: localId }));
        dispatch(logout(+expiresIn));
    } catch (e) {
        dispatch(Actions.authFailed(e.message));
    }
};

export const login = (credentials: Credentials) => async (dispatch: any) => {
    try {
        dispatch(Actions.authStart());
        const { data: { idToken, localId, expiresIn } } = await axios.post(
            loginEndpoint,
            { ...credentials, returnSecureToken: true },
            { params: { key } }
        );
        dispatch(Actions.authSuccess({ idToken, userId: localId }));
        dispatch(logout(+expiresIn));
    } catch (e) {
        dispatch(Actions.authFailed(e.message));
    }
};

export const logout = (expiresIn: number) => (dispatch: Dispatch) => new Promise((resolve => {
    setTimeout(() => {
        dispatch(Actions.authLogout());
        resolve();
    }, expiresIn * 1000);
}));
