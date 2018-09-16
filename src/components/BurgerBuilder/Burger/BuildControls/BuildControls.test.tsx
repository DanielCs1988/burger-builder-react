import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, ShallowWrapper } from "enzyme";
import BuildControls from "./BuildControls";
import BuildControl from "./BuildControl/BuildControl";
import {Ingredients} from "../../../../models";

configure({ adapter: new Adapter() });

describe('<BuildControls />', () => {

    const ingredients: Ingredients = {
        meat: 20,
        cheese: 10,
        bacon: 10,
        salad: 0
    };
    let wrapper: ShallowWrapper;
    let purchased: jest.Mock;
    let ingAdded: jest.Mock;
    let ingRemoved: jest.Mock;

    beforeEach(() => {
        purchased = jest.fn();
        ingAdded = jest.fn();
        ingRemoved = jest.fn();
        wrapper = shallow(<BuildControls ingredients={ingredients} price={5.804678} purchase={purchased}
                                         ingredientAdded={ingAdded} ingredientRemoved={ingRemoved}
        />);
    });

    it('should display the price within <strong> tags with 2 decimals', () => {
        const priceTag = wrapper.find('strong');
        expect(priceTag.text()).toContain('5.80');
    });

    it('should render all the controls', () => {
        const noIngredients = Object.keys(ingredients).length;
        expect(wrapper.find(BuildControl)).toHaveLength(noIngredients);
    });

    it('should render controls with the proper key', () => {
        const control = wrapper.find(BuildControl).get(0);
        expect(control.key).toBe('meat');
    });

    it('should render controls with the correct label', () => {
        const control = wrapper.find(BuildControl).get(1);
        expect(control.props.label).toBe('cheese');
    });

    it('should render active controls for ingredients with greater than 0 amount', () => {
        const control = wrapper.find(BuildControl).get(2);
        expect(control.props.disabled).toBe(false);
    });

    it('should render disabled controls for ingredients 0 amount', () => {
        const control = wrapper.find(BuildControl).get(3);
        expect(control.props.disabled).toBe(true);
    });

    it('should call ingredient added with the correct type parameter', () => {
        const control = wrapper.find(BuildControl).get(0);
        control.props.ingredientAdded.apply(null);
        expect(ingAdded).toHaveBeenCalledTimes(1);
        expect(ingAdded).toHaveBeenCalledWith('meat');
    });

    it('should call ingredient removed with the correct type parameter', () => {
        const control = wrapper.find(BuildControl).get(1);
        control.props.ingredientRemoved.apply(null);
        expect(ingRemoved).toHaveBeenCalledTimes(1);
        expect(ingRemoved).toHaveBeenCalledWith('cheese');
    });

    it('should activate order button when there are ingredients in the burger', () => {
        expect(wrapper.find('button').prop('disabled')).toBe(false);
    });

    it('should deactivate order button when no ingredients are added', () => {
        wrapper.setProps({
            ingredients: {
                meat: 0,
                cheese: 0,
                bacon: 0,
                salad: 0
            }
        });
        expect(wrapper.find('button').prop('disabled')).toBe(true);
    });

    it('should trigger purchased when the order button is clicked', () => {
        wrapper.find('button').simulate('click');
        expect(purchased).toHaveBeenCalledTimes(1);
    });
});