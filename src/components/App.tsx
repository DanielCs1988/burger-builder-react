import * as React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Layout from "../components/UI/Layout/Layout";
import BurgerBuilder from "../containers/BurgerBuilder/BurgerBuilder";
import OrdersSummary from "../containers/OrdersSummary/OrdersSummary";
import Checkout from "../containers/Checkout/Checkout";
import Auth from "../containers/Auth/Auth";
import Logout from "../containers/Auth/Logout/Logout";
import GuardedRoute from "../hoc/GuardedRoute/GuardedRoute";

class App extends React.Component<Props> {
    render() {
        const { isAuthenticated } = this.props;
        return (
            <div>
                <BrowserRouter>
                    <Layout isAuthenticated={isAuthenticated}>
                        <Switch>
                            <Route path="/burger" component={BurgerBuilder} />
                            <Route path="/authenticate" component={Auth} />
                            <GuardedRoute canActivate={isAuthenticated} path="/checkout" component={Checkout} />
                            <GuardedRoute canActivate={isAuthenticated} path="/orders" component={OrdersSummary} />
                            <GuardedRoute canActivate={isAuthenticated} path="/logout" component={Logout} />
                            <Redirect to="/burger" />
                        </Switch>
                    </Layout>
                </BrowserRouter>
            </div>
        );
    }
}

export interface Props {
    isAuthenticated: boolean;
    loginIfTokenPresent: () => void;
}

export default App;
