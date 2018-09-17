import * as React from 'react';
import classes from './Auth.css';
import Form from "../UI/Form/Form";
import {FormValueMap} from "../UI/Form/form.types";
import {InputType} from "../UI/Form/Input/Input";

const Auth = ({ login }: Props) => (
    <div className={classes.Auth}>
        <Form inputs={formData} submitBtnLabel="LOGIN" onSubmit={login} />
    </div>
);

export interface Props {
    login: (credentials: FormValueMap) => void;
}

export const formData = {
    email: {
        inputType: InputType.INPUT,
        value: '',
        config: {
            type: 'email',
            placeholder: 'Your email address'
        },
        validation: {
            required: true
        }
    },
    password: {
        inputType: InputType.INPUT,
        value: '',
        config: {
            type: 'password'
        },
        validation: {
            required: true,
            minLength: 6
        }
    }
};

export default Auth;