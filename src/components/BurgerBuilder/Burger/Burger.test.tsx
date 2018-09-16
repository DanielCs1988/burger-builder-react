import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, ShallowWrapper } from "enzyme";
import Burger from "./Burger";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import {BurgerBread, Ingredient, Ingredients} from "../../../models";

configure({ adapter: new Adapter() });

describe('<Burger />', () => {

    const ingredients: Ingredients = {
        meat: 2,
        cheese: 1,
        bacon: 1,
        salad: 0
    };
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = shallow(<Burger ingredients={ingredients} />);
    });

    it('should render all the ingredients', () => {
        expect(wrapper.find(BurgerIngredient)).toHaveLength(6);
    });

    it('should render add ingredients text when there are none added', () => {
        wrapper.setProps({
            ingredients: {
                meat: 0,
                cheese: 0,
                bacon: 0,
                salad: 0
            }
        });
        expect(wrapper.find(BurgerIngredient)).toHaveLength(2);
        expect(wrapper.find('p').text()).toBe('Please start adding ingredients!');
    });

    it('should render ingredients with the correct key', () => {
        const ingredient = wrapper.find(BurgerIngredient).get(2);
        expect(ingredient.key).toBe('meat1');
    });

    it('should render ingredients and bread with the correct type and order', () => {
        const ingredients = wrapper.find(BurgerIngredient).getElements();
        expect(ingredients[0].props.type).toBe(BurgerBread.BREAD_TOP);
        expect(ingredients[1].props.type).toBe(Ingredient.MEAT);
        expect(ingredients[2].props.type).toBe(Ingredient.MEAT);
        expect(ingredients[3].props.type).toBe(Ingredient.CHEESE);
        expect(ingredients[4].props.type).toBe(Ingredient.BACON);
        expect(ingredients[5].props.type).toBe(BurgerBread.BREAD_BOTTOM);
    });
});