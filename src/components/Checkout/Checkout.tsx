import * as React from 'react';
import {match, Route} from "react-router-dom";
import {History} from "history";
import RedirectIf from "../../hoc/RedirectIf/RedirectIf";
import {Ingredients} from "../../models";
import CheckoutSummary from './CheckoutSummary/CheckoutSummary';
import ContactData from "../../containers/Checkout/ContactData/ContactData";

const Checkout = ({ ingredients, history, match }: Props) => {
    return (
        <RedirectIf shouldRedirect={!ingredients} to="/burger">
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