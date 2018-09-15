import { connect } from "react-redux";
import ordersApi from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {fetchOrders} from "../../store/actions/orders";
import {AppState} from "../../store/types";
import OrdersSummary from "../../components/OrdersSummary/OrdersSummary";

const mapStateToProps = ({ orders: { orders, loading, fetched } }: AppState) => ({ orders, loading, fetched });

const mapDispatchToProps = (dispatch: any) => ({
    fetchOrders: () => dispatch(fetchOrders())
});

export default withErrorHandler(
    connect(mapStateToProps, mapDispatchToProps)(OrdersSummary),
    ordersApi
);