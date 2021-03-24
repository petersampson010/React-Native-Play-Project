import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import rootReducer from './rootReducer';
import FlashMessage from 'react-native-flash-message';
import OpenerScreen from './screens/opener/opener';



const store = createStore(rootReducer);

export default () => (
    <Provider store={store}>
        <App />
        <FlashMessage position="top" />
    </Provider>
);