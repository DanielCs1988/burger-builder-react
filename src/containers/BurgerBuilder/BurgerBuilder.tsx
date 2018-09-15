import ordersApi from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import {Actions as IngredientActions, fetchIngredients} from "../../store/actions/ingredients";
import { Actions as OrderActions } from "../../store/actions/orders";
import {Ingredient} from "../../models";
import {AppState} from "../../store/types";
import BurgerBuilder from "../../components/BurgerBuilder/BurgerBuilder";

const mapStateToProps = ({ ingredients: { ingredients, price, loading } }: AppState) => {
    return { ingredients, price, loading };
};

const mapDispatchToProps = (dispatch: any) => ({
    ingredientAdded: (type: Ingredient) => dispatch(IngredientActions.addIngredient(type)),
    ingredientRemoved: (type: Ingredient) => dispatch(IngredientActions.removeIngredient(type)),
    fetchIngredients: () => dispatch(fetchIngredients()),
    initOrder: () => dispatch(OrderActions.orderInit())
});

export default withErrorHandler(
    connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder),
    ordersApi
);