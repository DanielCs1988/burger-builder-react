import {combineReducers, Reducer} from "redux";
import ingredients from "./reducers/ingredients";
import orders from "./reducers/orders";
import auth from "./reducers/auth";
import {AppActions, AppState} from "./types";
import {ActionTypes} from "./actions/auth";

const appReducer: Reducer<AppState> = combineReducers({
    ingredients,
    orders,
    auth
});

const rootReducer = (state: AppState | undefined, action: AppActions) => {
    if (action.type === ActionTypes.AUTH_LOGOUT) {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;