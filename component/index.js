'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

require('./style.scss');

require('font-awesome/css/font-awesome.css');

require('material-design-icons-iconfont/dist/material-design-icons.scss');

var _actions = require('../actions');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
    apiRootUrl: _react.PropTypes.string.isRequired,
    concept: _react.PropTypes.string.isRequired,
    conceptId: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]).isRequired,
    userPictureResolver: _react.PropTypes.func.isRequired,
    texts: _react.PropTypes.shape({
        placeholder: _react.PropTypes.string.isRequired,
        send: _react.PropTypes.string.isRequired,
        edit: _react.PropTypes.string.isRequired,
        cancel: _react.PropTypes.string.isRequired,
        title: _react.PropTypes.string.isRequired,
        singleComment: _react.PropTypes.string.isRequired,
        comments: _react.PropTypes.string.isRequired,
        lastUpdate: _react.PropTypes.string.isRequired,
        loading: _react.PropTypes.string.isRequired,
        empty: _react.PropTypes.string.isRequired
    }).isRequired,
    locale: _react.PropTypes.string.isRequired,
    messageSentCallback: _react.PropTypes.func,
    timeDisplay: _react.PropTypes.oneOf(['ago', 'dateTime']),
    dateTimeFormat: _react.PropTypes.string,
    registerRefreshCommentsMethod: _react.PropTypes.func,
    unregisterRefreshCommentsMethod: _react.PropTypes.func
};

var defaultProps = {
    userPictureResolver: function userPictureResolver(userId) {
        return './x/account/api/accounts/' + userId + '/photo';
    },
    texts: {
        placeholder: 'Leave a comment...',
        send: 'Send',
        edit: 'Edit',
        cancel: 'Cancel',
        title: 'Comments',
        singleComment: 'comment',
        comments: 'comments',
        lastUpdate: 'Last update',
        loading: 'Loading...',
        empty: 'Be the first to leave your comment below !'
    },
    locale: 'en',
    timeDisplay: 'ago',
    dateTimeFormat: 'DD/MM/YYYY HH:mm',
    registerRefreshCommentsMethod: undefined,
    unregisterRefreshCommentsMethod: undefined
};

