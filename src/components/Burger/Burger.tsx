import * as React from 'react';
import classes from './Burger.css';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import {BurgerBread, Ingredient, Ingredients} from "../../models";

const burger = ({ ingredients }: Props) => {
    const mappedIngredients = Object.keys(ingredients)
        .map((igKey: Ingredient) => [ ...Array(+ingredients[igKey]!) ]
            .map((_, index) => <BurgerIngredient key={igKey + index} type={igKey} />)
        )
        .reduce((prev, next) => [...prev, ...next], []);
    return (
        <div className={classes.burger}>
            <BurgerIngredient type={BurgerBread.BREAD_TOP} />
            {mappedIngredients.length > 0 ? mappedIngredients : <p>Please start adding ingredients!</p>}
            <BurgerIngredient type={BurgerBread.BREAD_BOTTOM} />
        </div>
    );
};

export interface Props {
    ingredients: Ingredients
}

export default burger;