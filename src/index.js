import React from 'react';
import ReactDOM from 'react-dom';
//import { BrowserRouter, Route, useHistory } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { browserHistory, Route, Router } from 'react-router';
import { firebaseApp } from './firebase';
import App from './components/App';
import './index.css'
import Login from './components/Login';
import Register from './components/Register';
import reducer from './reducers';
import { logUser } from './actions';

const store = createStore(reducer);

firebaseApp.auth().onAuthStateChanged(user => {
    if (user) {
        console.log('user has signed in or up', user);
        const { email } = user;
        store.dispatch(logUser(email));
        browserHistory.push('/app');
    } else {
        console.log('user has signed out or on needs to sign in', user);
        browserHistory.replace('/login');
    }
});

ReactDOM.render(
    /*<BrowserRouter>
        <div>
            <Route exact="" path="/" component={Login} />
            <Route path="/app" component={App} />
            <Route path="/register" component={Register} />
        </div>
    </BrowserRouter>, document.getElementById('root')*/
    <Provider store={store}>
        <Router path="/" history={browserHistory} >
            <Route path="/login" component={Login} />
            <Route path="/app" component={App} />
            <Route path="/register" component={Register} />
        </Router>
    </Provider>, document.getElementById('root')

)