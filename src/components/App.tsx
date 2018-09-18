import * as React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Layout from "../components/UI/Layout/Layout";
import BurgerBuilder from "../containers/BurgerBuilder/BurgerBuilder";
import Logout from "../containers/Auth/Logout/Logout";
import loadLazily from "../hoc/loadLazily/loadLazily";

const OrdersSummary = loadLazily(() => import('../containers/OrdersSummary/OrdersSummary'));
const Checkout = loadLazily(() => import('../containers/Checkout/Checkout'));
const Auth = loadLazily(() => import('../containers/Auth/Auth'));

class App extends React.Component<Props> {
    componentDidMount() {
        this.props.loginIfTokenPresent();
    }

    render() {
        const { isAuthenticated } = this.props;
        return (
            <div>
                <BrowserRouter>
                    <Layout isAuthenticated={isAuthenticated}>
                        <Switch>
                            <Route path="/burger" component={BurgerBuilder} />
                            <Route path="/authenticate" component={Auth} />
                            { isAuthenticated ? <Route path="/checkout" component={Checkout} /> : null }
                            { isAuthenticated ? <Route path="/orders" component={OrdersSummary} /> : null }
                            { isAuthenticated ? <Route path="/logout" component={Logout} /> : null }
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
