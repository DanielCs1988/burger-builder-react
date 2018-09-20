import {createAction} from "../action-creator";
import {ActionsUnion, AuthPayload} from "../types";
import {Credentials} from "../../models";

export const enum ActionTypes {
    AUTH_START = 'AUTH_START',
    AUTH_SUCCESS = 'AUTH_SUCCESS',
    AUTH_FAILED = 'AUTH_FAILED',
    AUTH_LOGOUT = 'AUTH_LOGOUT',
    INIT_LOGOUT = 'INIT_LOGOUT',
    INIT_AUTHENTICATE = 'INIT_AUTHENTICATE',
    INIT_TRY_AUTHENTICATE = 'INIT_TRY_AUTHENTICATE'
}

export const Actions = {
    authStart: () => createAction(ActionTypes.AUTH_START),
    authSuccess: (auth: AuthPayload) => createAction(ActionTypes.AUTH_SUCCESS, auth),
    authFailed: (error: string) => createAction(ActionTypes.AUTH_FAILED, error),
    authLogout: () => createAction(ActionTypes.AUTH_LOGOUT),
    initLogout: () => createAction(ActionTypes.INIT_LOGOUT),
    initAuthenticate: (payload: { isLogin: boolean, credentials: Credentials }) => {
        return createAction(ActionTypes.INIT_AUTHENTICATE, payload);
    },
    initTryAuthenticate: () => createAction(ActionTypes.INIT_TRY_AUTHENTICATE)
};

export type AuthActions = ActionsUnion<typeof Actions>;