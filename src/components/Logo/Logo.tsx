import * as React from 'react';
import classes from './Logo.css'
import burgerLogo from '../../assets/images/burger-logo.png';

const logo = () => (
    <div className={classes.logo}>
        <img src={burgerLogo} alt="Burger Builder 30000" />
    </div>
);

export default logo;