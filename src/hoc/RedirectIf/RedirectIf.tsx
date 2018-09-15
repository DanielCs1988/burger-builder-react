import * as React from 'react';
import { Redirect } from "react-router-dom";

const RedirectIf = ({ shouldRedirect, to, children }: Props) => (
    <React.Fragment>{
        shouldRedirect ?
            <Redirect to={to} /> :
            children
    }</React.Fragment>
);

export interface Props {
    shouldRedirect: boolean;
    to: string;
    children?: JSX.Element | JSX.Element[];
}

export default RedirectIf;