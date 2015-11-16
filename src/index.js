import React from 'react';
import createStore from './store';
import {Provider} from 'react-redux';
import Comments from './component';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

const store = createStore();

export default props => !__DEV__ ? (
    <Provider store={store}>
        <Comments {...props}/>
    </Provider>
) : (
    <div>
        <Provider store={store}>
            <Comments {...props}/>
        </Provider>
        <DebugPanel top right bottom>
            <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
    </div>
);
