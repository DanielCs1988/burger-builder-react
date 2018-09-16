import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, ShallowWrapper } from "enzyme";
import OrdersSummary from "./OrdersSummary";
import {DeliveryMethod} from "../../models";
import Order from "./Order/Order";
import Load from "../../hoc/Load/Load";

configure({ adapter: new Adapter() });

describe('<OrdersSummary />', () => {

    const testOrder = {
        id: 'veryUniqueId',
        ingredients: { meat: 10, bacon: 5, cheese: 5 },  // Bacon is veggie
        orderData: {
            name: 'John Cena',
            email: 'release@the.memes',
            zipCode: 'zip.it',
            street: '01011001',
            deliveryMethod: DeliveryMethod.FASTEST
        }
    };
    const otherOrder = { ...testOrder, id: 'too_lazy_to_modify_anything_else' };
    const orders = [ testOrder, otherOrder ];
    let wrapper: ShallowWrapper;
    let fetchMock: jest.Mock;

    beforeEach(() => {
        fetchMock = jest.fn();
        wrapper = shallow(
            <OrdersSummary orders={orders} loading={false} fetched={true} fetchOrders={fetchMock} />
        );
    });

    it('should render all order components', () => {
        expect(wrapper.find(Order)).toHaveLength(2);
    });

    it('should render the order components with the correct props', () => {
        const orders = wrapper.find(Order).getElements();
        expect(orders[0].key).toBe(testOrder.id);
        expect(orders[0].props.ingredients).toEqual(testOrder.ingredients);
        expect(orders[1].key).toBe(otherOrder.id);
        expect(orders[1].props.ingredients).toEqual(otherOrder.ingredients);
    });

    it('should show loading when loading', () => {
        wrapper.setProps({ loading: true });
        expect(wrapper.find(Load).prop('loading')).toBe(true);
    });

    it('should hide loading when not loading', () => {
        expect(wrapper.find(Load).prop('loading')).toBe(false);
    });
});