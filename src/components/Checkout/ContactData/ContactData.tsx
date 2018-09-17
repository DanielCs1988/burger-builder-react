import * as React from 'react';
import classes from './ContactData.css';
import RedirectIf from "../../../hoc/RedirectIf/RedirectIf";
import Load from "../../../hoc/Load/Load";
import Form from "../../UI/Form/Form";
import { InputType } from "../../UI/Form/Input/Input";
import { Ingredients, Order } from "../../../models";
import { FormValueMap } from "../../UI/Form/form.types";

const ContactData = ({ ingredients, purchased, loading, sendOrder }: Props) => (
    <RedirectIf shouldRedirect={purchased} to="/burger">
        <Load loading={loading}>
            <div className={classes.ContactData}>
                <h4>Enter your contact information</h4>
                <Form inputs={formData} submitBtnLabel="ORDER"
                      onSubmit={(orderData: FormValueMap) => sendOrder({ orderData, ingredients })}
                />
            </div>
        </Load>
    </RedirectIf>
);

export interface Props {
    ingredients: Ingredients;
    purchased: boolean;
    loading: boolean;
    sendOrder: (order: Order) => void;
}

export const formData = {
    name: {
        inputType: InputType.INPUT,
        value: '',
        config: {
            type: 'text',
            placeholder: 'Your name'
        },
        validation: {
            required: true,
            minLength: 5,
            maxLength: 30
        }
    },
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
    street: {
        inputType: InputType.INPUT,
        value: '',
        config: {
            type: 'text',
            placeholder: 'Street you live in'
        },
        validation: {
            required: true
        }
    },
    zipCode: {
        inputType: InputType.INPUT,
        value: '',
        config: {
            type: 'text',
            placeholder: 'Your zipCode'
        },
        validation: {
            required: true
        }
    },
    deliveryMethod: {
        inputType: InputType.SELECT,
        value: 'fastest',
        options: [
            {value: 'fastest', displayedValue: 'Fastest'},
            {value: 'normal', displayedValue: 'Normal'},
            {value: 'cheapest', displayedValue: 'Cheapest'}
        ]
    }
};

export default ContactData;