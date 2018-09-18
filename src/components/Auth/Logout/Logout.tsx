import * as React from 'react';
import {Redirect} from "react-router";

class Logout extends React.Component<Props, object> {
    componentDidMount() {
        this.props.onLogout();
    }

    render() {
        return <Redirect to="/burger" />;
    }
}

export interface Props {
    onLogout: () => void;
}

export default Logout;