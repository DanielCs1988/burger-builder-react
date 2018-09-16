import * as React from 'react';
import classes from './BuildControls.css';
import BuildControl from "./BuildControl/BuildControl";
import {Ingredient, Ingredients} from "../../../../models";

const buildControls = ({ ingredients, price, purchase, ingredientAdded, ingredientRemoved }: Props) => {
    const controls = Object.keys(ingredients)
        .map((type: Ingredient) => {
            const disabled = ingredients[type] === 0;
            return <BuildControl key={type} label={type} disabled={disabled}
                             ingredientAdded={() => ingredientAdded(type)}
                             ingredientRemoved={() => ingredientRemoved(type)}
            />;
        });
    // @ts-ignore
    const purchasable = Object.values(ingredients).reduce((prev, next) => prev + next, 0) > 0;
    return (
        <div className={classes.BuildControls}>
            <p><strong>Total price: {price.toFixed(2)}</strong></p>
            {controls}
            <button className={classes.OrderButton} disabled={!purchasable} onClick={purchase}>
                ORDER NOW
            </button>
        </div>
    );
};

export interface Props {
    ingredients: Ingredients;
    price: number;
    purchase: () => void;
    ingredientAdded: (ingredient: Ingredient) => void;
    ingredientRemoved: (ingredient: Ingredient) => void;
}

export default buildControls;