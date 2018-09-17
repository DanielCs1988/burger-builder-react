import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, ShallowWrapper } from "enzyme";
import App from "./App";
import BurgerBuilder from "../containers/BurgerBuilder/BurgerBuilder";
import Checkout from "../containers/Checkout/Checkout";
import OrdersSummary from "../containers/OrdersSummary/OrdersSummary";
import Auth from "../containers/Auth/Auth";

configure({ adapter: new Adapter() });

describe('<App />', () => {

    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = shallow(<App />);
    });

    it('should render a /burger route pointing to the <BurgerBuilder /> container', () => {
        const route = wrapper.findWhere(el => el.prop('path') === '/burger');
        expect(route.prop('component')).toEqual(BurgerBuilder);
    });

    it('should render a /checkout route pointing to the <Checkout /> container', () => {
        const route = wrapper.findWhere(el => el.prop('path') === '/checkout');
        expect(route.prop('component')).toEqual(Checkout);
    });

    it('should render a /orders route pointing to the <OrdersSummary /> container', () => {
        const route = wrapper.findWhere(el => el.prop('path') === '/orders');
        expect(route.prop('component')).toEqual(OrdersSummary);
    });

    it('should render a /login route pointing to the <Auth /> container', () => {
        const route = wrapper.findWhere(el => el.prop('path') === '/login');
        expect(route.prop('component')).toEqual(Auth);
    });

    it('should redirect unknown routes to /burger', () => {
        const route = wrapper.findWhere(el => el.prop('from') === '/');
        expect(route.prop('to')).toBe('/burger');
    });
});