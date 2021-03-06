import * as React from 'react';
import classes from './Layout.css';
import Toolbar from "../../Navigation/Toolbar/Toolbar";
import SideDrawer from "../../Navigation/SideDrawer/SideDrawer";

class Layout extends React.Component<Props, State> {
    state = {
        showSideDrawer: false
    };
    
    toggleSideDrawer = () => {
        this.setState(prevState => ({ showSideDrawer: !prevState.showSideDrawer }));
    };
    
    render() {
        return (
            <React.Fragment>
                <Toolbar toggle={this.toggleSideDrawer}
                         authenticated={this.props.isAuthenticated} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.toggleSideDrawer}
                            authenticated={this.props.isAuthenticated} />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
}

export interface Props {
    isAuthenticated: boolean;
    children?: JSX.Element | JSX.Element[];
}

export interface State {
    showSideDrawer: boolean;
}

export default Layout;