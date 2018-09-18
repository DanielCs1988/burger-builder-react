import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, ShallowWrapper } from "enzyme";
import NavigationItems from "./NavigationItems";

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {

    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems authenticated={true} />);
    });

    it('should have a link pointing to /burger', () => {
        const link = wrapper.findWhere(el => el.prop('link') === '/burger');
        expect(link).toHaveLength(1);
    });

    it('should have a link pointing to /orders when logged in', () => {
        const link = wrapper.findWhere(el => el.prop('link') === '/orders');
        expect(link).toHaveLength(1);
    });

    it('should have a link pointing to /logout when logged in', () => {
        const link = wrapper.findWhere(el => el.prop('link') === '/logout');
        expect(link).toHaveLength(1);
    });

    it('should not have a link pointing to /orders when logged out', () => {
        wrapper.setProps({ authenticated: false });
        const link = wrapper.findWhere(el => el.prop('link') === '/orders');
        expect(link).toHaveLength(0);
    });

    it('should have a link pointing to /authenticate when logged in', () => {
        wrapper.setProps({ authenticated: false });
        const link = wrapper.findWhere(el => el.prop('link') === '/authenticate');
        expect(link).toHaveLength(1);
    });
});