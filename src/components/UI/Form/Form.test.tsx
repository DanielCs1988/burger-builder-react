import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, ShallowWrapper } from "enzyme";
import Form, {State} from "./Form";
import {InputType} from "./Input/Input";
import Button, {BtnType} from "../Button/Button";
import {rawForm} from "./formdata-mock";

configure({ adapter: new Adapter() });

describe('<Form />', () => {

    let wrapper: ShallowWrapper;
    let submitted: jest.Mock;
    let state: State;

    beforeEach(() => {
        submitted = jest.fn();
        wrapper = shallow(<Form inputs={{ ...rawForm }} submitBtnLabel="GO" onSubmit={submitted} />);
        state = wrapper.state() as State;
    });

    it('should prevent the submit event from reloading the page', () => {
        const event = { preventDefault: jest.fn() };
        wrapper.find('form').simulate('submit', event);
        expect(event.preventDefault).toHaveBeenCalledTimes(1);
    });

    it('should call the onSubmit prop fn with the form data when the form is valid', () => {
        const event = { preventDefault: jest.fn() };
        wrapper.find('form').simulate('submit', event);
        expect(submitted).toHaveBeenCalledTimes(1);
        expect(submitted).toHaveBeenCalledWith({
            text: 'Awesome text',
            textarea: 'Let us build a framework!',
            selector: 'gösser'
        })
    });

    it('should do nothing if submit is called on an invalid form', () => {
        wrapper.setState({ valid: false });
        const event = { preventDefault: jest.fn() };
        wrapper.find('form').simulate('submit', event);
        expect(submitted).toHaveBeenCalledTimes(0);
    });

    it('should render the order button with SUCCESS btnType', () => {
        const button = wrapper.find(Button);
        expect(button.prop('btnType')).toBe(BtnType.SUCCESS);
    });

    it('should render the order button with the prop submitBtnLabel', () => {
        const button = wrapper.find(Button);
        expect(button.prop('children')).toBe('GO');
    });

    it('should enable to order button when the form is valid', () => {
        expect(wrapper.find(Button).prop('disabled')).toBe(false);
    });

    it('should disable to order button when the form is invalid', () => {
        wrapper.setState({ valid: false });
        expect(wrapper.find(Button).prop('disabled')).toBe(true);
    });

    it('should render one text input field', () => {
        const inputs = wrapper.findWhere(el => el.prop('inputType') === InputType.INPUT);
        expect(inputs).toHaveLength(1);
    });

    it('should render one textarea input field', () => {
        const inputs = wrapper.findWhere(el => el.prop('inputType') === InputType.TEXTAREA);
        expect(inputs).toHaveLength(1);
    });

    it('should render one select input field', () => {
        const inputs = wrapper.findWhere(el => el.prop('inputType') === InputType.SELECT);
        expect(inputs).toHaveLength(1);
    });

    it('should render input fields with the correct key and id', () => {
        const input = wrapper.findWhere(el => el.key() === 'text');
        expect(input.prop('id')).toBe('text');
    });

    it('should pass on validity to form fields', () => {
        wrapper.setState({ inputs: {
                ...state.inputs,
                textarea: { ...state.inputs.textarea, valid: false }
            } });
        const firstInput = wrapper.findWhere(el => el.key() === 'text');
        expect(firstInput.prop('valid')).toBe(true);
        const secondInput = wrapper.findWhere(el => el.key() === 'textarea');
        expect(secondInput.prop('valid')).toBe(false);
    });

    it('should pass on touched status to form fields', () => {
        wrapper.setState((prevState: State) => ({ inputs: {
                ...prevState.inputs,
            textarea: {
                ...prevState.inputs.textarea,
                touched: true
            }
        } }));
        const firstInput = wrapper.findWhere(el => el.key() === 'text');
        expect(firstInput.prop('touched')).toBe(false);
        const secondInput = wrapper.findWhere(el => el.key() === 'textarea');
        expect(secondInput.prop('touched')).toBe(true);
    });

    it('should render input fields with the correct configuration', () => {
        const input = wrapper.findWhere(el => el.key() === 'text');
        expect(input.prop('config')).toEqual({
            type: 'text',
            placeholder: 'Etc...'
        });
    });

    it('should pass on options array to the select input', () => {
        const input = wrapper.findWhere(el => el.key() === 'selector');
        expect(input.prop('options')).toEqual(rawForm.selector.options);
    });

    it('should validate and save valid form data to the state', () => {
        const event = { target: { id: 'text', value: 'Burger needed' } };
        const expected = {
            ...state,
            inputs: {
                ...state.inputs,
                text: {
                    ...state.inputs.text,
                    value: 'Burger needed',
                    valid: true,
                    touched: true
                }
            }
        };
        wrapper.findWhere(el => el.key() === 'text').simulate('change', event);
        expect(wrapper.state()).toEqual(expected);
    });

    it('should invalidate and save invalid form data to the state', () => {
        const event = { target: { id: 'text', value: 'A man needs a burger!' } };
        const expected = {
            ...state,
            valid: false,
            inputs: {
                ...state.inputs,
                text: {
                    ...state.inputs.text,
                    value: 'A man needs a burger!',
                    valid: false,
                    touched: true
                }
            }
        };
        wrapper.findWhere(el => el.key() === 'text').simulate('change', event);
        expect(wrapper.state()).toEqual(expected);
    });

    it('should consider an input without validation valid by default', () => {
        wrapper.setState((prevState: State) => ({ inputs: {
            ...prevState.inputs,
            textarea: {
                ...prevState.inputs.textarea,
                valid: false
            }
        } }));
        const event = { target: { id: 'textarea', value: 'Anything can go here...' } };
        const expected = {
            ...state,
            inputs: {
                ...state.inputs,
                textarea: {
                    ...state.inputs.textarea,
                    value: 'Anything can go here...',
                    valid: true,
                    touched: true
                }
            }
        };
        wrapper.findWhere(el => el.key() === 'textarea').simulate('change', event);
        expect(wrapper.state()).toEqual(expected);
    });
});