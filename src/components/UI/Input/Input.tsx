import * as React from 'react';
import classes from './Input.css';

const input = ({ inputType, value, id, onChange, valid, touched, config, ...props }: Props) => {
    let inputField = null;
    let validityClass = '';
    if (touched) {
        validityClass = valid ? classes.Valid : classes.Invalid;
    }
    switch (inputType) {
        case InputType.INPUT:
            inputField = <input value={value} id={id} onChange={onChange} {...config} />;
            break;
        case InputType.TEXTAREA:
            inputField = <textarea id={id} onChange={onChange} {...config}>{value}</textarea>;
            break;
        case InputType.SELECT:
            const optionsHtml = (props as any).options.map((option: Option) => (
                <option key={option.value} value={option.value}>{option.displayedValue}</option>
            ));
            inputField = <select value={value} id={id} onChange={onChange} {...config}>{optionsHtml}</select>;
            break;
        default:
            return null;
    }
    return (
        <div className={`${classes.Input} ${validityClass}`}>
            <label htmlFor={id}>{id}</label>
            {inputField}
        </div>
    );
};

export const enum InputType {
    INPUT = 'INPUT',
    TEXTAREA = 'TEXTAREA',
    SELECT = 'SELECT'
}

export interface Option {
    value: string;
    displayedValue: string;
}

export interface Props {
    inputType: InputType;
    value: string;
    id: string;
    onChange: () => void;
    valid: boolean;
    touched: boolean;
    config: any;
    props: any;
}

export default input;