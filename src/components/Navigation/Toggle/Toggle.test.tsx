import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, ShallowWrapper } from "enzyme";
import Toggle from "./Toggle";

configure({ adapter: new Adapter() });

describe('<Toggle />', () => {

    let wrapper: ShallowWrapper;
    let toggleMock: jest.Mock;

    beforeEach(() => {
        toggleMock = jest.fn();
        wrapper = shallow(<Toggle toggle={toggleMock} />);
    });

    it('should render exactly 3 lines', () => {
        expect(wrapper.find('div > div')).toHaveLength(3);
    });

    it('should trigger toggle when clicked', () => {
        wrapper.simulate('click');
        expect(toggleMock).toHaveBeenCalledTimes(1);
    });
});