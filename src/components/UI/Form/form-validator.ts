import {FormData, Validation} from "./form.types";

export const validateInputValue = (value: string, rules?: Validation) => {
    if (!rules) {
        return true;
    }
    let isValid = true;
    if (rules.required && value.trim().length < 1) {
        isValid = false;
    }
    if (rules.minLength && value.trim().length < rules.minLength) {
        isValid = false;
    }
    if (rules.maxLength && value.length > rules.maxLength) {
        isValid = false;
    }
    if (rules.pattern && !value.match(rules.pattern)) {
        isValid = false;
    }
    return isValid;
};

export const validateForm = (formData: FormData) => {
    return Object.values(formData).every(field => field.valid);
};