import {Dispatch} from "redux";
import ordersApi from "../../axios-orders";
import {Actions} from "../actions/ingredients";

export const fetchIngredients = () => async (dispatch: Dispatch) => {
    try {
        dispatch(Actions.fetchIngredientsStarted());
        const { data } = await ordersApi.get('ingredients.json');
        dispatch(Actions.fetchIngredientsSuccess(data));
    } catch (error) {
        dispatch(Actions.fetchIngredientsFailed(error.message));
    }
};