var Container = function (_Component) {
    _inherits(Container, _Component);

    function Container(props) {
        _classCallCheck(this, Container);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this._refreshComments = _this._refreshComments.bind(_this);
        return _this;
    }

    Container.prototype.componentWillMount = function componentWillMount() {
        var _props = this.props,
            dispatch = _props.dispatch,
            apiRootUrl = _props.apiRootUrl,
            concept = _props.concept,
            conceptId = _props.conceptId,
            locale = _props.locale,
            registerRefreshCommentsMethod = _props.registerRefreshCommentsMethod;


        if (registerRefreshCommentsMethod) {
            registerRefreshCommentsMethod(this._refreshComments);
        }

        _moment2.default.locale(this.props.locale);
        dispatch((0, _actions.getComments)(concept, conceptId, apiRootUrl));
    };

    Container.prototype.componentDidMount = function componentDidMount() {
        var _this2 = this;

        // Set an interval to refresh the moment() computed dates.
        this.refreshInterval = setInterval(function () {
            _this2.setState({});
        }, 60000);
    };

    Container.prototype.componentWillUnmount = function componentWillUnmount() {
        var _props2 = this.props,
            dispatch = _props2.dispatch,
            unregisterRefreshCommentsMethod = _props2.unregisterRefreshCommentsMethod;


        if (unregisterRefreshCommentsMethod) {
            unregisterRefreshCommentsMethod();
        }

        dispatch((0, _actions.clearComments)());
        clearInterval(this.refreshInterval);
    };

    Container.prototype._refreshComments = function _refreshComments() {
        var _props3 = this.props,
            dispatch = _props3.dispatch,
            concept = _props3.concept,
            conceptId = _props3.conceptId,
            apiRootUrl = _props3.apiRootUrl;

        dispatch((0, _actions.getComments)(concept, conceptId, apiRootUrl));
    };

    Container.prototype.render = function render() {
        var _this3 = this;

        var _props4 = this.props,
            comments = _props4.comments,
            dispatch = _props4.dispatch,
            isLoading = _props4.isLoading,
            lastUpdate = _props4.lastUpdate,
            error = _props4.error,
            otherProps = _objectWithoutProperties(_props4, ['comments', 'dispatch', 'isLoading', 'lastUpdate', 'error']);

        return _react2.default.createElement(
            'div',
            { 'data-focus': 'comments-extension' },
            _react2.default.createElement(
                'div',
                { 'data-focus': 'header' },
                _react2.default.createElement(
                    'div',
                    { 'data-focus': 'title' },
                    this.props.texts.title
                ),
                _react2.default.createElement(
                    'div',
                    { 'data-focus': 'last-update' },
                    isLoading ? this.props.texts.loading : this.props.texts.lastUpdate + ' ' + (0, _moment2.default)(lastUpdate).fromNow()
                ),
                _react2.default.createElement(
                    'div',
                    { 'data-focus': 'refresh' },
                    _react2.default.createElement(
                        'button',
                        { className: 'mdl-button mdl-js-button mdl-button--fab mdl-button--colored mdl-button--raised', onClick: this._refreshComments },
                        isLoading ? _react2.default.createElement('i', { className: 'fa fa-circle-o-notch fa-spin' }) : _react2.default.createElement(
                            'i',
                            { className: 'material-icons' },
                            'refresh'
                        )
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                { 'data-focus': 'body' },
                _react2.default.createElement(
                    'div',
                    { 'data-focus': 'count' },
                    comments.length + ' ' + (comments.length > 1 ? this.props.texts.comments : this.props.texts.singleComment)
                ),
                error && _react2.default.createElement(
                    'div',
                    { 'data-focus': 'comments-error' },
                    _react2.default.createElement(
                        'i',
                        { className: 'material-icons' },
                        'cloud_off'
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        error
                    )
                ),
                _react2.default.createElement('div', { className: 'separator' }),
                comments.length === 0 ? _react2.default.createElement(
                    'div',
                    { 'data-focus': 'empty-list' },
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'i',
                            { className: 'material-icons' },
                            'forum'
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            this.props.texts.empty
                        )
                    )
                ) : _react2.default.createElement(_list2.default, _extends({ comments: comments, dispatch: dispatch, isLoading: isLoading }, otherProps, { ref: 'list' }))
            ),
            _react2.default.createElement(
                'div',
                { 'data-focus': 'input' },
                _react2.default.createElement(
                    'i',
                    { className: 'material-icons' },
                    'insert_comment'
                ),
                _react2.default.createElement(_input2.default, _extends({ dispatch: dispatch, isLoading: isLoading, scrollToBottom: function scrollToBottom() {
                        if (_this3.refs.list) _this3.refs.list.scrollToBottom();
                    } }, otherProps))
            )
        );
    };

    return Container;
}(_react.Component);

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

var select = function select(_ref) {
    var comments = _ref.comments,
        isLoading = _ref.isLoading,
        lastUpdate = _ref.lastUpdate,
        error = _ref.error;

    return { comments: comments, isLoading: isLoading, lastUpdate: lastUpdate, error: error };
};

