import React from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import App from './App';

const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <div>
                <Switch>
                    <Route path='/:filter' component={App} />
                </Switch>
            </div>
        </Router>
    </Provider>
);

export default Root;