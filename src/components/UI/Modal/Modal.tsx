import * as React from 'react';
import classes from './Modal.css';
import Backdrop from "../Backdrop/Backdrop";

class Modal extends React.Component<Props, object> {

    // Will not update if the modal is not shown but the ingredients change.
    shouldComponentUpdate(nextProps: Readonly<Props>) {
        return nextProps.show !== this.props.show ||
            nextProps.children !== this.props.children;
    }

    render() {
        const { show, closed, children } = this.props;
        const style = show ? classes.show: classes.hide;
        return (
            <React.Fragment>
                <Backdrop show={show} closed={closed} />
                <div className={classes.Modal + ' ' + style}>
                    {children}
                </div>
            </React.Fragment>
        );
    }
}

export interface Props {
    show: boolean;
    closed: () => void;
    children?: JSX.Element | JSX.Element[] | null;
}

export default Modal;