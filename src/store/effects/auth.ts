import {Actions, AuthActions} from "../actions/auth";
import {call, put} from "redux-saga/effects";
import {delay} from "redux-saga";
import * as Api from './api';

export function* logout(action: AuthActions) {
    yield clearStorage();
    yield put(Actions.authLogout());
}

export function* logoutWhenTokenExpires(action: any) {
    yield delay(action.payload * 1000);
    yield put(Actions.initLogout());
}

export function* authenticate(action: any) {
    const { payload: { isLogin, credentials } } = action;
    try {
        yield put(Actions.authStart());
        const { data: { idToken, localId, expiresIn } } = yield call(Api.authenticate, isLogin, credentials);
        const expiresAt = new Date().getTime() + expiresIn * 1000 + '';
        yield call(storeAuthPayload, idToken, localId, expiresAt);
        yield put(Actions.authSuccess({ idToken, userId: localId }));
        yield put(Actions.initLogoutTimer(+expiresIn));
    } catch (error) {
        yield put(Actions.authFailed(error.message));
    }
}

export function* tryAuthenticate(action: AuthActions) {
    const expiresAt = yield call([localStorage, 'getItem'], 'expiresAt');
    if (!expiresAt) {
        return;
    }
    const now = new Date().getTime();
    if (now > expiresAt) {
        return yield call(clearStorage);
    }
    const idToken = yield call([localStorage, 'getItem'], 'token');
    const userId = yield call([localStorage, 'getItem'], 'userId');
    yield put(Actions.authSuccess({ idToken, userId }));
    yield put(Actions.initLogoutTimer((expiresAt - now) / 1000));
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