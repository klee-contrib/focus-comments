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
    currentUserId: _react.PropTypes.number,
    canDelete: _react.PropTypes.bool,
    texts: _react.PropTypes.shape({
        placeholder: _react.PropTypes.string.isRequired,
        send: _react.PropTypes.string.isRequired,
        edit: _react.PropTypes.string.isRequired,
        delete: _react.PropTypes.string.isRequired,
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
    currentUserId: undefined,
    canDelete: false,
    texts: {
        placeholder: 'Leave a comment...',
        send: 'Send',
        edit: 'Edit',
        delete: 'Delete',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInByb3BUeXBlcyIsImFwaVJvb3RVcmwiLCJzdHJpbmciLCJpc1JlcXVpcmVkIiwiY29uY2VwdCIsImNvbmNlcHRJZCIsIm9uZU9mVHlwZSIsIm51bWJlciIsInVzZXJQaWN0dXJlUmVzb2x2ZXIiLCJmdW5jIiwiY3VycmVudFVzZXJJZCIsImNhbkRlbGV0ZSIsImJvb2wiLCJ0ZXh0cyIsInNoYXBlIiwicGxhY2Vob2xkZXIiLCJzZW5kIiwiZWRpdCIsImRlbGV0ZSIsImNhbmNlbCIsInRpdGxlIiwic2luZ2xlQ29tbWVudCIsImNvbW1lbnRzIiwibGFzdFVwZGF0ZSIsImxvYWRpbmciLCJlbXB0eSIsImxvY2FsZSIsIm1lc3NhZ2VTZW50Q2FsbGJhY2siLCJ0aW1lRGlzcGxheSIsIm9uZU9mIiwiZGF0ZVRpbWVGb3JtYXQiLCJyZWdpc3RlclJlZnJlc2hDb21tZW50c01ldGhvZCIsInVucmVnaXN0ZXJSZWZyZXNoQ29tbWVudHNNZXRob2QiLCJkZWZhdWx0UHJvcHMiLCJ1c2VySWQiLCJ1bmRlZmluZWQiLCJDb250YWluZXIiLCJwcm9wcyIsIl9yZWZyZXNoQ29tbWVudHMiLCJiaW5kIiwiY29tcG9uZW50V2lsbE1vdW50IiwiZGlzcGF0Y2giLCJjb21wb25lbnREaWRNb3VudCIsInJlZnJlc2hJbnRlcnZhbCIsInNldEludGVydmFsIiwic2V0U3RhdGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImNsZWFySW50ZXJ2YWwiLCJyZW5kZXIiLCJpc0xvYWRpbmciLCJlcnJvciIsIm90aGVyUHJvcHMiLCJmcm9tTm93IiwibGVuZ3RoIiwicmVmcyIsImxpc3QiLCJzY3JvbGxUb0JvdHRvbSIsInNlbGVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFlBQVk7QUFDZEMsZ0JB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eUJBREo7QUFFSTtBQUFBO0FBQUE7QUFBTSxpQ0FBS2hCLEtBQUwsQ0FBV3hCLEtBQVgsQ0FBaUJZO0FBQXZCO0FBRko7QUFESixpQkFESCxHQVFHLHlEQUFNLFVBQVVILFFBQWhCLEVBQTBCLFVBQVVtQixRQUFwQyxFQUE4QyxXQUFXUSxTQUF6RCxJQUF3RUUsVUFBeEUsSUFBb0YsS0FBSSxNQUF4RjtBQWpCUixhQWRKO0FBa0NJO0FBQUE7QUFBQSxrQkFBSyxjQUFXLE9BQWhCO0FBQ0k7QUFBQTtBQUFBLHNCQUFHLFdBQVUsZ0JBQWI7QUFBQTtBQUFBLGlCQURKO0FBRUksMEVBQU8sVUFBVVYsUUFBakIsRUFBMkIsV0FBV1EsU0FBdEMsRUFBaUQsZ0JBQWdCLDBCQUFNO0FBQUUsNEJBQUksT0FBS0ssSUFBTCxDQUFVQyxJQUFkLEVBQW9CLE9BQUtELElBQUwsQ0FBVUMsSUFBVixDQUFlQyxjQUFmO0FBQWlDLHFCQUE5SCxJQUFvSUwsVUFBcEk7QUFGSjtBQWxDSixTQURKO0FBeUNILEs7Ozs7O0FBR0xmLFVBQVVwQyxTQUFWLEdBQXNCQSxTQUF0QjtBQUNBb0MsVUFBVUgsWUFBVixHQUF5QkEsWUFBekI7O0FBRUEsSUFBTXdCLFNBQVMsU0FBVEEsTUFBUyxPQUFnRDtBQUFBLFFBQTdDbkMsUUFBNkMsUUFBN0NBLFFBQTZDO0FBQUEsUUFBbkMyQixTQUFtQyxRQUFuQ0EsU0FBbUM7QUFBQSxRQUF4QjFCLFVBQXdCLFFBQXhCQSxVQUF3QjtBQUFBLFFBQVoyQixLQUFZLFFBQVpBLEtBQVk7O0FBQzNELFdBQU8sRUFBRTVCLGtCQUFGLEVBQVkyQixvQkFBWixFQUF1QjFCLHNCQUF2QixFQUFtQzJCLFlBQW5DLEVBQVA7QUFDSCxDQUZEOztrQkFJZSx5QkFBUU8sTUFBUixFQUFnQnJCLFNBQWhCLEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IExpc3QgZnJvbSAnLi9saXN0JztcbmltcG9ydCBJbnB1dCBmcm9tICcuL2lucHV0JztcbmltcG9ydCAnLi9zdHlsZS5zY3NzJztcbmltcG9ydCAnZm9udC1hd2Vzb21lL2Nzcy9mb250LWF3ZXNvbWUuY3NzJztcbmltcG9ydCAnbWF0ZXJpYWwtZGVzaWduLWljb25zLWljb25mb250L2Rpc3QvbWF0ZXJpYWwtZGVzaWduLWljb25zLnNjc3MnO1xuaW1wb3J0IHsgZ2V0Q29tbWVudHMsIGNsZWFyQ29tbWVudHMgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuY29uc3QgcHJvcFR5cGVzID0ge1xuICAgIGFwaVJvb3RVcmw6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBjb25jZXB0OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgY29uY2VwdElkOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubnVtYmVyXSkuaXNSZXF1aXJlZCxcbiAgICB1c2VyUGljdHVyZVJlc29sdmVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGN1cnJlbnRVc2VySWQ6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgY2FuRGVsZXRlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB0ZXh0czogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgc2VuZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICBlZGl0OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgIGRlbGV0ZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICBjYW5jZWw6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgc2luZ2xlQ29tbWVudDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICBjb21tZW50czogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICBsYXN0VXBkYXRlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgIGxvYWRpbmc6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgZW1wdHk6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZFxuICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgbWVzc2FnZVNlbnRDYWxsYmFjazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGltZURpc3BsYXk6IFByb3BUeXBlcy5vbmVPZihbJ2FnbycsICdkYXRlVGltZSddKSxcbiAgICBkYXRlVGltZUZvcm1hdDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICByZWdpc3RlclJlZnJlc2hDb21tZW50c01ldGhvZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgdW5yZWdpc3RlclJlZnJlc2hDb21tZW50c01ldGhvZDogUHJvcFR5cGVzLmZ1bmNcbn1cblxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xuICAgIHVzZXJQaWN0dXJlUmVzb2x2ZXI6IHVzZXJJZCA9PiBgLi94L2FjY291bnQvYXBpL2FjY291bnRzLyR7dXNlcklkfS9waG90b2AsXG4gICAgY3VycmVudFVzZXJJZDogdW5kZWZpbmVkLFxuICAgIGNhbkRlbGV0ZTogZmFsc2UsXG4gICAgdGV4dHM6IHtcbiAgICAgICAgcGxhY2Vob2xkZXI6ICdMZWF2ZSBhIGNvbW1lbnQuLi4nLFxuICAgICAgICBzZW5kOiAnU2VuZCcsXG4gICAgICAgIGVkaXQ6ICdFZGl0JyxcbiAgICAgICAgZGVsZXRlOiAnRGVsZXRlJyxcbiAgICAgICAgY2FuY2VsOiAnQ2FuY2VsJyxcbiAgICAgICAgdGl0bGU6ICdDb21tZW50cycsXG4gICAgICAgIHNpbmdsZUNvbW1lbnQ6ICdjb21tZW50JyxcbiAgICAgICAgY29tbWVudHM6ICdjb21tZW50cycsXG4gICAgICAgIGxhc3RVcGRhdGU6ICdMYXN0IHVwZGF0ZScsXG4gICAgICAgIGxvYWRpbmc6ICdMb2FkaW5nLi4uJyxcbiAgICAgICAgZW1wdHk6ICdCZSB0aGUgZmlyc3QgdG8gbGVhdmUgeW91ciBjb21tZW50IGJlbG93ICEnXG4gICAgfSxcbiAgICBsb2NhbGU6ICdlbicsXG4gICAgdGltZURpc3BsYXk6ICdhZ28nLFxuICAgIGRhdGVUaW1lRm9ybWF0OiAnREQvTU0vWVlZWSBISDptbScsXG4gICAgcmVnaXN0ZXJSZWZyZXNoQ29tbWVudHNNZXRob2Q6IHVuZGVmaW5lZCxcbiAgICB1bnJlZ2lzdGVyUmVmcmVzaENvbW1lbnRzTWV0aG9kOiB1bmRlZmluZWRcbn1cblxuY2xhc3MgQ29udGFpbmVyIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcblxuICAgICAgICB0aGlzLl9yZWZyZXNoQ29tbWVudHMgPSB0aGlzLl9yZWZyZXNoQ29tbWVudHMuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIGNvbnN0IHsgZGlzcGF0Y2gsIGFwaVJvb3RVcmwsIGNvbmNlcHQsIGNvbmNlcHRJZCwgbG9jYWxlLCByZWdpc3RlclJlZnJlc2hDb21tZW50c01ldGhvZCB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgICBpZiAocmVnaXN0ZXJSZWZyZXNoQ29tbWVudHNNZXRob2QpIHtcbiAgICAgICAgICAgIHJlZ2lzdGVyUmVmcmVzaENvbW1lbnRzTWV0aG9kKHRoaXMuX3JlZnJlc2hDb21tZW50cyk7XG4gICAgICAgIH1cblxuICAgICAgICBtb21lbnQubG9jYWxlKHRoaXMucHJvcHMubG9jYWxlKTtcbiAgICAgICAgZGlzcGF0Y2goZ2V0Q29tbWVudHMoY29uY2VwdCwgY29uY2VwdElkLCBhcGlSb290VXJsKSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIC8vIFNldCBhbiBpbnRlcnZhbCB0byByZWZyZXNoIHRoZSBtb21lbnQoKSBjb21wdXRlZCBkYXRlcy5cbiAgICAgICAgdGhpcy5yZWZyZXNoSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt9KTtcbiAgICAgICAgfSwgNjAwMDApO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICBjb25zdCB7IGRpc3BhdGNoLCB1bnJlZ2lzdGVyUmVmcmVzaENvbW1lbnRzTWV0aG9kIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICAgIGlmICh1bnJlZ2lzdGVyUmVmcmVzaENvbW1lbnRzTWV0aG9kKSB7XG4gICAgICAgICAgICB1bnJlZ2lzdGVyUmVmcmVzaENvbW1lbnRzTWV0aG9kKCk7XG4gICAgICAgIH1cblxuICAgICAgICBkaXNwYXRjaChjbGVhckNvbW1lbnRzKCkpO1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMucmVmcmVzaEludGVydmFsKTtcbiAgICB9XG5cbiAgICBfcmVmcmVzaENvbW1lbnRzKCkge1xuICAgICAgICBjb25zdCB7IGRpc3BhdGNoLCBjb25jZXB0LCBjb25jZXB0SWQsIGFwaVJvb3RVcmwgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGRpc3BhdGNoKGdldENvbW1lbnRzKGNvbmNlcHQsIGNvbmNlcHRJZCwgYXBpUm9vdFVybCkpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBjb21tZW50cywgZGlzcGF0Y2gsIGlzTG9hZGluZywgbGFzdFVwZGF0ZSwgZXJyb3IsIC4uLm90aGVyUHJvcHMgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2NvbW1lbnRzLWV4dGVuc2lvbic+XG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdoZWFkZXInPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J3RpdGxlJz57dGhpcy5wcm9wcy50ZXh0cy50aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdsYXN0LXVwZGF0ZSc+e2lzTG9hZGluZyA/IHRoaXMucHJvcHMudGV4dHMubG9hZGluZyA6IGAke3RoaXMucHJvcHMudGV4dHMubGFzdFVwZGF0ZX0gJHttb21lbnQobGFzdFVwZGF0ZSkuZnJvbU5vdygpfWB9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0ncmVmcmVzaCc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nbWRsLWJ1dHRvbiBtZGwtanMtYnV0dG9uIG1kbC1idXR0b24tLWZhYiBtZGwtYnV0dG9uLS1jb2xvcmVkIG1kbC1idXR0b24tLXJhaXNlZCcgb25DbGljaz17dGhpcy5fcmVmcmVzaENvbW1lbnRzfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXNMb2FkaW5nID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtY2lyY2xlLW8tbm90Y2ggZmEtc3BpblwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9J21hdGVyaWFsLWljb25zJz5yZWZyZXNoPC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2JvZHknPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2NvdW50Jz57YCR7Y29tbWVudHMubGVuZ3RofSAke2NvbW1lbnRzLmxlbmd0aCA+IDEgPyB0aGlzLnByb3BzLnRleHRzLmNvbW1lbnRzIDogdGhpcy5wcm9wcy50ZXh0cy5zaW5nbGVDb21tZW50fWB9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtlcnJvciAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdjb21tZW50cy1lcnJvcic+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPSdtYXRlcmlhbC1pY29ucyc+Y2xvdWRfb2ZmPC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+e2Vycm9yfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3NlcGFyYXRvcic+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtjb21tZW50cy5sZW5ndGggPT09IDAgP1xuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdlbXB0eS1saXN0Jz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9J21hdGVyaWFsLWljb25zJz5mb3J1bTwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj57dGhpcy5wcm9wcy50ZXh0cy5lbXB0eX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgOlxuICAgICAgICAgICAgICAgICAgICAgICAgPExpc3QgY29tbWVudHM9e2NvbW1lbnRzfSBkaXNwYXRjaD17ZGlzcGF0Y2h9IGlzTG9hZGluZz17aXNMb2FkaW5nfSB7Li4ub3RoZXJQcm9wc30gcmVmPSdsaXN0JyAvPlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdpbnB1dCc+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT0nbWF0ZXJpYWwtaWNvbnMnPmluc2VydF9jb21tZW50PC9pPlxuICAgICAgICAgICAgICAgICAgICA8SW5wdXQgZGlzcGF0Y2g9e2Rpc3BhdGNofSBpc0xvYWRpbmc9e2lzTG9hZGluZ30gc2Nyb2xsVG9Cb3R0b209eygpID0+IHsgaWYgKHRoaXMucmVmcy5saXN0KSB0aGlzLnJlZnMubGlzdC5zY3JvbGxUb0JvdHRvbSgpIH19IHsuLi5vdGhlclByb3BzfSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5Db250YWluZXIucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xuQ29udGFpbmVyLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcblxuY29uc3Qgc2VsZWN0ID0gKHsgY29tbWVudHMsIGlzTG9hZGluZywgbGFzdFVwZGF0ZSwgZXJyb3IgfSkgPT4ge1xuICAgIHJldHVybiB7IGNvbW1lbnRzLCBpc0xvYWRpbmcsIGxhc3RVcGRhdGUsIGVycm9yIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3Qoc2VsZWN0KShDb250YWluZXIpO1xuIl19