import * as React from 'react';
import classes from './BurgerIngredient.css';
import {BurgerBread, Ingredient} from "../../../models";

const ingredients = {
    [BurgerBread.BREAD_BOTTOM]: <div className={classes.BreadBottom} />,
    [BurgerBread.BREAD_TOP]: (
        <div className={classes.BreadTop}>
            <div className={classes.Seeds1} />
            <div className={classes.Seeds2} />
        </div>
    ),
    [Ingredient.MEAT]: <div className={classes.Meat} />,
    [Ingredient.CHEESE]: <div className={classes.Cheese} />,
    [Ingredient.BACON]: <div className={classes.Bacon} />,
    [Ingredient.SALAD]: <div className={classes.Salad} />
};

const burgerIngredient = ({ type }: Props) => ingredients[type] ? ingredients[type] : null;

export interface Props {
    type: BurgerBread | Ingredient
}

export default burgerIngredient;