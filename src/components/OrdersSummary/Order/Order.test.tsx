import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, ShallowWrapper } from "enzyme";
import Order from "./Order";
import {Ingredients} from "../../../models";

configure({ adapter: new Adapter() });

describe('<Order />', () => {

    const ingredients: Ingredients = { meat: 10, bacon: 5, cheese: 5 };
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = shallow(<Order ingredients={ingredients} />);
    });

    it('should render the correct number of ingredients on the order pane', () => {
        const ingredientFields = wrapper.find('div > div');
        expect(ingredientFields).toHaveLength(3);
    });

    it('should render the correct ingredients on the order pane', () => {
        const ingredientElements = wrapper.find('div > div').getElements();
        expect(ingredientElements[0].key).toBe('meat');
        expect(ingredientElements[0].props.children).toBe('meat: 10');
        expect(ingredientElements[1].key).toBe('bacon');
        expect(ingredientElements[1].props.children).toBe('bacon: 5');
        expect(ingredientElements[2].key).toBe('cheese');
        expect(ingredientElements[2].props.children).toBe('cheese: 5');
    });
});