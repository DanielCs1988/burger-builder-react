import * as React from 'react';
import Burger from "./Burger/Burger";
import BuildControls from "./Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "./OrderSummary/OrderSummary";
import Load from "../../hoc/Load/Load";
import {Ingredient, Ingredients} from "../../models";
import {History} from "history";

class BurgerBuilder extends React.Component<Props, State> {
    state = {
        purchasing: false
    };

    componentDidMount() {
        this.props.fetchIngredients();
        this.props.initOrder();
    }

    togglePurchase = () => this.setState((prevState) => ({ purchasing: !prevState.purchasing }));

    confirmOrder = () => {
        this.props.history.push('/checkout');
    };

    render() {
        const { ingredients, price, loading, ingredientAdded, ingredientRemoved } = this.props;
        return (
            <Load loading={loading}>
                <Modal show={this.state.purchasing} closed={this.togglePurchase} >
                    <OrderSummary ingredients={ingredients} price={price}
                                  cancelled={this.togglePurchase}
                                  ordered={this.confirmOrder}
                    />
                </Modal>
                <Burger ingredients={ingredients} />
                <BuildControls ingredients={ingredients} price={price}
                               purchase={this.togglePurchase}
                               ingredientAdded={ingredientAdded}
                               ingredientRemoved={ingredientRemoved}
                />
            </Load>
        );
    }
}

export interface Props {
    ingredients: Ingredients;
    price: number;
    loading: boolean;
    fetchIngredients: () => void;
    initOrder: () => void;
    history: History;
    ingredientAdded: (ingredient: Ingredient) => void;
    ingredientRemoved: (ingredient: Ingredient) => void;
}

export interface State {
    purchasing: boolean;
}

export default BurgerBuilder;