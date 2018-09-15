import * as React from 'react';
import Button, {BtnType} from "../../UI/Button/Button";
import {Ingredients} from "../../../models";

const orderSummary = ({ ingredients, price, ordered, cancelled }: Props) => {
    const summary = Object.keys(ingredients)
        .map((igKey, index) => (
            <li key={index}>
                <span style={ { textTransform: 'capitalize' } }>{igKey}</span>:
                {ingredients[igKey]}
            </li>
        ));
    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>{summary}</ul>
            <p><strong>Total price: {price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType={BtnType.SUCCESS} clicked={ordered}>CONTINUE</Button>
            <Button btnType={BtnType.DANGER} clicked={cancelled}>CANCEL</Button>
        </React.Fragment>
    );
};

export interface Props {
    ingredients: Ingredients;
    price: number;
    ordered: () => void;
    cancelled: () => void;
}

export default orderSummary;