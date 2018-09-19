import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import {AppState} from "../../../store/types";
import {Order} from "../../../models";
import ContactData from "../../../components/Checkout/ContactData/ContactData";
import {Actions} from "../../../store/actions/orders";

const mapStateToProps = ({
    ingredients: { ingredients },
    orders: { purchased, loading },
    auth: { idToken, userId }
}: AppState) => {
    return { ingredients, purchased, loading, userId, token: idToken };
};

const mapDispatchToProps = (dispatch: any) => ({
    sendOrder: (order: Order, token: string) => dispatch(Actions.initSendOrder({ order, token }))
});

export default withErrorHandler(connect(mapStateToProps, mapDispatchToProps)(ContactData));