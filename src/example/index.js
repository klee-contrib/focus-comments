import React from 'react';
import {render} from 'react-dom';
import createStore from '../store';
import {Provider} from 'react-redux';
import Comments from '../component';

const store = createStore();

const rootElement = document.querySelector('.comments');
render(
    <Provider store={store}>
        <Comments/>
    </Provider>,
    rootElement
);
