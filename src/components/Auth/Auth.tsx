import * as React from 'react';
import classes from './Auth.css';
import Form from "../UI/Form/Form";
import {InputType} from "../UI/Form/Input/Input";
import {Credentials} from "../../models";
import Button, {BtnType} from "../UI/Button/Button";
import Load from "../../hoc/Load/Load";
import Error from "../UI/Error/Error";
import RedirectIf from "../../hoc/RedirectIf/RedirectIf";

class Auth extends React.Component<Props, State> {
    state = {
        signIn: true
    };

    toggleMethod = () => {
        this.setState(state => ({ signIn: !state.signIn }))
    };

    render() {
        const { signIn } = this.state;
        const { onLogin, onRegister, isAuthenticated, building, loading, error } = this.props;
        const authFunction = signIn ? onLogin : onRegister;
        return (
            <RedirectIf shouldRedirect={isAuthenticated} to={building ? '/checkout' : '/burger'}>
                <div className={classes.Auth}>
                    <Load loading={loading}>
                        <Error show={error !== null} message={error || ''}/>
                        <Form inputs={formData}
                              submitBtnLabel={ signIn ? 'SIGN IN' : 'SIGN UP' }
                              onSubmit={authFunction}
                        />
                        <Button btnType={BtnType.DANGER} clicked={this.toggleMethod}>
                            { signIn ? 'SWITCH TO SIGN UP' : 'SWITCH TO SIGN IN' }
                        </Button>
                    </Load>
                </div>
            </RedirectIf>
        );
    }
}

export interface Props {
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    building: boolean;
    onRegister: (credentials: Credentials) => void;
    onLogin: (credentials: Credentials) => void;
}

export interface State {
    signIn: boolean;
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