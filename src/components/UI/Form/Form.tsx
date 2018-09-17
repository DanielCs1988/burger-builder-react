import * as React from 'react';
import { FormEvent } from "react";
import { FormData, FormValueMap } from "./form.types";
import {initFormValidity, validateForm, validateInputValue} from "./form-validator";
import Input from "./Input/Input";
import Button, { BtnType } from "../Button/Button";

class Form extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = initFormValidity(props.inputs);
    }

    inputHandler = ({ target: { id, value } }: any) => {
        const { inputs } = this.state;
        const valid = validateInputValue(value, inputs[id].validation);
        const updatedFormData = {
            ...inputs,
            [id]: {
                ...inputs[id],
                touched: true,
                value, valid
            }
        };
        const formValidity = validateForm(updatedFormData);
        this.setState({ inputs: updatedFormData, valid: formValidity });
    };

    onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (this.state.valid) {
            let formData = {};
            for (const key in this.state.inputs) {
                formData[key] = this.state.inputs[key].value;
            }
            this.props.onSubmit(formData);
        }
    };

    render() {
        return (
            <form onSubmit={this.onSubmitHandler}>
                {
                    Object.keys(this.state.inputs).map(key => {
                        const props = this.state.inputs[key];
                        return <Input key={key} id={key} onChange={this.inputHandler} {...props} />
                    })
                }
                <Button btnType={BtnType.SUCCESS} disabled={!this.state.valid}>{this.props.submitBtnLabel}</Button>
            </form>
        );
    }
}

export interface Props {
    inputs: FormData;
    submitBtnLabel: string;
    onSubmit: (formValues: FormValueMap) => void;
}

export interface State {
    inputs: FormData;
    valid: boolean;
}

export default Form;