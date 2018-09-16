import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, ShallowWrapper } from "enzyme";
import CheckoutSummary from "./CheckoutSummary";
import { Ingredients } from "../../../models";
import { BtnType } from "../../UI/Button/Button";
import Burger from "../../BurgerBuilder/Burger/Burger";

configure({ adapter: new Adapter() });

describe('<CheckoutSummary />', () => {

    const ingredients: Ingredients = {
        meat: 2,
        cheese: 1,
        bacon: 1,
        salad: 0
    };
    let cancelled: jest.Mock;
    let continued: jest.Mock;
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        cancelled = jest.fn();
        continued = jest.fn();
        wrapper = shallow(
            <CheckoutSummary ingredients={ingredients} cancelled={cancelled} continued={continued} />
        );
    });

    it('should render a <Burger /> with all the ingredients', () => {
        expect(wrapper.find(Burger).prop('ingredients')).toEqual(ingredients);
    });

    it('should couple the continue button with the correct button', () => {
        const button = wrapper
            .findWhere(el => el.name() === 'Button' && el.prop('children') === 'CONTINUE');
        expect(button.prop('btnType')).toBe(BtnType.SUCCESS);
        expect(button.prop('clicked')).toBe(continued);
    });

    it('should call continued upon hitting continue', () => {
        wrapper
            .findWhere(el => el.name() === 'Button' && el.prop('children') === 'CONTINUE')
            .getElement().props.clicked
            .apply(null);
        expect(continued).toHaveBeenCalledTimes(1);
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