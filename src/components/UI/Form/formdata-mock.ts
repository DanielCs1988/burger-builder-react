import {FormData} from "./form.types";
import {InputType} from "./Input/Input";

export const rawForm: FormData = {
    text: {
        inputType: InputType.INPUT,
        value: 'Awesome text',
        config: {
            type: 'text',
            placeholder: 'Etc...'
        },
        validation: {
            required: true,
            pattern: /^[a-zA-Z\s]{3,15}$/
        }
    },
    textarea: {
        inputType: InputType.TEXTAREA,
        value: 'Let us build a framework!',
        config: {
            cols: 20,
            rows: 10,
            placeholder: 'Make a wish!'
        }
    },
    selector: {
        inputType: InputType.SELECT,
        value: 'gösser',
        options: [
            { value: 'gut', displayedValue: 'Gut' },
            { value: 'besser', displayedValue: 'Besser' },
            { value: 'gösser', displayedValue: 'Gösser' }
        ]
    }
};

export const processedForm: FormData = {
    text: {
        inputType: InputType.INPUT,
        value: 'Awesome text',
        valid: true,
        touched: false,
        config: {
            type: 'text',
            placeholder: 'Etc...'
        },
        validation: {
            required: true,
            pattern: /^[a-zA-Z\s]{3,15}$/
        }
    },
    textarea: {
        inputType: InputType.TEXTAREA,
        value: 'Let us build a framework!',
        valid: true,
        touched: false,
        config: {
            cols: 20,
            rows: 10,
            placeholder: 'Make a wish!'
        }
    },
    selector: {
        inputType: InputType.SELECT,
        value: 'gösser',
        valid: true,
        touched: false,
        options: [
            { value: 'gut', displayedValue: 'Gut' },
            { value: 'besser', displayedValue: 'Besser' },
            { value: 'gösser', displayedValue: 'Gösser' }
        ]
    }
};