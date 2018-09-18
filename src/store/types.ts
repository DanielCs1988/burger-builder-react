import {Ingredients, Order} from "../models";
import {IngredientActions} from "./actions/ingredients";
import {OrderActions} from "./actions/orders";
import {AuthActions} from "./actions/auth";

export interface IngredientState {
    ingredients: Ingredients;
    price: number;
    error: string | null;
    loading: boolean;
    building: boolean;
}

export interface OrderState {
    orders: Order[];
    loading: boolean;
    fetched: boolean;
    purchased: boolean;
}

export interface AuthState {
    idToken: string | null;
    userId: string | null;
    error: string | null;
    loading: boolean;
}

export interface AppState {
    ingredients: IngredientState;
    orders: OrderState;
    auth: AuthState;
}

export type AppActions = IngredientActions | OrderActions | AuthActions;

export interface AuthPayload {
    idToken: string;
    userId: string;
}

type FunctionType = (...args: any[]) => any;
type ActionCreatorsMapObject = {
    [actionCreator: string]: FunctionType
};

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;