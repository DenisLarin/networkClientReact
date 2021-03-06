import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter} from 'react-router-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';

//store
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk'
import Authorization from "./store/reducers/authorization/authorization";
import User from './store/reducers/user/user'
import Feeds from './store/reducers/feeds/feeds'
import Likes from './store/reducers/likes/likes'
import Friends from './store/reducers/friends/friends'
import Search from './store/reducers/search/search'

// const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const rootReducer = combineReducers({
    authorizationReducer: Authorization,
    userReducer: User,
    feedsReducer: Feeds,
    likesReducer: Likes,
    friendsReducer: Friends,
    searchReducer: Search,

});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);


ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
