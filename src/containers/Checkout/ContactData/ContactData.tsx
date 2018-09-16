import { connect } from "react-redux";
import { sendOrder } from "../../../store/effects/orders";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import ordersApi from "../../../axios-orders";
import {AppState} from "../../../store/types";
import {Order} from "../../../models";
import ContactData from "../../../components/Checkout/ContactData/ContactData";

const mapStateToProps = ({ ingredients: { ingredients }, orders: { purchased, loading } }: AppState) => {
    return { ingredients, purchased, loading };
};

const mapDispatchToProps = (dispatch: any) => ({
    sendOrder: (order: Order) => dispatch(sendOrder(order))
});

export default withErrorHandler(
    connect(mapStateToProps, mapDispatchToProps)(ContactData),
    ordersApi
);