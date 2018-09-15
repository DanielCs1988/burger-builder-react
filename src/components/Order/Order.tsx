import * as React from 'react';
import classes from './Order.css';
import { Ingredients } from "../../models";

const order = ({ ingredients }: Props) => {
    const output = Object.keys(ingredients)
        .map(ingKey => (
            <div className={classes.Ingredient} key={ingKey}>
                {`${ingKey}: ${ingredients[ingKey]}`}
            </div>
        ));
    return (
        <div className={classes.Order}>
            <strong>Ingredients:</strong> {output}
            <p><strong>Price:</strong> placeholder</p>
        </div>
    );
};

export interface Props {
    ingredients: Ingredients
}

export default order;