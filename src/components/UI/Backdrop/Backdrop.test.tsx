import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, ShallowWrapper } from "enzyme";
import Backdrop from "./Backdrop";

configure({ adapter: new Adapter() });

describe('<Backdrop />', () => {

    let wrapper: ShallowWrapper;
    let closedMock: jest.Mock;

    beforeEach(() => {
        closedMock = jest.fn(() => {});
        wrapper = shallow(<Backdrop show={true} closed={closedMock} />);
    });

    it('should show backdrop when show is set to true', () => {
        expect(wrapper.find('div')).toHaveLength(1);
    });

    it('should not show backdrop when show is set to false', () => {
        wrapper.setProps({ show: false });
        expect(wrapper.find('div')).toHaveLength(0);
    });

    it('should call closed function when clicked', () => {
        wrapper.find('div').simulate('click');
        expect(closedMock).toHaveBeenCalledTimes(1);
    });
});