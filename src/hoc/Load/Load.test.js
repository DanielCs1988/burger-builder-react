import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Load from "./Load";
import Spinner from "../../components/UI/Spinner/Spinner";

configure({ adapter: new Adapter() });

describe('<Load />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Load loading={false} children={<div/>} />);
    });

    it('should render the component', () => {
        expect(wrapper).toBeTruthy();
    });

    it('should show a Spinner component when loading', () => {
        wrapper.setProps({ loading: true });
        expect(wrapper.find(Spinner)).toHaveLength(1);
        expect(wrapper.find('div')).toHaveLength(0);
    });

    it('should render children when not loading', () => {
        expect(wrapper.find(Spinner)).toHaveLength(0);
        expect(wrapper.find('div')).toHaveLength(1);
    });
});