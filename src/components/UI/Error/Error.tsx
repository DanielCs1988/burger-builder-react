import * as React from 'react';
import classes from './Error.css';

class Error extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { show: props.show };
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState({ show: nextProps.show });
    }

    clickHandler = () => {
        this.setState(prevState => ({ show: !prevState.show }));
    };

    render() {
        return (
            this.state.show ?
                <div className={classes.Error} onClick={this.clickHandler}>{this.props.message}</div>
                : null
        );
    }
}

export interface Props {
    show: boolean;
    message: string;
}

export interface State {
    show: boolean;
}

export default Error;