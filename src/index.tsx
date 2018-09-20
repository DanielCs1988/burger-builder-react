import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import {applyMiddleware, compose, createStore, Store} from "redux";
import createSagaMiddleware from "redux-saga";
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './store/rootReducer';
import App from './containers/App';
import './index.css';
import { AppState } from "./store/types";
import { rootSaga } from "./store/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = process.env.NODE_ENV === 'development' ?
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store: Store<AppState> = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
