import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, ShallowWrapper } from "enzyme";
import BurgerBuilder from "./BurgerBuilder";
import {Ingredients} from "../../models";
import {History} from "history";

configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {

    const ingredients: Ingredients = {
        meat: 2,
        cheese: 1,
        bacon: 1,
        salad: 0
    };
    let ingAdded: jest.Mock;
    let ingRemoved: jest.Mock;
    let history: History;
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        ingAdded = jest.fn();
        ingRemoved = jest.fn();
        history = { push: (path: string) => {} } as History;
        wrapper = shallow(<BurgerBuilder ingredients={ingredients} price={6.81234} loading={false}
                                         fetchIngredients={() => {}} initOrder={() => {}}
                                         ingredientAdded={ingAdded} ingredientRemoved={ingRemoved}
                                         history={history}
        />);
    });

    it('should ', () => {

    });
});