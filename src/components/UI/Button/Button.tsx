import * as React from 'react';
import classes from './Button.css';
import {ReactChildren} from "react";

const Button = ({ clicked, btnType, disabled, children }: Props) => (
    <button onClick={clicked} className={classes.Button + ' ' + classes[btnType]} disabled={disabled}>
        {children}
    </button>
);

export const enum BtnType {
    SUCCESS = 'Success',
    DANGER = 'Danger'
}

export interface Props {
    clicked?: () => void;
    btnType: BtnType;
    disabled?: boolean;
    children?: ReactChildren | string;
}

export default Button;