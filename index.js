'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _reactRedux = require('react-redux');

var _component = require('./component');

var _component2 = _interopRequireDefault(_component);

var _react3 = require('redux-devtools/lib/react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const infos = require(`${__PACKAGE_JSON_PATH__}package.json`);

var store = (0, _store2.default)();

var reduxDebug = void 0;
try {
    reduxDebug = __REDUX_DEBUG__;
} catch (error) {
    reduxDebug = false;
}

function FocusComments(props) {
    if (!reduxDebug) {
        return _react2.default.createElement(
            _reactRedux.Provider,
            { store: store },
            _react2.default.createElement(_component2.default, props)
        );
    }

    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            _reactRedux.Provider,
            { store: store },
            _react2.default.createElement(_component2.default, props)
        ),
        _react2.default.createElement(
            _react3.DebugPanel,
            { top: true, right: true, bottom: true },
            _react2.default.createElement(_react3.DevTools, { store: store, monitor: _react3.LogMonitor })
        )
    );
}
FocusComments.VERSION = ''; //infos.version;

exports.default = FocusComments;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInN0b3JlIiwicmVkdXhEZWJ1ZyIsIl9fUkVEVVhfREVCVUdfXyIsImVycm9yIiwiRm9jdXNDb21tZW50cyIsInByb3BzIiwiVkVSU0lPTiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFFQSxJQUFNQSxRQUFRLHNCQUFkOztBQUVBLElBQUlDLG1CQUFKO0FBQ0EsSUFBSTtBQUNBQSxpQkFBYUMsZUFBYjtBQUNILENBRkQsQ0FFRSxPQUFPQyxLQUFQLEVBQWM7QUFDWkYsaUJBQWEsS0FBYjtBQUNIOztBQUVELFNBQVNHLGFBQVQsQ0FBdUJDLEtBQXZCLEVBQThCO0FBQzFCLFFBQUksQ0FBQ0osVUFBTCxFQUFpQjtBQUNiLGVBQ0k7QUFBQTtBQUFBLGNBQVUsT0FBT0QsS0FBakI7QUFDSSwrREFBY0ssS0FBZDtBQURKLFNBREo7QUFLSDs7QUFFRCxXQUNJO0FBQUE7QUFBQTtBQUNJO0FBQUE7QUFBQSxjQUFVLE9BQU9MLEtBQWpCO0FBQ0ksK0RBQWNLLEtBQWQ7QUFESixTQURKO0FBSUk7QUFBQTtBQUFBLGNBQVksU0FBWixFQUFnQixXQUFoQixFQUFzQixZQUF0QjtBQUNJLDhEQUFVLE9BQU9MLEtBQWpCLEVBQXdCLDJCQUF4QjtBQURKO0FBSkosS0FESjtBQVVIO0FBQ0RJLGNBQWNFLE9BQWQsR0FBd0IsRUFBeEIsQyxDQUEyQjs7a0JBRVpGLGEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNyZWF0ZVN0b3JlIGZyb20gJy4vc3RvcmUnO1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgQ29tbWVudHMgZnJvbSAnLi9jb21wb25lbnQnO1xuaW1wb3J0IHsgRGV2VG9vbHMsIERlYnVnUGFuZWwsIExvZ01vbml0b3IgfSBmcm9tICdyZWR1eC1kZXZ0b29scy9saWIvcmVhY3QnO1xuXG4vLyBjb25zdCBpbmZvcyA9IHJlcXVpcmUoYCR7X19QQUNLQUdFX0pTT05fUEFUSF9ffXBhY2thZ2UuanNvbmApO1xuXG5jb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKCk7XG5cbmxldCByZWR1eERlYnVnO1xudHJ5IHtcbiAgICByZWR1eERlYnVnID0gX19SRURVWF9ERUJVR19fO1xufSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZWR1eERlYnVnID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIEZvY3VzQ29tbWVudHMocHJvcHMpIHtcbiAgICBpZiAoIXJlZHV4RGVidWcpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgICAgICAgICAgIDxDb21tZW50cyB7Li4ucHJvcHN9IC8+XG4gICAgICAgICAgICA8L1Byb3ZpZGVyPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICAgICAgICAgICAgICA8Q29tbWVudHMgey4uLnByb3BzfSAvPlxuICAgICAgICAgICAgPC9Qcm92aWRlcj5cbiAgICAgICAgICAgIDxEZWJ1Z1BhbmVsIHRvcCByaWdodCBib3R0b20+XG4gICAgICAgICAgICAgICAgPERldlRvb2xzIHN0b3JlPXtzdG9yZX0gbW9uaXRvcj17TG9nTW9uaXRvcn0gLz5cbiAgICAgICAgICAgIDwvRGVidWdQYW5lbD5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cbkZvY3VzQ29tbWVudHMuVkVSU0lPTiA9ICcnOy8vaW5mb3MudmVyc2lvbjtcblxuZXhwb3J0IGRlZmF1bHQgRm9jdXNDb21tZW50cztcbiJdfQ==