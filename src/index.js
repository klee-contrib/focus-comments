import React from 'react';
import createStore from './store';
import {Provider} from 'react-redux';
import Comments from './component';

const store = createStore();

export default props => (
    <Provider store={store}>
        <Comments {...props}/>
    </Provider>
);
