import {AuthState} from "../types";
import { AuthActions, ActionTypes } from "../actions/auth";

export const initialState: AuthState = {
    idToken: null,
    userId: null,
    error: null,
    loading: false
};

const authReducer = (state = initialState, action: AuthActions) => {
    switch (action.type) {
        case ActionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ActionTypes.AUTH_SUCCESS:
            const { idToken, userId } = action.payload;
            return {
                ...state,
                loading: false,
                error: null,
                idToken, userId
            };
        case ActionTypes.AUTH_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case ActionTypes.AUTH_LOGOUT:
            return {
                ...state,
                idToken: null,
                userId: null
            };
        default:
            return state;
    }
};

export default authReducer;