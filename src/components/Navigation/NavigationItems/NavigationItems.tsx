import * as React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ({ authenticated }: Props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/burger">Burger Builder</NavigationItem>
        { authenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null }
        {
            authenticated ?
                <NavigationItem link="/logout">Logout</NavigationItem> :
                <NavigationItem link="/authenticate">Authenticate</NavigationItem>
        }
    </ul>
);

export interface Props {
    authenticated: boolean;
}

export default navigationItems;