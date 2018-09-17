import * as React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Layout from "./UI/Layout/Layout";
import BurgerBuilder from "../containers/BurgerBuilder/BurgerBuilder";
import OrdersSummary from "../containers/OrdersSummary/OrdersSummary";
import Checkout from "../containers/Checkout/Checkout";
import Auth from "../containers/Auth/Auth";

class App extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Layout>
                        <Switch>
                            <Route path="/burger" component={BurgerBuilder} />
                            <Route path="/checkout" component={Checkout} />
                            <Route path="/orders" component={OrdersSummary} />
                            <Route path="/login" component={Auth} />
                            <Redirect from="/" to="/burger" />
                        </Switch>
                    </Layout>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
