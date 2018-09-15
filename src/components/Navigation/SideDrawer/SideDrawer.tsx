import * as React from 'react';
import classes from './SideDrawer.css';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = ({ open, closed }: Props) => {
    const openOrClosed = open ? classes.Open : classes.Close;
    return (
        <React.Fragment>
            <Backdrop show={open} closed={closed} />
            <div className={classes.SideDrawer + ' ' + openOrClosed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </React.Fragment>
    );
};

export interface Props {
    open: boolean;
    closed: () => void;
}

export default sideDrawer;