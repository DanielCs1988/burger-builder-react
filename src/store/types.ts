import {Ingredients, Order} from "../models";

export interface IngredientState {
    ingredients: Ingredients;
    price: number;
    error: any;
    loading: boolean;
}

export interface OrderState {
    orders: Order[];
    loading: boolean;
    fetched: boolean;
    purchased: boolean;
}

export interface AppState {
    ingredients: IngredientState;
    orders: OrderState;
}

type FunctionType = (...args: any[]) => any;
type ActionCreatorsMapObject = {
    [actionCreator: string]: FunctionType
};

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;