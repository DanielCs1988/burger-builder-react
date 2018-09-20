import {Actions, ActionTypes} from "../actions/auth";
import {call, cancel, fork, put, take} from "redux-saga/effects";
import {delay} from "redux-saga";
import * as Api from './api';
import {Credentials} from "../../models";

export function* authFlow() {
    while (true) {
        const loginAction = yield take([ActionTypes.INIT_AUTHENTICATE, ActionTypes.INIT_TRY_AUTHENTICATE]);
        let task;
        if (loginAction.type === ActionTypes.INIT_AUTHENTICATE) {
            const { payload: { isLogin, credentials } } = loginAction;
            task = yield fork(authenticate, isLogin, credentials);
        } else {
            task = yield fork(autoLogin);
        }

        const logoutAction = yield take([ActionTypes.INIT_LOGOUT, ActionTypes.AUTH_FAILED]);
        if (logoutAction.type === ActionTypes.INIT_LOGOUT) {
            yield cancel(task);
            yield call(logout);
        }
    }
}

export function* logout() {
    yield clearStorage();
    yield put(Actions.authLogout());
}

export function* logoutWhenTokenExpires(ms: number) {
    yield call(delay, ms);
    yield put(Actions.initLogout());
}

export function* authenticate(isLogin: boolean, credentials: Credentials) {
    try {
        yield put(Actions.authStart());
        const { idToken, localId, expiresIn } = yield call(Api.authenticate, isLogin, credentials);
        const expiresAt = new Date().getTime() + expiresIn * 1000 + '';
        yield call(storeAuthPayload, idToken, localId, expiresAt);
        yield put(Actions.authSuccess({ idToken, userId: localId }));
        yield call(logoutWhenTokenExpires, expiresIn * 1000);
    } catch (error) {
        yield put(Actions.authFailed(error.message));
    }
}

export function* autoLogin() {
    const expiresAt = yield call([localStorage, 'getItem'], 'expiresAt');
    const now = new Date().getTime();
    if (!expiresAt || now > expiresAt) {
        return yield put(Actions.initLogout());
    }

    const idToken = yield call([localStorage, 'getItem'], 'token');
    const userId = yield call([localStorage, 'getItem'], 'userId');
    yield put(Actions.authSuccess({ idToken, userId }));
    yield call(logoutWhenTokenExpires, expiresAt - now);
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