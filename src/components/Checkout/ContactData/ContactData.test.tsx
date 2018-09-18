import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, shallow, ShallowWrapper} from "enzyme";
import ContactData, { formData } from "./ContactData";
import {DeliveryMethod, Ingredients, OrderData} from "../../../models";
import Load from "../../../hoc/Load/Load";
import RedirectIf from "../../../hoc/RedirectIf/RedirectIf";
import Form from "../../UI/Form/Form";

configure({ adapter: new Adapter() });

describe('<ContactData />', () => {

    const ingredients: Ingredients = {
        meat: 2,
        cheese: 1,
        bacon: 1,
        salad: 0
    };
    const orderData: OrderData = {
        name: 'Darth Vader',
        email: 'anakin13@coruscant.net',
        street: 'Executor Imperial Star Destroyer',
        zipCode: 'F0RC3-CH0K3',
        deliveryMethod: DeliveryMethod.FASTEST
    };
    let ordered: jest.Mock;
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        ordered = jest.fn();
        wrapper = shallow(<ContactData ingredients={ingredients} loading={false}
                                       purchased={false} sendOrder={ordered} token="abc" userId="V4D3R"
            />
        );
    });

    it('should pass on all the relevant data to the <Form /> component', () => {
        const form = wrapper.find(Form);
        expect(form.prop('inputs')).toEqual(formData);
        expect(form.prop('submitBtnLabel')).toBe('ORDER');
    });

    it('should not redirect while purchasing is in progress', () => {
        expect(wrapper.find(RedirectIf).prop('shouldRedirect')).toBe(false);
    });

    it('should redirect if the server accepted the order', () => {
        wrapper.setProps({ purchased: true });
        expect(wrapper.find(RedirectIf).prop('shouldRedirect')).toBe(true);
    });

    it('should redirect to /burger', () => {
        expect(wrapper.find(RedirectIf).prop('to')).toBe('/burger');
    });

    it('should set loading on the load component to false when not loading', () => {
        expect(wrapper.find(Load).prop('loading')).toBe(false);
    });

    it('should set loading component to load when loading', () => {
        wrapper.setProps({ loading: true });
        expect(wrapper.find(Load).prop('loading')).toBe(true);
    });

    it('should send the order with all the data present', () => {
        wrapper.find(Form).simulate('submit', { ...orderData });
        expect(ordered).toHaveBeenCalledWith({ ingredients, orderData, userId: 'V4D3R' }, 'abc');
    });
});