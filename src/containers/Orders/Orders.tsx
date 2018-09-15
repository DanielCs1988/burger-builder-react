import * as React from 'react';
import { connect } from "react-redux";
import Order from "../../components/Order/Order";
import ordersApi from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {fetchOrders} from "../../store/actions/orders";
import Load from "../../hoc/Load/Load";
import {Order as OrderModel} from "../../models";
import {AppState} from "../../store/types";

class Orders extends React.Component<Props, object> {
    componentDidMount() {
        if (!this.props.fetched) {
            this.props.fetchOrders();
        }
    }

    render() {
        const { orders, loading } = this.props;
        return (
            <Load loading={loading}>
                {
                    orders
                        .filter(order => order.ingredients)
                        .map(order => <Order key={order.id} ingredients={order.ingredients} />)
                }
            </Load>
        );
    }
}

export interface Props {
    orders: OrderModel[];
    loading: boolean;
    fetched: boolean;
    fetchOrders: () => void;
}

const mapStateToProps = ({ orders: { orders, loading, fetched } }: AppState) => ({ orders, loading, fetched });

const mapDispatchToProps = (dispatch: any) => ({
    fetchOrders: () => dispatch(fetchOrders())
});

export default withErrorHandler(
    connect(mapStateToProps, mapDispatchToProps)(Orders),
    ordersApi
);