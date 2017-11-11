import React from 'react';
import createStore from './store';
import { Provider } from 'react-redux';
import Comments from './component';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

// const infos = require(`${__PACKAGE_JSON_PATH__}package.json`);

const store = createStore();

let reduxDebug;
try {
    reduxDebug = __REDUX_DEBUG__;
} catch (error) {
    reduxDebug = false;
}

function FocusComments(props) {
    if (!reduxDebug) {
        return (
            <Provider store={store}>
                <Comments {...props} />
            </Provider>
        );
    }

    return (
        <div>
            <Provider store={store}>
                <Comments {...props} />
            </Provider>
            <DebugPanel top right bottom>
                <DevTools store={store} monitor={LogMonitor} />
            </DebugPanel>
        </div>
    );
}
FocusComments.VERSION = '';//infos.version;

export default FocusComments;
