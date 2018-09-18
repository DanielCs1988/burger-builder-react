import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, ShallowWrapper } from "enzyme";
import BurgerBuilder from "./BurgerBuilder";
import {Ingredients} from "../../models";
import {History} from "history";
import Load from "../../hoc/Load/Load";
import Modal from "../UI/Modal/Modal";
import BuildControls from "./BuildControls/BuildControls";
import OrderSummary from "./OrderSummary/OrderSummary";
import Burger from "./Burger/Burger";

configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {

    const ingredients: Ingredients = {
        meat: 2,
        cheese: 1,
        bacon: 1,
        salad: 0
    };
    let history: History;
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        // @ts-ignore
        history = { push: jest.fn() };
        wrapper = shallow(<BurgerBuilder ingredients={ingredients} price={6.81234} loading={false}
                                         fetchIngredients={() => {}} initOrder={() => {}}
                                         ingredientAdded={() => {}} ingredientRemoved={() => {}}
                                         history={history} isAuthenticated={true}
        />);
    });

    it('should set loading on the load component to false when not loading', () => {
        expect(wrapper.find(Load).prop('loading')).toBe(false);
    });

    it('should set loading component to load when loading', () => {
        wrapper.setProps({ loading: true });
        expect(wrapper.find(Load).prop('loading')).toBe(true);
    });

    it('should hide the <OrderSummary /> modal by default', () => {
        expect(wrapper.find(Modal).prop('show')).toBe(false);
    });

    it('should show the <OrderSummary /> when the order button in controls is clicked', () => {
        wrapper.find(BuildControls).getElement().props.purchase.apply(null);
        expect(wrapper.find(Modal).prop('show')).toBe(true);
    });

    it('should redirect to /authenticate when the sign in button in controls is clicked', () => {
        wrapper.setProps({ isAuthenticated: false });
        wrapper.find(BuildControls).getElement().props.purchase.apply(null);
        expect(history.push).toHaveBeenCalledTimes(1);
        expect(history.push).toHaveBeenCalledWith('/authenticate');
    });

    it('should hide the <OrderSummary /> when the cancel button or the area around the modal is clicked', () => {
        wrapper.setState({ purchasing: true });
        wrapper.find(OrderSummary).getElement().props.cancelled.apply(null);
        expect(wrapper.find(Modal).prop('show')).toBe(false);
    });

    it('should navigate to checkout when the continue button in <OrderSummary /> is clicked', () => {
        wrapper.find(OrderSummary).getElement().props.ordered.apply(null);
        expect(history.push).toHaveBeenCalledTimes(1);
        expect(history.push).toHaveBeenCalledWith('/checkout');
    });

    it('should pass on ingredients to the <OrderSummary /> component', () => {
        expect(wrapper.find(OrderSummary).prop('ingredients')).toEqual(ingredients);
    });

    it('should pass on price to the <OrderSummary /> component', () => {
        expect(wrapper.find(OrderSummary).prop('price')).toBe(6.81234);
    });

    it('should pass on ingredients to the <BuildControls /> component', () => {
        expect(wrapper.find(BuildControls).prop('ingredients')).toEqual(ingredients);
    });

    it('should pass on price to the <BuildControls /> component', () => {
        expect(wrapper.find(BuildControls).prop('price')).toBe(6.81234);
    });

    it('should pass on ingredientAdded to the <BuildControls /> component', () => {
        const ingAdded = jest.fn();
        wrapper.setProps({ ingredientAdded: ingAdded });
        expect(wrapper.find(BuildControls).prop('ingredientAdded')).toEqual(ingAdded);
    });

    it('should pass on ingredientRemoved to the <BuildControls /> component', () => {
        const ingRemoved = jest.fn();
        wrapper.setProps({ ingredientRemoved: ingRemoved });
        expect(wrapper.find(BuildControls).prop('ingredientRemoved')).toEqual(ingRemoved);
    });

    it('should render the <Burger /> component with the correct ingredients', () => {
        expect(wrapper.find(Burger).prop('ingredients')).toEqual(ingredients);
    });
});