import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, shallow, ShallowWrapper} from "enzyme";
import Input, {InputType} from "./Input";

configure({ adapter: new Adapter() });

describe('<Input />', () => {

    let wrapper: ShallowWrapper;
    let onChangeMock: jest.Mock;

    beforeEach(() => {
        onChangeMock = jest.fn();
        wrapper = shallow(<Input inputType={InputType.INPUT} value="testVal" id="testId"
                                 onChange={onChangeMock} valid={true} touched={false}
                                 config={{ placeholder: '( ͡° ͜ʖ ͡°)' }}
        />);
    });

    it('should render the label text', () => {
        const label = wrapper.find('label').text();
        expect(label).toBe('testId');
    });

    describe('Input Type', () => {

        it('should render the input field with the correct id', () => {
            const input = wrapper.find('input');
            expect(input.prop('id')).toBe('testId');
        });

        it('should render the input field with the correct value', () => {
            const input = wrapper.find('input');
            expect(input.prop('value')).toBe('testVal');
        });

        it('should render the input field with the correct placeholder from config', () => {
            const input = wrapper.find('input');
            expect(input.prop('placeholder')).toBe('( ͡° ͜ʖ ͡°)');
        });

        it('should pass on  the correct value to the onChange callback', () => {
            const event = {
                target: { value: 'kek' }
            };
            wrapper.find('input').simulate('change', event);
            expect(onChangeMock).toHaveBeenCalledTimes(1);
            expect(onChangeMock).toHaveBeenCalledWith(event);
        });
    });

    describe('Textarea Type', () => {

        beforeEach(() => {
            wrapper.setProps({ inputType: InputType.TEXTAREA });
        });

        it('should render the textarea with the correct id', () => {
            const input = wrapper.find('textarea');
            expect(input.prop('id')).toBe('testId');
        });

        it('should render the textarea with the correct value', () => {
            const text = wrapper.find('textarea').text();
            expect(text).toBe('testVal');
        });

        it('should render the textarea with the correct placeholder from config', () => {
            const input = wrapper.find('textarea');
            expect(input.prop('placeholder')).toBe('( ͡° ͜ʖ ͡°)');
        });

        it('should pass on the correct value to the onChange callback', () => {
            const event = {
                target: { value: 'kek' }
            };
            wrapper.find('textarea').simulate('change', event);
            expect(onChangeMock).toHaveBeenCalledTimes(1);
            expect(onChangeMock).toHaveBeenCalledWith(event);
        });
    });

    describe('Selector Type', () => {

        beforeEach(() => {
            wrapper.setProps({
                inputType: InputType.SELECT,
                value: 'gösser',
                options: [{
                    value: 'gut',
                    displayedValue: 'Gut'
                }, {
                    value: 'besser',
                    displayedValue: 'Besser'
                }, {
                    value: 'gösser',
                    displayedValue: 'Gösser'
                }]
            });
        });

        it('should render the selector with the correct id', () => {
            const input = wrapper.find('select');
            expect(input.prop('id')).toBe('testId');
        });

        it('should render the selector with the correct value', () => {
            const value = wrapper.find('select').prop('value');
            expect(value).toBe('gösser');
        });

        it('should pass on the correct value to the onChange callback', () => {
            const event = {
                target: { value: 'kek' }
            };
            wrapper.find('select').simulate('change', event);
            expect(onChangeMock).toHaveBeenCalledTimes(1);
            expect(onChangeMock).toHaveBeenCalledWith(event);
        });

        it('should render the correct options', () => {
            const expected = [
                <option value="gut">Gut</option>,
                <option value="besser">Besser</option>,
                <option value="gösser">Gösser</option>
            ];
            const value = wrapper.find('select');
            expect(value.containsAllMatchingElements(expected)).toBe(true);
        });
    });

    describe('Invalid Type', () => {

        it('should render nothing for an unsupported input type', () => {
            wrapper.setProps({ inputType: '(┛ಠ_ಠ)┛彡┻━┻' });
            expect(wrapper.isEmptyRender()).toBe(true);
        });
    });
});