import React from 'react';
import createStore from './store';
import {Provider} from 'react-redux';
import Comments from './component';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

// Check if we are bundling. If yes, package.json is found in ../ If no, then we are babelifying so it is in ./
const packageJsonPath = process.env.BUNDLING ? '..' : '.'
const infos = require(`${packageJsonPath}/package.json`);

const store = createStore();

const FocusComments = props => !__DEV__ ? (
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

FocusComments.VERSION = infos.version;

module.exports = FocusComments;
