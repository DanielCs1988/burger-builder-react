import * as React from 'react';
import classes from './Toggle.css';

const toggle = ({ toggle }: Props) => (
    <div className={classes.DrawerToggle} onClick={toggle}>
        <div />
        <div />
        <div />
    </div>
);

export interface Props {
    toggle: () => void;
}

export default toggle;