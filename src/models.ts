export const enum Ingredient {
    MEAT = 'meat',
    CHEESE = 'cheese',
    BACON = 'bacon',
    SALAD = 'salad'
}

export const enum BurgerBread {
    BREAD_BOTTOM = 'bread-bottom',
    BREAD_TOP = 'bread-top'
}

export const enum DeliveryMethod {
    FASTEST = 'fastest',
    NORMAL = 'normal',
    CHEAPEST = 'cheapest'
}

export type Ingredients = {
    [ingredient in Ingredient]?: number;
};

export interface OrderData {
    name?: string;
    email?: string;
    street?: string;
    zipCode?: string;
    deliveryMethod?: DeliveryMethod;
}

export interface Order {
    id?: string;
    userId: string;
    ingredients: Ingredients;
    orderData: OrderData
}

export interface Credentials {
    email?: string;
    password?: string;
}