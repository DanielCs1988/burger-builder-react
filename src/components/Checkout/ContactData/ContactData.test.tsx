import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, ShallowWrapper } from "enzyme";
import ContactData from "./ContactData";
import {Ingredients} from "../../../models";
import Load from "../../../hoc/Load/Load";
import RedirectIf from "../../../hoc/RedirectIf/RedirectIf";
import Button, {BtnType} from "../../UI/Button/Button";
import {InputType} from "../../UI/Input/Input";

configure({ adapter: new Adapter() });

describe('<ContactData />', () => {

    const ingredients: Ingredients = {
        meat: 2,
        cheese: 1,
        bacon: 1,
        salad: 0
    };
    let ordered: jest.Mock;
    let wrapper: ShallowWrapper;
    let state: any;

    beforeEach(() => {
        ordered = jest.fn();
        wrapper = shallow(
            <ContactData ingredients={ingredients} loading={false} purchased={false} sendOrder={ordered} />
        );
        wrapper.setState((state: any) => ({
            orderForm: {
                ...state.orderForm,
                name: {
                    ...state.orderForm.name,
                    value: 'Darth Vader',
                    valid: true
                },
                email: {
                    ...state.orderForm.email,
                    value: 'anakin13@coruscant.net',
                    valid: true,
                    touched: true
                },
                street: {
                    ...state.orderForm.street,
                    value: 'Executor Imperial Star Destroyer',
                    valid: true
                },
                zipCode: {
                    ...state.orderForm.zipCode,
                    value: 'F0RC3-CH0K3',
                    valid: true
                }
            },
            formValidity: true
        }));
        state = wrapper.state();
    });

    it('should not while purchasing is in progress', () => {
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

    it('should call the order function and submit the form without reloading the page', () => {
        const event = { preventDefault: jest.fn() };
        wrapper.find('form').simulate('submit', event);
        expect(ordered).toHaveBeenCalledTimes(1);
        expect(event.preventDefault).toHaveBeenCalledTimes(1);
    });

    it('should send the order with all the data present', () => {
        const event = { preventDefault: jest.fn() };
        wrapper.find('form').simulate('submit', event);
        expect(ordered).toHaveBeenCalledWith({
            ingredients,
            orderData: {
                name: 'Darth Vader',
                email: 'anakin13@coruscant.net',
                street: 'Executor Imperial Star Destroyer',
                zipCode: 'F0RC3-CH0K3',
                deliveryMethod: 'fastest'
            }
        });
    });

    it('should render the order button with SUCCESS style and ORDER label', () => {
        const button = wrapper.find(Button);
        expect(button.prop('btnType')).toBe(BtnType.SUCCESS);
        expect(button.prop('children')).toBe('ORDER');
    });

    it('should enable to order button when the form is valid', () => {
        expect(wrapper.find(Button).prop('disabled')).toBe(false);
    });

    it('should disable to order button when the form is invalid', () => {
        wrapper.setState({ formValidity: false });
        expect(wrapper.find(Button).prop('disabled')).toBe(true);
    });

    it('should render 4 text input fields', () => {
        const normals = wrapper.findWhere(el => el.prop('inputType') === InputType.INPUT);
        expect(normals).toHaveLength(4);
    });

    it('should render 1 select input field', () => {
        const normals = wrapper.findWhere(el => el.prop('inputType') === InputType.SELECT);
        expect(normals).toHaveLength(1);
    });

    it('should render input fields with the correct key and id', () => {
        const input = wrapper.findWhere(el => el.key() === 'street');
        expect(input.prop('id')).toBe('street');
    });

    it('should pass on validity to form fields', () => {
        wrapper.setState({ orderForm: {
            ...state.orderForm,
            zipCode: { ...state.orderForm.zipCode, valid: false }
        } });
        const firstInput = wrapper.findWhere(el => el.key() === 'email');
        expect(firstInput.prop('valid')).toBe(true);
        const secondInput = wrapper.findWhere(el => el.key() === 'zipCode');
        expect(secondInput.prop('valid')).toBe(false);
    });

    it('should pass on touched status to form fields', () => {
        const firstInput = wrapper.findWhere(el => el.key() === 'email');
        expect(firstInput.prop('touched')).toBe(true);
        const secondInput = wrapper.findWhere(el => el.key() === 'zipCode');
        expect(secondInput.prop('touched')).toBe(false);
    });

    it('should render input fields with the correct configuration', () => {
        const input = wrapper.findWhere(el => el.key() === 'name');
        expect(input.prop('config')).toEqual({
            type: 'text',
            placeholder: 'Your name'
        });
    });

    it('should save valid [NAME] form data to the state', () => {
        const event = { target: { id: 'name', value: 'Jedi Knight Anakin' } };
        const expected = {
            ...state,
            orderForm: {
                ...state.orderForm,
                name: {
                    ...state.orderForm.name,
                    value: 'Jedi Knight Anakin',
                    valid: true,
                    touched: true
                }
            }
        };
        wrapper.findWhere(el => el.key() === 'name').simulate('change', event);
        expect(wrapper.state()).toEqual(expected);
    });

    it('should save invalid [NAME] form data to the state', () => {
        const event = { target: { id: 'name', value: 'Vade' } };
        const expected = {
            ...state,
            formValidity: false,
            orderForm: {
                ...state.orderForm,
                name: {
                    ...state.orderForm.name,
                    value: 'Vade',
                    valid: false,
                    touched: true
                }
            }
        };
        wrapper.findWhere(el => el.key() === 'name').simulate('change', event);
        expect(wrapper.state()).toEqual(expected);
    });

    it('should save valid [EMAIL] form data to the state', () => {
        const event = { target: { id: 'email', value: 'purger@order66.rekt' } };
        const expected = {
            ...state,
            orderForm: {
                ...state.orderForm,
                email: {
                    ...state.orderForm.email,
                    value: 'purger@order66.rekt',
                    valid: true,
                    touched: true
                }
            }
        };
        wrapper.findWhere(el => el.key() === 'email').simulate('change', event);
        expect(wrapper.state()).toEqual(expected);
    });

    it('should save invalid [EMAIL] form data to the state', () => {
        const event = { target: { id: 'email', value: '' } };
        const expected = {
            ...state,
            formValidity: false,
            orderForm: {
                ...state.orderForm,
                email: {
                    ...state.orderForm.email,
                    value: '',
                    valid: false,
                    touched: true
                }
            }
        };
        wrapper.findWhere(el => el.key() === 'email').simulate('change', event);
        expect(wrapper.state()).toEqual(expected);
    });

    it('should save valid [STREET] form data to the state', () => {
        const event = { target: { id: 'street', value: 'Deathstar, room 66.' } };
        const expected = {
            ...state,
            orderForm: {
                ...state.orderForm,
                street: {
                    ...state.orderForm.street,
                    value: 'Deathstar, room 66.',
                    valid: true,
                    touched: true
                }
            }
        };
        wrapper.findWhere(el => el.key() === 'street').simulate('change', event);
        expect(wrapper.state()).toEqual(expected);
    });

    it('should save invalid [STREET] form data to the state', () => {
        const event = { target: { id: 'street', value: '' } };
        const expected = {
            ...state,
            formValidity: false,
            orderForm: {
                ...state.orderForm,
                street: {
                    ...state.orderForm.street,
                    value: '',
                    valid: false,
                    touched: true
                }
            }
        };
        wrapper.findWhere(el => el.key() === 'street').simulate('change', event);
        expect(wrapper.state()).toEqual(expected);
    });

    it('should save valid [ZIPCODE] form data to the state', () => {
        const event = { target: { id: 'zipCode', value: '12345' } };
        const expected = {
            ...state,
            orderForm: {
                ...state.orderForm,
                zipCode: {
                    ...state.orderForm.zipCode,
                    value: '12345',
                    valid: true,
                    touched: true
                }
            }
        };
        wrapper.findWhere(el => el.key() === 'zipCode').simulate('change', event);
        expect(wrapper.state()).toEqual(expected);
    });

    it('should save invalid [ZIP CODE] form data to the state', () => {
        const event = { target: { id: 'zipCode', value: '' } };
        const expected = {
            ...state,
            formValidity: false,
            orderForm: {
                ...state.orderForm,
                zipCode: {
                    ...state.orderForm.zipCode,
                    value: '',
                    valid: false,
                    touched: true
                }
            }
        };
        wrapper.findWhere(el => el.key() === 'zipCode').simulate('change', event);
        expect(wrapper.state()).toEqual(expected);
    });

    it('should save [DELIVERY METHOD] form data to the state', () => {
        const event = { target: { id: 'deliveryMethod', value: 'cheapest' } };
        const expected = {
            ...state,
            orderForm: {
                ...state.orderForm,
                deliveryMethod: {
                    ...state.orderForm.deliveryMethod,
                    value: 'cheapest'
                }
            }
        };
        wrapper.findWhere(el => el.key() === 'deliveryMethod').simulate('change', event);
        expect(wrapper.state()).toEqual(expected);
    });
});