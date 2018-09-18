import { connect } from "react-redux";
import { sendOrder } from "../../../store/effects/orders";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import ordersApi from "../../../axios-orders";
import {AppState} from "../../../store/types";
import {Order} from "../../../models";
import ContactData from "../../../components/Checkout/ContactData/ContactData";

const mapStateToProps = ({
    ingredients: { ingredients },
    orders: { purchased, loading },
    auth: { idToken, userId }
}: AppState) => {
    return { ingredients, purchased, loading, userId, token: idToken };
};

const mapDispatchToProps = (dispatch: any) => ({
    sendOrder: (order: Order, token: string) => dispatch(sendOrder(order, token))
});

export default withErrorHandler(
    connect(mapStateToProps, mapDispatchToProps)(ContactData),
    ordersApi
);