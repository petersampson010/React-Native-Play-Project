import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import rootReducer from './rootReducer';


const store = createStore(rootReducer);

export default () => (
    <Provider store={store}>
        <App />
    </Provider>
);