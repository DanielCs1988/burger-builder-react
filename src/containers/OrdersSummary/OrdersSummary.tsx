import { connect } from "react-redux";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {AppState} from "../../store/types";
import OrdersSummary from "../../components/OrdersSummary/OrdersSummary";
import {Actions} from "../../store/actions/orders";

const mapStateToProps = ({ orders: { orders, loading, fetched }, auth: { idToken, userId } }: AppState) => ({
    orders, loading, fetched, userId, token: idToken
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchOrders: (token: string, userId: string) => dispatch(Actions.initFetchOrders({ token, userId }))
});

export default withErrorHandler(connect(mapStateToProps, mapDispatchToProps)(OrdersSummary));