import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import rootReducer from './rootReducer';


const store = createStore(rootReducer);

export default () => (
    <Provider store={store}>
        <App />
    </Provider>
);