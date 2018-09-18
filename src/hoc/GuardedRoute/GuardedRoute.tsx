import * as React from 'react';
import {Route, RouteComponentProps} from "react-router";

const GuardedRoute = ({ canActivate, path, component }: Props) => (
    canActivate ? <Route path={path} component={component} /> : null
);

export interface Props {
    canActivate: boolean;
    path: string;
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

export default GuardedRoute;