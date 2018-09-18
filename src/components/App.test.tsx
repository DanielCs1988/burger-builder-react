import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, ShallowWrapper } from "enzyme";
import App from "./App";
import BurgerBuilder from "../containers/BurgerBuilder/BurgerBuilder";
import {Redirect} from "react-router";

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

    it('should render a /authenticate route', () => {
        const route = wrapper.findWhere(el => el.prop('path') === '/authenticate');
        expect(route).toHaveLength(1);
    });

    it('should render a /orders route when logged in', () => {
        const route = wrapper.findWhere(el => el.prop('path') === '/orders');
        expect(route).toHaveLength(1);
    });

    it('should not render a /orders route when logged out', () => {
        wrapper.setProps({ isAuthenticated: false });
        const route = wrapper.findWhere(el => el.prop('path') === '/orders');
        expect(route).toHaveLength(0);
    });

    it('should render a /checkout route when logged in', () => {
        const route = wrapper.findWhere(el => el.prop('path') === '/checkout');
        expect(route).toHaveLength(1);
    });

    it('should not render a /checkout route when logged out', () => {
        wrapper.setProps({ isAuthenticated: false });
        const route = wrapper.findWhere(el => el.prop('path') === '/checkout');
        expect(route).toHaveLength(0);
    });

    it('should render a /logout route when logged in', () => {
        const route = wrapper.findWhere(el => el.prop('path') === '/logout');
        expect(route).toHaveLength(1);
    });

    it('should not render a /logout route when logged out', () => {
        wrapper.setProps({ isAuthenticated: false });
        const route = wrapper.findWhere(el => el.prop('path') === '/logout');
        expect(route).toHaveLength(0);
    });

    it('should redirect unknown routes to /burger', () => {
        expect(wrapper.find(Redirect).prop('to')).toBe('/burger');
    });
});