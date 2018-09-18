import * as React from 'react';
import classes from './Toolbar.css';
import Logo from "../../UI/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Toggle from "../Toggle/Toggle";

const toolbar = ({ authenticated, toggle }: Props) => (
    <header className={classes.Toolbar}>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <Toggle toggle={toggle} />
        <nav className={classes.DesktopOnly}>
            <NavigationItems authenticated={authenticated} />
        </nav>
    </header>
);

export interface Props {
    authenticated: boolean;
    toggle: () => void;
}

export default toolbar;