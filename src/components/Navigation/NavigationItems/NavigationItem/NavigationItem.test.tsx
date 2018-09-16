import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, ShallowWrapper } from "enzyme";
import NavigationItem from "./NavigationItem";
import {NavLink} from "react-router-dom";

configure({ adapter: new Adapter() });

describe('<NavigationItem />', () => {

    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItem link="/rainbow-bridge" children="Click me!" />);
    });

    it('should render children in the link element', () => {
        expect(wrapper.find(NavLink).prop('children')).toBe('Click me!');
    });

    it('should point the link to it\'s intended destination', () => {
        expect(wrapper.find(NavLink).prop('to')).toBe('/rainbow-bridge');
    });
});