exports.default = (0, _reactRedux.connect)(select)(Container);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInByb3BUeXBlcyIsImFwaVJvb3RVcmwiLCJzdHJpbmciLCJpc1JlcXVpcmVkIiwiY29uY2VwdCIsImNvbmNlcHRJZCIsIm9uZU9mVHlwZSIsIm51bWJlciIsInVzZXJQaWN0dXJlUmVzb2x2ZXIiLCJmdW5jIiwidGV4dHMiLCJzaGFwZSIsInBsYWNlaG9sZGVyIiwic2VuZCIsImVkaXQiLCJjYW5jZWwiLCJ0aXRsZSIsInNpbmdsZUNvbW1lbnQiLCJjb21tZW50cyIsImxhc3RVcGRhdGUiLCJsb2FkaW5nIiwiZW1wdHkiLCJsb2NhbGUiLCJtZXNzYWdlU2VudENhbGxiYWNrIiwidGltZURpc3BsYXkiLCJvbmVPZiIsImRhdGVUaW1lRm9ybWF0IiwicmVnaXN0ZXJSZWZyZXNoQ29tbWVudHNNZXRob2QiLCJ1bnJlZ2lzdGVyUmVmcmVzaENvbW1lbnRzTWV0aG9kIiwiZGVmYXVsdFByb3BzIiwidXNlcklkIiwidW5kZWZpbmVkIiwiQ29udGFpbmVyIiwicHJvcHMiLCJfcmVmcmVzaENvbW1lbnRzIiwiYmluZCIsImNvbXBvbmVudFdpbGxNb3VudCIsImRpc3BhdGNoIiwiY29tcG9uZW50RGlkTW91bnQiLCJyZWZyZXNoSW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsInNldFN0YXRlIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJjbGVhckludGVydmFsIiwicmVuZGVyIiwiaXNMb2FkaW5nIiwiZXJyb3IiLCJvdGhlclByb3BzIiwiZnJvbU5vdyIsImxlbmd0aCIsInJlZnMiLCJsaXN0Iiwic2Nyb2xsVG9Cb3R0b20iLCJzZWxlY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxZQUFZO0FBQ2RDLGdCQUFZLGlCQUFVQyxNQUFWLENBQWlCQyxVQURmO0FBRWRDLGFBQVMsaUJBQVVG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a0JBQUssY0FBVyxPQUFoQjtBQUNJO0FBQUE7QUFBQSxzQkFBRyxXQUFVLGdCQUFiO0FBQUE7QUFBQSxpQkFESjtBQUVJLDBFQUFPLFVBQVVWLFFBQWpCLEVBQTJCLFdBQVdRLFNBQXRDLEVBQWlELGdCQUFnQiwwQkFBTTtBQUFFLDRCQUFJLE9BQUtLLElBQUwsQ0FBVUMsSUFBZCxFQUFvQixPQUFLRCxJQUFMLENBQVVDLElBQVYsQ0FBZUMsY0FBZjtBQUFpQyxxQkFBOUgsSUFBb0lMLFVBQXBJO0FBRko7QUFsQ0osU0FESjtBQXlDSCxLOzs7OztBQUdMZixVQUFVaEMsU0FBVixHQUFzQkEsU0FBdEI7QUFDQWdDLFVBQVVILFlBQVYsR0FBeUJBLFlBQXpCOztBQUVBLElBQU13QixTQUFTLFNBQVRBLE1BQVMsT0FBZ0Q7QUFBQSxRQUE3Q25DLFFBQTZDLFFBQTdDQSxRQUE2QztBQUFBLFFBQW5DMkIsU0FBbUMsUUFBbkNBLFNBQW1DO0FBQUEsUUFBeEIxQixVQUF3QixRQUF4QkEsVUFBd0I7QUFBQSxRQUFaMkIsS0FBWSxRQUFaQSxLQUFZOztBQUMzRCxXQUFPLEVBQUU1QixrQkFBRixFQUFZMkIsb0JBQVosRUFBdUIxQixzQkFBdkIsRUFBbUMyQixZQUFuQyxFQUFQO0FBQ0gsQ0FGRDs7a0JBSWUseUJBQVFPLE1BQVIsRUFBZ0JyQixTQUFoQixDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgTGlzdCBmcm9tICcuL2xpc3QnO1xyXG5pbXBvcnQgSW5wdXQgZnJvbSAnLi9pbnB1dCc7XHJcbmltcG9ydCAnLi9zdHlsZS5zY3NzJztcclxuaW1wb3J0ICdmb250LWF3ZXNvbWUvY3NzL2ZvbnQtYXdlc29tZS5jc3MnO1xyXG5pbXBvcnQgJ21hdGVyaWFsLWRlc2lnbi1pY29ucy1pY29uZm9udC9kaXN0L21hdGVyaWFsLWRlc2lnbi1pY29ucy5zY3NzJztcclxuaW1wb3J0IHsgZ2V0Q29tbWVudHMsIGNsZWFyQ29tbWVudHMgfSBmcm9tICcuLi9hY3Rpb25zJztcclxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5cclxuY29uc3QgcHJvcFR5cGVzID0ge1xyXG4gICAgYXBpUm9vdFVybDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgY29uY2VwdDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgY29uY2VwdElkOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubnVtYmVyXSkuaXNSZXF1aXJlZCxcclxuICAgIHVzZXJQaWN0dXJlUmVzb2x2ZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICB0ZXh0czogUHJvcFR5cGVzLnNoYXBlKHtcclxuICAgICAgICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgICAgIHNlbmQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICBlZGl0OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgY2FuY2VsOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICBzaW5nbGVDb21tZW50OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgY29tbWVudHM6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICBsYXN0VXBkYXRlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgbG9hZGluZzogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgICAgIGVtcHR5OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcclxuICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgIG1lc3NhZ2VTZW50Q2FsbGJhY2s6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgdGltZURpc3BsYXk6IFByb3BUeXBlcy5vbmVPZihbJ2FnbycsICdkYXRlVGltZSddKSxcclxuICAgIGRhdGVUaW1lRm9ybWF0OiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgcmVnaXN0ZXJSZWZyZXNoQ29tbWVudHNNZXRob2Q6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgdW5yZWdpc3RlclJlZnJlc2hDb21tZW50c01ldGhvZDogUHJvcFR5cGVzLmZ1bmNcclxufVxyXG5cclxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgdXNlclBpY3R1cmVSZXNvbHZlcjogdXNlcklkID0+IGAuL3gvYWNjb3VudC9hcGkvYWNjb3VudHMvJHt1c2VySWR9L3Bob3RvYCxcclxuICAgIHRleHRzOiB7XHJcbiAgICAgICAgcGxhY2Vob2xkZXI6ICdMZWF2ZSBhIGNvbW1lbnQuLi4nLFxyXG4gICAgICAgIHNlbmQ6ICdTZW5kJyxcclxuICAgICAgICBlZGl0OiAnRWRpdCcsXHJcbiAgICAgICAgY2FuY2VsOiAnQ2FuY2VsJyxcclxuICAgICAgICB0aXRsZTogJ0NvbW1lbnRzJyxcclxuICAgICAgICBzaW5nbGVDb21tZW50OiAnY29tbWVudCcsXHJcbiAgICAgICAgY29tbWVudHM6ICdjb21tZW50cycsXHJcbiAgICAgICAgbGFzdFVwZGF0ZTogJ0xhc3QgdXBkYXRlJyxcclxuICAgICAgICBsb2FkaW5nOiAnTG9hZGluZy4uLicsXHJcbiAgICAgICAgZW1wdHk6ICdCZSB0aGUgZmlyc3QgdG8gbGVhdmUgeW91ciBjb21tZW50IGJlbG93ICEnXHJcbiAgICB9LFxyXG4gICAgbG9jYWxlOiAnZW4nLFxyXG4gICAgdGltZURpc3BsYXk6ICdhZ28nLFxyXG4gICAgZGF0ZVRpbWVGb3JtYXQ6ICdERC9NTS9ZWVlZIEhIOm1tJyxcclxuICAgIHJlZ2lzdGVyUmVmcmVzaENvbW1lbnRzTWV0aG9kOiB1bmRlZmluZWQsXHJcbiAgICB1bnJlZ2lzdGVyUmVmcmVzaENvbW1lbnRzTWV0aG9kOiB1bmRlZmluZWRcclxufVxyXG5cclxuY2xhc3MgQ29udGFpbmVyIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuXHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaENvbW1lbnRzID0gdGhpcy5fcmVmcmVzaENvbW1lbnRzLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgICAgIGNvbnN0IHsgZGlzcGF0Y2gsIGFwaVJvb3RVcmwsIGNvbmNlcHQsIGNvbmNlcHRJZCwgbG9jYWxlLCByZWdpc3RlclJlZnJlc2hDb21tZW50c01ldGhvZCB9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICAgICAgaWYgKHJlZ2lzdGVyUmVmcmVzaENvbW1lbnRzTWV0aG9kKSB7XHJcbiAgICAgICAgICAgIHJlZ2lzdGVyUmVmcmVzaENvbW1lbnRzTWV0aG9kKHRoaXMuX3JlZnJlc2hDb21tZW50cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtb21lbnQubG9jYWxlKHRoaXMucHJvcHMubG9jYWxlKTtcclxuICAgICAgICBkaXNwYXRjaChnZXRDb21tZW50cyhjb25jZXB0LCBjb25jZXB0SWQsIGFwaVJvb3RVcmwpKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICAvLyBTZXQgYW4gaW50ZXJ2YWwgdG8gcmVmcmVzaCB0aGUgbW9tZW50KCkgY29tcHV0ZWQgZGF0ZXMuXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe30pO1xyXG4gICAgICAgIH0sIDYwMDAwKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICBjb25zdCB7IGRpc3BhdGNoLCB1bnJlZ2lzdGVyUmVmcmVzaENvbW1lbnRzTWV0aG9kIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgICAgICBpZiAodW5yZWdpc3RlclJlZnJlc2hDb21tZW50c01ldGhvZCkge1xyXG4gICAgICAgICAgICB1bnJlZ2lzdGVyUmVmcmVzaENvbW1lbnRzTWV0aG9kKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkaXNwYXRjaChjbGVhckNvbW1lbnRzKCkpO1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5yZWZyZXNoSW50ZXJ2YWwpO1xyXG4gICAgfVxyXG5cclxuICAgIF9yZWZyZXNoQ29tbWVudHMoKSB7XHJcbiAgICAgICAgY29uc3QgeyBkaXNwYXRjaCwgY29uY2VwdCwgY29uY2VwdElkLCBhcGlSb290VXJsIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGRpc3BhdGNoKGdldENvbW1lbnRzKGNvbmNlcHQsIGNvbmNlcHRJZCwgYXBpUm9vdFVybCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7IGNvbW1lbnRzLCBkaXNwYXRjaCwgaXNMb2FkaW5nLCBsYXN0VXBkYXRlLCBlcnJvciwgLi4ub3RoZXJQcm9wcyB9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2NvbW1lbnRzLWV4dGVuc2lvbic+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2hlYWRlcic+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSd0aXRsZSc+e3RoaXMucHJvcHMudGV4dHMudGl0bGV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdsYXN0LXVwZGF0ZSc+e2lzTG9hZGluZyA/IHRoaXMucHJvcHMudGV4dHMubG9hZGluZyA6IGAke3RoaXMucHJvcHMudGV4dHMubGFzdFVwZGF0ZX0gJHttb21lbnQobGFzdFVwZGF0ZSkuZnJvbU5vdygpfWB9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdyZWZyZXNoJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J21kbC1idXR0b24gbWRsLWpzLWJ1dHRvbiBtZGwtYnV0dG9uLS1mYWIgbWRsLWJ1dHRvbi0tY29sb3JlZCBtZGwtYnV0dG9uLS1yYWlzZWQnIG9uQ2xpY2s9e3RoaXMuX3JlZnJlc2hDb21tZW50c30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXNMb2FkaW5nID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1jaXJjbGUtby1ub3RjaCBmYS1zcGluXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9J21hdGVyaWFsLWljb25zJz5yZWZyZXNoPC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdib2R5Jz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2NvdW50Jz57YCR7Y29tbWVudHMubGVuZ3RofSAke2NvbW1lbnRzLmxlbmd0aCA+IDEgPyB0aGlzLnByb3BzLnRleHRzLmNvbW1lbnRzIDogdGhpcy5wcm9wcy50ZXh0cy5zaW5nbGVDb21tZW50fWB9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAge2Vycm9yICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0nY29tbWVudHMtZXJyb3InPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPSdtYXRlcmlhbC1pY29ucyc+Y2xvdWRfb2ZmPC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj57ZXJyb3J9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc2VwYXJhdG9yJz48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICB7Y29tbWVudHMubGVuZ3RoID09PSAwID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdlbXB0eS1saXN0Jz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPSdtYXRlcmlhbC1pY29ucyc+Zm9ydW08L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj57dGhpcy5wcm9wcy50ZXh0cy5lbXB0eX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8TGlzdCBjb21tZW50cz17Y29tbWVudHN9IGRpc3BhdGNoPXtkaXNwYXRjaH0gaXNMb2FkaW5nPXtpc0xvYWRpbmd9IHsuLi5vdGhlclByb3BzfSByZWY9J2xpc3QnIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2lucHV0Jz5cclxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9J21hdGVyaWFsLWljb25zJz5pbnNlcnRfY29tbWVudDwvaT5cclxuICAgICAgICAgICAgICAgICAgICA8SW5wdXQgZGlzcGF0Y2g9e2Rpc3BhdGNofSBpc0xvYWRpbmc9e2lzTG9hZGluZ30gc2Nyb2xsVG9Cb3R0b209eygpID0+IHsgaWYgKHRoaXMucmVmcy5saXN0KSB0aGlzLnJlZnMubGlzdC5zY3JvbGxUb0JvdHRvbSgpIH19IHsuLi5vdGhlclByb3BzfSAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkNvbnRhaW5lci5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XHJcbkNvbnRhaW5lci5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XHJcblxyXG5jb25zdCBzZWxlY3QgPSAoeyBjb21tZW50cywgaXNMb2FkaW5nLCBsYXN0VXBkYXRlLCBlcnJvciB9KSA9PiB7XHJcbiAgICByZXR1cm4geyBjb21tZW50cywgaXNMb2FkaW5nLCBsYXN0VXBkYXRlLCBlcnJvciB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KHNlbGVjdCkoQ29udGFpbmVyKTtcclxuIl19