import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, ShallowWrapper } from "enzyme";
import Auth, {formData} from "./Auth";
import Form from "../UI/Form/Form";

configure({ adapter: new Adapter() });

describe('<Auth />', () => {

    let wrapper: ShallowWrapper;
    let login: jest.Mock;

    beforeEach(() => {
        login = jest.fn();
        wrapper = shallow(<Auth login={login} />);
    });

    it('should pass on all the relevant data to the <Form /> component', () => {
        const form = wrapper.find(Form);
        expect(form.prop('inputs')).toEqual(formData);
        expect(form.prop('submitBtnLabel')).toBe('LOGIN');
    });

    it('should send credentials when the form is submitted', () => {
        const credentials = {
            email: 'test@test.org',
            password: 'Pa$$w0rd'
        };
        wrapper.find(Form).simulate('submit', { ...credentials });
        expect(login).toHaveBeenCalledTimes(1);
        expect(login).toHaveBeenCalledWith(credentials);
    });
});