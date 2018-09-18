import { connect } from "react-redux";
import ordersApi from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { fetchOrders } from "../../store/effects/orders";
import {AppState} from "../../store/types";
import OrdersSummary from "../../components/OrdersSummary/OrdersSummary";

const mapStateToProps = ({ orders: { orders, loading, fetched }, auth: { idToken, userId } }: AppState) => ({
    orders, loading, fetched, userId, token: idToken
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchOrders: (token: string, userId: string) => dispatch(fetchOrders(token, userId))
});

export default withErrorHandler(
    connect(mapStateToProps, mapDispatchToProps)(OrdersSummary),
    ordersApi
);