import * as React from 'react';
import { NavLink } from "react-router-dom";
import classes from './NavigationItem.css';
import {ReactChildren} from "react";

const navigationItem = ({ link, children }: Props) => (
    <li className={classes.NavigationItem}>
        <NavLink to={link} activeClassName={classes.active} >{children}</NavLink>
    </li>
);

export interface Props {
    link: string;
    children: ReactChildren | string;
}

export default navigationItem;