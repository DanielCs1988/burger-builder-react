import {combineReducers, Reducer} from "redux";
import ingredients from "./reducers/ingredients";
import orders from "./reducers/orders";
import auth from "./reducers/auth";
import {AppState} from "./types";

const rootReducer: Reducer<AppState> = combineReducers({
    ingredients,
    orders,
    auth
});

export default rootReducer;