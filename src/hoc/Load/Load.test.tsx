import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import {shallow, configure, ShallowWrapper} from "enzyme";
import Load from "./Load";
import Spinner from '../../components/UI/Spinner/Spinner';

configure({ adapter: new Adapter() });

describe('<Load />', () => {

    let wrapper: ShallowWrapper;

    beforeEach(() => {
        const testChildren = <div className="test">found</div>;
        wrapper = shallow(<Load loading={true} children={testChildren} />);
    });

    it('should render a Spinner when loading', () => {
        expect(wrapper.find(Spinner)).toHaveLength(1);
    });

    it('should not render a Spinner when not loading', () => {
        wrapper.setProps({ loading: false });
        expect(wrapper.find(Spinner)).toHaveLength(0);
    });

    it('should render children when not loading', () => {
        wrapper.setProps({ loading: false });
        expect(wrapper.find('.test').text()).toEqual('found');
    });

    it('should not render children when loading', () => {
        expect(wrapper.find('.test')).toHaveLength(0);
    });
});