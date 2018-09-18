import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, ShallowWrapper } from "enzyme";
import Auth, {formData} from "./Auth";
import Form from "../UI/Form/Form";
import Button from "../UI/Button/Button";
import Load from "../../hoc/Load/Load";
import RedirectIf from "../../hoc/RedirectIf/RedirectIf";

configure({ adapter: new Adapter() });

describe('<Auth />', () => {

    let wrapper: ShallowWrapper;
    let register: jest.Mock;
    let login: jest.Mock;

    beforeEach(() => {
        register = jest.fn();
        login = jest.fn();
        wrapper = shallow(<Auth onRegister={register} onLogin={login} loading={false}
                                error={null} isAuthenticated={false} building={false}
        />);
    });

    it('should redirect when authenticated', () => {
        wrapper.setProps({ isAuthenticated: true });
        expect(wrapper.find(RedirectIf).prop('shouldRedirect')).toBe(true);
    });

    it('should redirect to /burger when no burger is being built', () => {
        expect(wrapper.find(RedirectIf).prop('to')).toBe('/burger');
    });

    it('should redirect to /check when a burger was started', () => {
        wrapper.setProps({ building: true });
        expect(wrapper.find(RedirectIf).prop('to')).toBe('/checkout');
    });

    it('should not redirect when not authenticated', () => {
        expect(wrapper.find(RedirectIf).prop('shouldRedirect')).toBe(false);
    });

    it('should show loading when loading', () => {
        wrapper.setProps({ loading: true });
        expect(wrapper.find(Load).prop('loading')).toBe(true);
    });

    it('should hide loading when not loading', () => {
        expect(wrapper.find(Load).prop('loading')).toBe(false);
    });

    it('should pass on the form data to the <Form /> component', () => {
        expect(wrapper.find(Form).prop('inputs')).toEqual(formData);
    });

    it('should show sign in button by default', () => {
        expect(wrapper.find(Form).prop('submitBtnLabel')).toBe('SIGN IN');
    });

    it('should show sign up button when switched', () => {
        wrapper.setState({ signIn: false });
        expect(wrapper.find(Form).prop('submitBtnLabel')).toBe('SIGN UP');
    });

    it('should show switch to sign up button by default', () => {
        expect(wrapper.find(Button).prop('children')).toBe('SWITCH TO SIGN UP');
    });

    it('should show switch to sign in when switched', () => {
        wrapper.setState({ signIn: false });
        expect(wrapper.find(Button).prop('children')).toBe('SWITCH TO SIGN IN');
    });

    it('should call login with the credentials by default', () => {
        const credentials = {
            email: 'test@test.org',
            password: 'Pa$$w0rd'
        };
        wrapper.find(Form).simulate('submit', { ...credentials });
        expect(login).toHaveBeenCalledTimes(1);
        expect(login).toHaveBeenCalledWith(credentials);
    });

    it('should call register with the credentials when switched', () => {
        wrapper.setState({ signIn: false });
        const credentials = {
            email: 'test@test.org',
            password: 'Pa$$w0rd'
        };
        wrapper.find(Form).simulate('submit', { ...credentials });
        expect(register).toHaveBeenCalledTimes(1);
        expect(register).toHaveBeenCalledWith(credentials);
    });
});