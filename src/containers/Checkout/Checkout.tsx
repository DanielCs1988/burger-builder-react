import * as React from 'react';
import {match, Route} from "react-router-dom";
import { connect } from "react-redux";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import ordersApi from "../../axios-orders";
import RedirectIf from "../../hoc/RedirectIf/RedirectIf";
import {Ingredients} from "../../models";
import {History} from "history";
import {AppState} from "../../store/types";

const checkout = ({ ingredients, history, match }: Props) => {
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

const mapStateToProps = ({ ingredients: { ingredients } }: AppState) => ({ ingredients });

export default withErrorHandler(
    connect(mapStateToProps)(checkout),
    ordersApi
);