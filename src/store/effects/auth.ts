import {Actions, ActionTypes} from "../actions/auth";
import {call, put, race, take} from "redux-saga/effects";
import {delay} from "redux-saga";
import * as Api from './api';
import {Credentials} from "../../models";

export function* authFlow() {
    while (true) {
        const action = yield race({
            login: take(ActionTypes.INIT_AUTHENTICATE),
            autoLogin: take(ActionTypes.INIT_TRY_AUTHENTICATE)
        });
        let expiresIn;
        if (action.login) {
            const { login: { payload: { isLogin, credentials } } } = action;
            expiresIn = yield call(authenticate, isLogin, credentials);
        } else {
            expiresIn = yield call(autoLogin);
        }
        yield race({
            logout: take(ActionTypes.INIT_LOGOUT),
            expire: delay(expiresIn)
        });
        yield call(logout);
    }
}

export function* logout() {
    yield clearStorage();
    yield put(Actions.authLogout());
}

export function* authenticate(isLogin: boolean, credentials: Credentials) {
    try {
        yield put(Actions.authStart());
        const { idToken, localId, expiresIn } = yield call(Api.authenticate, isLogin, credentials);
        const expiresAt = new Date().getTime() + expiresIn * 1000 + '';
        yield call(storeAuthPayload, idToken, localId, expiresAt);
        yield put(Actions.authSuccess({ idToken, userId: localId }));
        return expiresIn * 1000;
    } catch (error) {
        yield put(Actions.authFailed(error.message));
        return 0;
    }
}

export function* autoLogin() {
    const expiresAt = yield call([localStorage, 'getItem'], 'expiresAt');
    if (!expiresAt) {
        return 0;
    }
    const now = new Date().getTime();
    if (now > expiresAt) {
        yield call(clearStorage);
        return 0;
    }
    const idToken = yield call([localStorage, 'getItem'], 'token');
    const userId = yield call([localStorage, 'getItem'], 'userId');
    yield put(Actions.authSuccess({ idToken, userId }));
    return expiresAt - now;
}

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