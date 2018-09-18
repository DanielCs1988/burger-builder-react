import * as React from 'react';
import classes from './BuildControls.css';
import BuildControl from "./BuildControl/BuildControl";
import {Ingredient, Ingredients} from "../../../models";

const buildControls = ({ ingredients, price, authenticated, purchase, ingredientAdded, ingredientRemoved }: Props) => {
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
            <button className={classes.OrderButton} onClick={purchase}
                    disabled={authenticated && !purchasable}>
                { authenticated ? 'ORDER NOW' : 'SIGN IN TO ORDER' }
            </button>
        </div>
    );
};

export interface Props {
    ingredients: Ingredients;
    price: number;
    authenticated: boolean;
    purchase: () => void;
    ingredientAdded: (ingredient: Ingredient) => void;
    ingredientRemoved: (ingredient: Ingredient) => void;
}

export default buildControls;