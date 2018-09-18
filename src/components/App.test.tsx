import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, ShallowWrapper } from "enzyme";
import App from "./App";
import BurgerBuilder from "../containers/BurgerBuilder/BurgerBuilder";
import Checkout from "../containers/Checkout/Checkout";
import OrdersSummary from "../containers/OrdersSummary/OrdersSummary";
import Auth from "../containers/Auth/Auth";
import {Redirect} from "react-router";
import Logout from "../containers/Auth/Logout/Logout";

configure({ adapter: new Adapter() });

describe('<App />', () => {

    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = shallow(<App isAuthenticated={true} loginIfTokenPresent={() => {}} />);
    });

    it('should render a /burger route pointing to the <BurgerBuilder /> container', () => {
        const route = wrapper.findWhere(el => el.prop('path') === '/burger');
        expect(route.prop('component')).toEqual(BurgerBuilder);
    });

    it('should render a /authenticate route pointing to the <Auth /> container', () => {
        const route = wrapper.findWhere(el => el.prop('path') === '/authenticate');
        expect(route.prop('component')).toEqual(Auth);
    });

    it('should render a /checkout route pointing to the <Checkout /> container when authenticated', () => {
        const route = wrapper.findWhere(el => el.prop('path') === '/checkout');
        expect(route.prop('component')).toEqual(Checkout);
    });

    it('should not render a /checkout route pointing to the <Checkout /> container when logged out', () => {
        wrapper.setProps({ isAuthenticated: false });
        const route = wrapper.findWhere(el => el.prop('path') === '/checkout');
        expect(route).toHaveLength(0);
    });

    it('should render a /orders route pointing to the <OrdersSummary /> container  when authenticated', () => {
        const route = wrapper.findWhere(el => el.prop('path') === '/orders');
        expect(route.prop('component')).toEqual(OrdersSummary);
    });

    it('should not render a /orders route pointing to the <OrdersSummary /> container when logged out', () => {
        wrapper.setProps({ isAuthenticated: false });
        const route = wrapper.findWhere(el => el.prop('path') === '/orders');
        expect(route).toHaveLength(0);
    });

    it('should render a /logout route pointing to the <Logout /> container when authenticated', () => {
        const route = wrapper.findWhere(el => el.prop('path') === '/logout');
        expect(route.prop('component')).toEqual(Logout);
    });

    it('should not render a /logout route pointing to the <Logout /> container when logged out', () => {
        wrapper.setProps({ isAuthenticated: false });
        const route = wrapper.findWhere(el => el.prop('path') === '/logout');
        expect(route).toHaveLength(0);
    });

    it('should redirect unknown routes to /burger', () => {
        expect(wrapper.find(Redirect).prop('to')).toBe('/burger');
    });
});