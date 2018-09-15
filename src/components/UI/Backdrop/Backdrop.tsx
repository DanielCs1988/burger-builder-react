import * as React from 'react';
import classes from './Backdrop.css';

const Backdrop = ({ show, closed }: Props) => (
    show ? <div className={classes.backdrop} onClick={closed} /> : null
);

export interface Props {
    show: boolean;
    closed: () => void;
}

export default Backdrop;