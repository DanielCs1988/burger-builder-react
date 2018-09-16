import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, ShallowWrapper } from "enzyme";
import BuildControl from "./BuildControl";

configure({ adapter: new Adapter() });

describe('<BuildControl />', () => {

    let wrapper: ShallowWrapper;
    let ingAdded: jest.Mock;
    let ingRemoved: jest.Mock;

    beforeEach(() => {
        ingAdded = jest.fn();
        ingRemoved = jest.fn();
        wrapper = shallow(<BuildControl label="Marinated Goose Liver" disabled={false}
                                        ingredientAdded={ingAdded} ingredientRemoved={ingRemoved}
        />);
    });

    it('should render the label', () => {
        expect(wrapper.find('div > div').text()).toBe('Marinated Goose Liver');
    });

    it('should register ingredient removed listener to the correct button', () => {
        const button = wrapper.find('button').get(0);
        expect(button.props.children).toBe('Less');
        expect(button.props.onClick).toBe(ingRemoved);
    });

    it('should register ingredient added listener to the correct button', () => {
        const button = wrapper.find('button').get(1);
        expect(button.props.children).toBe('More');
        expect(button.props.onClick).toBe(ingAdded);
    });

    it('should trigger remove ingredient callback when corresponding button is clicked', () => {
        wrapper.find('button').get(0).props.onClick.apply(null);
        expect(ingRemoved).toHaveBeenCalledTimes(1);
    });

    it('should trigger add ingredient callback when corresponding button is clicked', () => {
        wrapper.find('button').get(1).props.onClick.apply(null);
        expect(ingAdded).toHaveBeenCalledTimes(1);
    });

    it('should make the less button active when disabled is set to false', () => {
        const button = wrapper.find('button').get(0);
        expect(button.props.disabled).toBe(false);
    });

    it('should disable the less button when disabled is set to true', () => {
        wrapper.setProps({ disabled: true });
        const button = wrapper.find('button').get(0);
        expect(button.props.disabled).toBe(true);
    });
});