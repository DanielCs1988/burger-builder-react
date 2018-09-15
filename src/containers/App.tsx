import * as React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Layout from "./Layout/Layout";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Orders from "./Orders/Orders";
import Checkout from "./Checkout/Checkout";

class App extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Layout>
                        <Switch>
                            <Route path="/burger" component={BurgerBuilder} />
                            <Route path="/checkout" component={Checkout} />
                            <Route path="/orders" component={Orders} />
                            <Redirect from="/" to="/burger" />
                        </Switch>
                    </Layout>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
