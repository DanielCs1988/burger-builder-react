import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, ShallowWrapper } from "enzyme";
import Error from "./Error";

configure({ adapter: new Adapter() });

describe('<Error />', () => {

    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = shallow(<Error show={true} message="Ooops..." />);
    });

    it('should render message', () => {
        expect(wrapper.text()).toBe('Ooops...');
    });

    it('should not render when state:show is false', () => {
        wrapper.setState({ show: false });
        expect(wrapper.isEmptyRender()).toBe(true);
    });

    it('should disappear when clicked', () => {
        wrapper.simulate('click');
        expect(wrapper.isEmptyRender()).toBe(true);
    });

    it('should disappear prop:show is set to false by parent component', () => {
        wrapper.setProps({ show: false });
        expect(wrapper.isEmptyRender()).toBe(true);
    });
});