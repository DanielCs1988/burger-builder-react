import {InputType} from "./Input/Input";

export interface Validation {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string | RegExp;
}

export interface SelectOption {
    value: string;
    displayedValue: string;
}

export interface FormField {
    inputType: InputType;
    value: string;
    valid: boolean;
    touched: boolean;
    config?: any;
    validation?: Validation;
    options?: SelectOption[]
}

export type FormData = {
    [key: string]: FormField
}

export type FormValueMap = {
    [key: string]: string;
};