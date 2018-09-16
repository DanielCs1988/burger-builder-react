import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from "enzyme";
import BurgerIngredient from "./BurgerIngredient";
import {BurgerBread, Ingredient} from "../../../../models";

configure({ adapter: new Adapter() });

describe('<BurgerIngredient />', () => {

    it('should render nothing when an unknown ingredient type is passed', () => {
        // @ts-ignore
        const wrapper = shallow(<BurgerIngredient type="FRIED_SNAIL" />);
        expect(wrapper.isEmptyRender()).toBe(true);
    });

    it('should render bottom bread', () => {
        const wrapper = shallow(<BurgerIngredient type={BurgerBread.BREAD_BOTTOM} />);
        expect(wrapper.isEmptyRender()).toBe(false);
    });

    it('should render top bread', () => {
        const wrapper = shallow(<BurgerIngredient type={BurgerBread.BREAD_TOP} />);
        expect(wrapper.isEmptyRender()).toBe(false);
    });

    it('should render meat', () => {
        const wrapper = shallow(<BurgerIngredient type={Ingredient.MEAT} />);
        expect(wrapper.isEmptyRender()).toBe(false);
    });

    it('should render bacon', () => {
        const wrapper = shallow(<BurgerIngredient type={Ingredient.BACON} />);
        expect(wrapper.isEmptyRender()).toBe(false);
    });

    it('should render cheese', () => {
        const wrapper = shallow(<BurgerIngredient type={Ingredient.CHEESE} />);
        expect(wrapper.isEmptyRender()).toBe(false);
    });

    it('should render salad', () => {
        const wrapper = shallow(<BurgerIngredient type={Ingredient.SALAD} />);
        expect(wrapper.isEmptyRender()).toBe(false);
    });
});