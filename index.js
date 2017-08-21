'use strict';

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

var FocusComments = function FocusComments(props) {
    return !reduxDebug ? _react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(_component2.default, props)
    ) : _react2.default.createElement(
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
};

FocusComments.VERSION = ''; // infos.version;

module.exports = FocusComments;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInN0b3JlIiwicmVkdXhEZWJ1ZyIsIl9fUkVEVVhfREVCVUdfXyIsImVycm9yIiwiRm9jdXNDb21tZW50cyIsInByb3BzIiwiVkVSU0lPTiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFFQSxJQUFNQSxRQUFRLHNCQUFkOztBQUVBLElBQUlDLG1CQUFKO0FBQ0EsSUFBSTtBQUNBQSxpQkFBYUMsZUFBYjtBQUNILENBRkQsQ0FFRSxPQUFPQyxLQUFQLEVBQWM7QUFDWkYsaUJBQWEsS0FBYjtBQUNIOztBQUVELElBQU1HLGdCQUFnQixTQUFoQkEsYUFBZ0I7QUFBQSxXQUFTLENBQUNILFVBQUQsR0FDM0I7QUFBQTtBQUFBLFVBQVUsT0FBT0QsS0FBakI7QUFDSSwyREFBY0ssS0FBZDtBQURKLEtBRDJCLEdBSzNCO0FBQUE7QUFBQTtBQUNRO0FBQUE7QUFBQSxjQUFVLE9BQU9MLEtBQWpCO0FBQ0ksK0RBQWNLLEtBQWQ7QUFESixTQURSO0FBSVE7QUFBQTtBQUFBLGNBQVksU0FBWixFQUFnQixXQUFoQixFQUFzQixZQUF0QjtBQUNJLDhEQUFVLE9BQU9MLEtBQWpCLEVBQXdCLDJCQUF4QjtBQURKO0FBSlIsS0FMa0I7QUFBQSxDQUF0Qjs7QUFlQUksY0FBY0UsT0FBZCxHQUF3QixFQUF4QixDLENBQTJCOztBQUUzQkMsT0FBT0MsT0FBUCxHQUFpQkosYUFBakIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgY3JlYXRlU3RvcmUgZnJvbSAnLi9zdG9yZSc7XHJcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgQ29tbWVudHMgZnJvbSAnLi9jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEZXZUb29scywgRGVidWdQYW5lbCwgTG9nTW9uaXRvciB9IGZyb20gJ3JlZHV4LWRldnRvb2xzL2xpYi9yZWFjdCc7XHJcblxyXG4vLyBjb25zdCBpbmZvcyA9IHJlcXVpcmUoYCR7X19QQUNLQUdFX0pTT05fUEFUSF9ffXBhY2thZ2UuanNvbmApO1xyXG5cclxuY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZSgpO1xyXG5cclxubGV0IHJlZHV4RGVidWc7XHJcbnRyeSB7XHJcbiAgICByZWR1eERlYnVnID0gX19SRURVWF9ERUJVR19fO1xyXG59IGNhdGNoIChlcnJvcikge1xyXG4gICAgcmVkdXhEZWJ1ZyA9IGZhbHNlO1xyXG59XHJcblxyXG5jb25zdCBGb2N1c0NvbW1lbnRzID0gcHJvcHMgPT4gIXJlZHV4RGVidWcgPyAoXHJcbiAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cclxuICAgICAgICA8Q29tbWVudHMgey4uLnByb3BzfSAvPlxyXG4gICAgPC9Qcm92aWRlcj5cclxuKSA6IChcclxuICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxyXG4gICAgICAgICAgICAgICAgPENvbW1lbnRzIHsuLi5wcm9wc30gLz5cclxuICAgICAgICAgICAgPC9Qcm92aWRlcj5cclxuICAgICAgICAgICAgPERlYnVnUGFuZWwgdG9wIHJpZ2h0IGJvdHRvbT5cclxuICAgICAgICAgICAgICAgIDxEZXZUb29scyBzdG9yZT17c3RvcmV9IG1vbml0b3I9e0xvZ01vbml0b3J9IC8+XHJcbiAgICAgICAgICAgIDwvRGVidWdQYW5lbD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcblxyXG5Gb2N1c0NvbW1lbnRzLlZFUlNJT04gPSAnJzsvLyBpbmZvcy52ZXJzaW9uO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGb2N1c0NvbW1lbnRzO1xyXG4iXX0=