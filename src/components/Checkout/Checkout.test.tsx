import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, ShallowWrapper } from "enzyme";
import {match, Route} from "react-router-dom";
import {History} from "history";
import Checkout from "./Checkout";
import {Ingredients} from "../../models";
import RedirectIf from "../../hoc/RedirectIf/RedirectIf";
import CheckoutSummary from "./CheckoutSummary/CheckoutSummary";
import ContactData from "../../containers/Checkout/ContactData/ContactData";

configure({ adapter: new Adapter() });

describe('<Checkout />', () => {

    const ingredients: Ingredients = {
        meat: 2,
        cheese: 1,
        bacon: 1,
        salad: 0
    };
    const match: match = { path: '/testRoute' } as match;
    let history: History;
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        // @ts-ignore
        history = {
            goBack: jest.fn(),
            replace: jest.fn()
        };
        wrapper = shallow(<Checkout ingredients={ingredients} history={history} match={match} />);
    });

    it('should not redirect if ingredients are present', () => {
        expect(wrapper.find(RedirectIf).prop('shouldRedirect')).toBe(false);
    });

    it('should redirect if ingredients are not present', () => {
        wrapper.setProps({ ingredients: {} });
        expect(wrapper.find(RedirectIf).prop('shouldRedirect')).toBe(true);
    });

    it('should redirect to /burger', () => {
        expect(wrapper.find(RedirectIf).prop('to')).toBe('/burger');
    });

    it('should render <CheckoutSummary /> with the correct ingredients', () => {
        expect(wrapper.find(CheckoutSummary).prop('ingredients')).toEqual(ingredients);
    });

    it('should move the router backwards when <CheckoutSummary /> cancel button is clicked', () => {
        wrapper.find(CheckoutSummary).getElement().props.cancelled.apply(null);
        expect(history.goBack).toHaveBeenCalledTimes(1);
    });

    it('should navigate to contact data when <CheckoutSummary /> continue button is clicked', () => {
        wrapper.find(CheckoutSummary).getElement().props.continued.apply(null);
        expect(history.replace).toHaveBeenCalledTimes(1);
        expect(history.replace).toHaveBeenCalledWith('/checkout/contact-data');
    });

    it('should render a <Route /> component pointing to <ContactData />', () => {
        const route = wrapper.find(Route).prop('path');
        expect(route).toBe(`${match.path}/contact-data`);
    });

    it('should have <Route /> render <ContactData /> container when navigating', () => {
        const component = wrapper.find(Route).prop('component');
        expect(component).toEqual(ContactData);
    });
});