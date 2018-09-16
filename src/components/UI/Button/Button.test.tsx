import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, shallow, ShallowWrapper} from "enzyme";
import Button, {BtnType} from "./Button";

configure({ adapter: new Adapter() });

describe('<Button />', () => {

    let wrapper: ShallowWrapper;
    let clickedMock: jest.Mock;

    beforeEach(() => {
        clickedMock = jest.fn(() => {});
        wrapper = shallow(<Button clicked={clickedMock} btnType={BtnType.SUCCESS} children="test" />);
    });

    it('should render the correct text', () => {
        expect(wrapper.text()).toBe('test');
    });

    it('should be active by default', () => {
        expect(wrapper.prop<boolean>('disabled')).toBe(false);
        expect(wrapper.find('button').props().disabled).toBe(false);
    });

    it('should set the button inactive', () => {
        wrapper.setProps({ disabled: true });
        expect(wrapper.find('button').props().disabled).toBe(true);
    });

    it('should call the callback when clicked', () => {
        wrapper.find('button').simulate('click');
        expect(clickedMock).toHaveBeenCalledTimes(1);
    });
});