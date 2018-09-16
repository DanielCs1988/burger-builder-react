import * as React from 'react';
import {match, Route} from "react-router-dom";
import {History} from "history";
import RedirectIf from "../../hoc/RedirectIf/RedirectIf";
import {Ingredients} from "../../models";
import CheckoutSummary from './CheckoutSummary/CheckoutSummary';
import ContactData from "../../containers/Checkout/ContactData/ContactData";

const Checkout = ({ ingredients, history, match }: Props) => {
    const ingredientsPresent = Object.keys(ingredients).length > 0;
    return (
        <RedirectIf shouldRedirect={!ingredientsPresent} to="/burger">
            <CheckoutSummary
                ingredients={ingredients}
                cancelled={() => history.goBack()}
                continued={() => history.replace('/checkout/contact-data')}
            />
            <Route path={`${match.path}/contact-data`} component={ContactData} />
        </RedirectIf>
    );
};

export interface Props {
    ingredients: Ingredients;
    history: History;
    match: match;
}

export default Checkout;