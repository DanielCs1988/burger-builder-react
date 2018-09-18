import {createAction} from "../helpers/action-creator";
import {ActionsUnion, AuthPayload} from "../types";

export const enum ActionTypes {
    AUTH_START = 'AUTH_START',
    AUTH_SUCCESS = 'AUTH_SUCCESS',
    AUTH_FAILED = 'AUTH_FAILED',
    AUTH_LOGOUT = 'AUTH_LOGOUT'
}

export const Actions = {
    authStart: () => createAction(ActionTypes.AUTH_START),
    authSuccess: (auth: AuthPayload) => createAction(ActionTypes.AUTH_SUCCESS, auth),
    authFailed: (error: string) => createAction(ActionTypes.AUTH_FAILED, error),
    authLogout: () => createAction(ActionTypes.AUTH_LOGOUT)
};

export type AuthActions = ActionsUnion<typeof Actions>;