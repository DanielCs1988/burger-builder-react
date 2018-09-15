import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import {applyMiddleware, compose, createStore, Store} from "redux";
import thunk from "redux-thunk";
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './store/rootReducer';
import App from './containers/App';
import './index.css';
import {AppState} from "./store/types";

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store: Store<AppState> = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
