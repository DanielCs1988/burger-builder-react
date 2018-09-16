import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, ShallowWrapper } from "enzyme";
import Spinner from "./Spinner";

configure({ adapter: new Adapter() });

describe('<Spinner />', () => {

    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = shallow(<Spinner />);
    });

    it('should display the Spinner correctly', () => {
        expect(wrapper.text()).toBe('Loading...');
    });
});