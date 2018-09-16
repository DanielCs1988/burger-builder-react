import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, ShallowWrapper } from "enzyme";
import Modal from "./Modal";
import Backdrop from "../Backdrop/Backdrop";

configure({ adapter: new Adapter() });

describe('<Modal />', () => {

    const content = <h2>Test model text</h2>;
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = shallow(<Modal show={true} closed={() => {}} children={content} />);
    });

    it('should render content and backdrop', () => {
        expect(wrapper.find(Backdrop)).toHaveLength(1);
        expect(wrapper.containsMatchingElement(content)).toBe(true);
    });
});