import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './stores'
import {
    HashRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import Loadable from 'react-loadable';
import Main from "./components/Layout";

const ItemList = Loadable({
    loader:  () => import("./item/list"),
    loading: () => <p>加载中...</p>,
});
const OrderList = Loadable({
    loader: () => import("./order/list"),
    loading: () => <p>加载中...</p>,
});

const store = createStore(rootReducer);

render(
    <Provider store={store}>
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/item/list">item list</Link>
                        </li>
                        <li>
                            <Link to="/order/list">order list</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/item/list">
                        <ItemList />
                    </Route>
                    <Route path="/order/list">
                        <OrderList />
                    </Route>
                    <Route path="/">
                        <Main />
                    </Route>
                </Switch>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);
