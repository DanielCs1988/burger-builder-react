import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, ShallowWrapper } from "enzyme";
import OrderSummary from "./OrderSummary";
import { Ingredients } from "../../../models";
import { BtnType } from "../../UI/Button/Button";

configure({ adapter: new Adapter() });

describe('<OrderSummary />', () => {

    const ingredients: Ingredients = {
        meat: 2,
        cheese: 1,
        bacon: 1,
        salad: 0
    };
    let cancelled: jest.Mock;
    let ordered: jest.Mock;
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        cancelled = jest.fn();
        ordered = jest.fn();
        wrapper = shallow(<OrderSummary ingredients={ingredients} price={6.81234}
                                        cancelled={cancelled} ordered={ordered}
        />);
    });

    it('should display the price within <strong> tags with 2 decimals', () => {
        const priceTag = wrapper.find('strong');
        expect(priceTag.text()).toContain('6.81');
    });

    it('should render a list all the ingredients', () => {
        const noIngredients = Object.keys(ingredients).length;
        expect(wrapper.find('ul > li')).toHaveLength(noIngredients);
    });

    it('should render the list of ingredients with the proper keys', () => {
        const ingredient = wrapper.find('ul > li').get(1);
        expect(ingredient.key).toBe('1');
    });

    it('should render ingredients with the correct name', () => {
        const ingredient = wrapper.find('ul > li > span').get(2);
        expect(ingredient.props.children).toBe('bacon');
    });

    it('should render ingredients with the correct amount', () => {
        const ingredient = wrapper.find('ul > li').get(2);
        expect(ingredient.props.children).toContain(1);
    });

    it('should couple the continue button with the correct button', () => {
        const button = wrapper
            .findWhere(el => el.name() === 'Button' && el.prop('children') === 'CONTINUE');
        expect(button.prop('btnType')).toBe(BtnType.SUCCESS);
        expect(button.prop('clicked')).toBe(ordered);
    });

    it('should call ordered upon hitting continue', () => {
        wrapper
            .findWhere(el => el.name() === 'Button' && el.prop('children') === 'CONTINUE')
            .getElement().props.clicked
            .apply(null);
        expect(ordered).toHaveBeenCalledTimes(1);
    });

    it('should couple the cancel button with the correct button', () => {
        const button = wrapper
            .findWhere(el => el.name() === 'Button' && el.prop('children') === 'CANCEL');
        expect(button.prop('btnType')).toBe(BtnType.DANGER);
        expect(button.prop('clicked')).toBe(cancelled);
    });

    it('should call cancelled upon hitting cancel', () => {
        wrapper
            .findWhere(el => el.name() === 'Button' && el.prop('children') === 'CANCEL')
            .getElement().props.clicked
            .apply(null);
        expect(cancelled).toHaveBeenCalledTimes(1);
    });
});