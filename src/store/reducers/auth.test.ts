import reducer, { initialState } from "./auth";
import { Actions, AuthActions } from "../actions/auth";
import {AuthState} from "../types";

describe('Auth Reducer', () => {

    let defaultState: AuthState;

    beforeEach(() => {
        defaultState = {
            ...initialState
        };
    });

    it('should return default state on invalid action', () => {
        expect(reducer(defaultState, {} as AuthActions)).toEqual(defaultState);
    });

    it('should show loading and set error to null when authentication starts', () => {
        const result = reducer({ ...defaultState, error: ':-(' }, Actions.authStart());
        expect(result).toEqual({ ...defaultState, loading: true });
    });

    it('should save auth payload and set loading and error to false/null on successful authentication', () => {
        const payload = {
            idToken: 'token',
            userId: 'userId'
        };
        const result = reducer({ ...defaultState , error: ':-(', loading: true }, Actions.authSuccess(payload));
        expect(result).toEqual({
            ...defaultState,
            idToken: payload.idToken,
            userId: payload.userId
        });
    });

    it('should save the error and set loading to false when error is received', () => {
        const result = reducer({ ...defaultState, loading: true }, Actions.authFailed(':-('));
        expect(result).toEqual({
            ...defaultState,
            error: ':-('
        });
    });

    it('should null the user info when logged out', () => {
        const result = reducer({ ...defaultState, userId: 'Jack', idToken: 'T0KK3N' }, Actions.authLogout());
        expect(result).toEqual(defaultState);
    });
});