import * as React from 'react';
import classes from './SideDrawer.css';
import Logo from "../../UI/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = ({ open, authenticated, closed }: Props) => {
    const openOrClosed = open ? classes.Open : classes.Close;
    return (
        <React.Fragment>
            <Backdrop show={open} closed={closed} />
            <div className={classes.SideDrawer + ' ' + openOrClosed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems authenticated={authenticated} />
                </nav>
            </div>
        </React.Fragment>
    );
};

export interface Props {
    open: boolean;
    authenticated: boolean;
    closed: () => void;
}

export default sideDrawer;