import * as React from 'react';
import Order from "./Order/Order";
import Load from "../../hoc/Load/Load";
import {Order as OrderModel} from "../../models";

class OrdersSummary extends React.Component<Props, object> {
    componentDidMount() {
        if (!this.props.fetched) {
            this.props.fetchOrders(this.props.token, this.props.userId);
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
    userId: string;
    token: string;
    fetchOrders: (token: string, userId: string) => void;
}

export default OrdersSummary;