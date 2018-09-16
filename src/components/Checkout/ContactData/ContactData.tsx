import * as React from 'react';
import { FormEvent } from "react";
import classes from './ContactData.css';
import {InputType} from "../../UI/Input/Input";
import {Ingredients, Order, OrderData} from "../../../models";
import RedirectIf from "../../../hoc/RedirectIf/RedirectIf";
import Load from "../../../hoc/Load/Load";
import Button, {BtnType} from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";

class ContactData extends React.Component<Props, any> {
    state = {
        orderForm: {
            name: {
                inputType: InputType.INPUT,
                value: '',
                valid: false,
                touched: false,
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
                valid: false,
                touched: false,
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
                valid: false,
                touched: false,
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
                valid: false,
                touched: false,
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
                valid: true,
                touched: true,
                options: [
                    { value: 'fastest', displayedValue: 'Fastest' },
                    { value: 'normal', displayedValue: 'Normal' },
                    { value: 'cheapest', displayedValue: 'Cheapest' }
                ]
            }
        },
        formValidity: false
    };

    orderHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let orderData = {};
        for (const key in this.state.orderForm) {
            orderData[key] = this.state.orderForm[key].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            orderData: orderData as OrderData
        };
        this.props.sendOrder(order);
    };

    inputHandler = ({ target: { id, value } }: any) => {
        const valid = this.checkValidity(value, this.state.orderForm[id].validation);
        const orderForm = {
            ...this.state.orderForm,
            [id]: {
                ...this.state.orderForm[id],
                value, valid, touched: true
            }
        };
        const formValidity = Object.values(orderForm).every(field => field.valid);
        this.setState({ orderForm, formValidity });
    };

    
    checkValidity = (value: string, rules: any) => {
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

    render() {
        return (
            <RedirectIf shouldRedirect={this.props.purchased} to="/burger">
                <Load loading={this.props.loading}>
                    <div className={classes.ContactData}>
                        <h4>Enter your contact information</h4>
                        <form onSubmit={this.orderHandler}>
                            {
                                Object.keys(this.state.orderForm).map(key => {
                                    const props = this.state.orderForm[key];
                                    return <Input key={key} id={key} onChange={this.inputHandler} {...props} />
                                })
                            }
                            <Button btnType={BtnType.SUCCESS} disabled={!this.state.formValidity}>ORDER</Button>
                        </form>
                    </div>
                </Load>
            </RedirectIf>
        );
    }
}

export interface Props {
    ingredients: Ingredients;
    purchased: boolean;
    loading: boolean;
    sendOrder: (order: Order) => void;
}

export default ContactData;