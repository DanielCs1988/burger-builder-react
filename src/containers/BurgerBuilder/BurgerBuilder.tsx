import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import { Actions as IngredientActions } from "../../store/actions/ingredients";
import { Actions as OrderActions } from "../../store/actions/orders";
import {Ingredient} from "../../models";
import {AppState} from "../../store/types";
import BurgerBuilder from "../../components/BurgerBuilder/BurgerBuilder";

const mapStateToProps = ({ ingredients: { ingredients, price, loading }, auth: { idToken } }: AppState) => {
    return { ingredients, price, loading, isAuthenticated: idToken !== null };
};

const mapDispatchToProps = (dispatch: any) => ({
    ingredientAdded: (type: Ingredient) => dispatch(IngredientActions.addIngredient(type)),
    ingredientRemoved: (type: Ingredient) => dispatch(IngredientActions.removeIngredient(type)),
    fetchIngredients: () => dispatch(IngredientActions.initFetchIngredients()),
    initOrder: () => dispatch(OrderActions.orderInit())
});

export default withErrorHandler(connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder));