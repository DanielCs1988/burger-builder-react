import * as React from 'react';
import classes from './CheckoutSummary.css';
import Burger from "../../BurgerBuilder/Burger/Burger";
import Button, {BtnType} from "../../UI/Button/Button";
import {Ingredients} from "../../../models";

const checkoutSummary = ({ ingredients, cancelled, continued }: Props) => {
    return (
        <div className={classes.Summary}>
            <h1>We hope it will taste well!</h1>
            <div className={classes.Burger}>
                <Burger ingredients={ingredients} />
            </div>
            <Button btnType={BtnType.DANGER} clicked={cancelled}>CANCEL</Button>
            <Button btnType={BtnType.SUCCESS} clicked={continued}>CONTINUE</Button>
        </div>
    );
};

export interface Props {
    ingredients: Ingredients;
    cancelled: () => void;
    continued: () => void;
}

export default checkoutSummary;