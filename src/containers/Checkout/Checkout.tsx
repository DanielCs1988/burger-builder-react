import { connect } from "react-redux";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import ordersApi from "../../axios-orders";
import {AppState} from "../../store/types";
import Checkout from "../../components/Checkout/Checkout";

const mapStateToProps = ({ ingredients: { ingredients } }: AppState) => ({ ingredients });

export default withErrorHandler(
    connect(mapStateToProps)(Checkout),
    ordersApi
);