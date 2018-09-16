import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, ShallowWrapper } from "enzyme";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {

    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('should contain an unordered list of 2 <NavigationItem /> components', () => {
        expect(wrapper.find('ul').find(NavigationItem)).toHaveLength(2);
    });

    it('should have the first link pointing to /burger', () => {
        const link = wrapper.find('ul').find(NavigationItem).getElements()[0];
        expect(link.props.link).toBe('/burger');
    });

    it('should have the second link pointing to /orders', () => {
        const link = wrapper.find('ul').find(NavigationItem).getElements()[1];
        expect(link.props.link).toBe('/orders');
    });
});