'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

require('./style.scss');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

var _actions = require('../../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
    uuid: _react.PropTypes.string.isRequired,
    author: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]).isRequired,
    msg: _react.PropTypes.string.isRequired,
    creationDate: _react.PropTypes.string.isRequired,
    lastModified: _react.PropTypes.string.isRequired,
    authorDisplayName: _react.PropTypes.string.isRequired,
    userPictureResolver: _react.PropTypes.func.isRequired,
    currentUserId: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
    showAvatar: _react.PropTypes.bool,
    timeDisplay: _react.PropTypes.oneOf(['ago', 'dateTime']).isRequired,
    dateTimeFormat: _react.PropTypes.string.isRequired
};

var defaultProps = {
    showAvatar: true
};

var Comment = function (_Component) {
    _inherits(Comment, _Component);

    function Comment(props) {
        _classCallCheck(this, Comment);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.state = {
            isEditing: false
        };
        return _this;
    }

    Comment.prototype.componentWillReceiveProps = function componentWillReceiveProps(_ref) {
        var isLoading = _ref.isLoading;

        if (isLoading === false && this.props.isLoading === true && this.state.isEditing) {
            this.setState({ isEditing: false });
        }
    };

    Comment.prototype.render = function render() {
        var _this2 = this;

        var _props = this.props,
            msg = _props.msg,
            author = _props.author,
            authorDisplayName = _props.authorDisplayName,
            creationDate = _props.creationDate,
            currentUserId = _props.currentUserId,
            lastModified = _props.lastModified,
            userPictureResolver = _props.userPictureResolver,
            texts = _props.texts,
            showAvatar = _props.showAvatar,
            timeDisplay = _props.timeDisplay,
            dateTimeFormat = _props.dateTimeFormat,
            canDelete = _props.canDelete,
            otherProps = _objectWithoutProperties(_props, ['msg', 'author', 'authorDisplayName', 'creationDate', 'currentUserId', 'lastModified', 'userPictureResolver', 'texts', 'showAvatar', 'timeDisplay', 'dateTimeFormat', 'canDelete']);

        var dispatch = otherProps.dispatch,
            apiRootUrl = otherProps.apiRootUrl,
            concept = otherProps.concept,
            conceptId = otherProps.conceptId,
            uuid = otherProps.uuid;
        var isEditing = this.state.isEditing;

        var isMine = currentUserId === author;

        return _react2.default.createElement(
            'div',
            { 'data-focus': 'comment', 'data-editing': isEditing },
            showAvatar && _react2.default.createElement(
                'div',
                { 'data-focus': 'avatar' },
                _react2.default.createElement(
                    'i',
                    { className: 'material-icons' },
                    'account_circle'
                ),
                _react2.default.createElement('img', { src: userPictureResolver(author) })
            ),
            _react2.default.createElement(
                'div',
                { 'data-focus': 'content' },
                _react2.default.createElement(
                    'div',
                    { 'data-focus': 'head' },
                    _react2.default.createElement(
                        'div',
                        { 'data-focus': 'name' },
                        _react2.default.createElement(
                            'b',
                            null,
                            authorDisplayName
                        )
                    ),
                    isMine && _react2.default.createElement(
                        'div',
                        { 'data-focus': 'actions' },
                        _react2.default.createElement(
                            'a',
                            { 'data-focus': 'toggle', onClick: function onClick() {
                                    _this2.setState({ isEditing: !_this2.state.isEditing });
                                } },
                            isEditing ? texts.cancel : texts.edit
                        ),
                        canDelete && _react2.default.createElement(
                            'a',
                            { 'data-focus': 'toggle', onClick: function onClick() {
                                    return dispatch((0, _actions.deleteComment)(concept, conceptId, uuid, apiRootUrl));
                                } },
                            texts.delete
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { 'data-focus': 'date' },
                        timeDisplay === 'ago' && (0, _moment2.default)(creationDate).fromNow(),
                        timeDisplay === 'dateTime' && (0, _moment2.default)(creationDate).format(dateTimeFormat)
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { 'data-focus': 'body' },
                    isMine && isEditing ? _react2.default.createElement(_input2.default, _extends({ inputType: 'update', texts: _extends({}, texts, { placeholder: '' }) }, _extends({ author: author, authorDisplayName: authorDisplayName, creationDate: creationDate }, otherProps), { ref: 'edit', value: msg })) : _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: msg.replace(/\n/g, '<br>') } })
                ),
                _react2.default.createElement('div', { className: 'separator' })
            )
        );
    };

    return Comment;
}(_react.Component);

Comment.propTypes = propTypes;
Comment.defaultProps = defaultProps;

exports.default = Comment;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInByb3BUeXBlcyIsInV1aWQiLCJzdHJpbmciLCJpc1JlcXVpcmVkIiwiYXV0aG9yIiwib25lT2ZUeXBlIiwibnVtYmVyIiwibXNnIiwiY3JlYXRpb25EYXRlIiwibGFzdE1vZGlmaWVkIiwiYXV0aG9yRGlzcGxheU5hbWUiLCJ1c2VyUGljdHVyZVJlc29sdmVyIiwiZnVuYyIsImN1cnJlbnRVc2VySWQiLCJzaG93QXZhdGFyIiwiYm9vbCIsInRpbWVEaXNwbGF5Iiwib25lT2YiLCJkYXRlVGltZUZvcm1hdCIsImRlZmF1bHRQcm9wcyIsIkNvbW1lbnQiLCJwcm9wcyIsInN0YXRlIiwiaXNFZGl0aW5nIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsImlzTG9hZGluZyIsInNldFN0YXRlIiwicmVuZGVyIiwidGV4dHMiLCJjYW5EZWxldGUiLCJvdGhlclByb3BzIiwiZGlzcGF0Y2giLCJhcGlSb290VXJsIiwiY29uY2VwdCIsImNvbmNlcHRJZCIsImlzTWluZSIsImNhbmNlbCIsImVkaXQiLCJkZWxldGUiLCJmcm9tTm93IiwiZm9ybWF0IiwicGxhY2Vob2xkZXIiLCJfX2h0bWwiLCJyZXBsYWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsWUFBWTtBQUNkQyxVQUFNLGlCQUFVQyxNQUFWLENBQWlCQyxVQURUO0FBRWRDLFlBQVEsaUJBQVVDLFNBQVYsQ0FBb0IsQ0FBQyxpQkFBVUgsTUFBWCxFQUFtQixpQkFBVUksTUFBN0IsQ0FBcEIsRUFBMERILFVBRnBEO0FBR2RJLFNBQUssaUJBQVVMLE1BQVYsQ0FBaUJDLFVBSFI7QUFJZEssa0JBQWMsaUJBQVVOLE1BQVYsQ0FBaUJDLFVBSmpCO0FBS2RNLGtCQUFjLGlCQUFVUCxNQUFWLENBQWlCQyxVQUxqQjtBQU1kTyx1QkFBbUIsaUJBQVVSLE1BQVYs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dCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCAnLi9zdHlsZS5zY3NzJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCBJbnB1dCBmcm9tICcuLi9pbnB1dCc7XG5pbXBvcnQgeyBkZWxldGVDb21tZW50IH0gZnJvbSAnLi4vLi4vYWN0aW9ucyc7XG5cbmNvbnN0IHByb3BUeXBlcyA9IHtcbiAgICB1dWlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgYXV0aG9yOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubnVtYmVyXSkuaXNSZXF1aXJlZCxcbiAgICBtc2c6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBjcmVhdGlvbkRhdGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBsYXN0TW9kaWZpZWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBhdXRob3JEaXNwbGF5TmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHVzZXJQaWN0dXJlUmVzb2x2ZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgY3VycmVudFVzZXJJZDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm51bWJlcl0pLFxuICAgIHNob3dBdmF0YXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHRpbWVEaXNwbGF5OiBQcm9wVHlwZXMub25lT2YoWydhZ28nLCAnZGF0ZVRpbWUnXSkuaXNSZXF1aXJlZCxcbiAgICBkYXRlVGltZUZvcm1hdDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkXG59XG5cbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcbiAgICBzaG93QXZhdGFyOiB0cnVlXG59XG5cbmNsYXNzIENvbW1lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGlzRWRpdGluZzogZmFsc2VcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHsgaXNMb2FkaW5nIH0pIHtcbiAgICAgICAgaWYgKGlzTG9hZGluZyA9PT0gZmFsc2UgJiYgdGhpcy5wcm9wcy5pc0xvYWRpbmcgPT09IHRydWUgJiYgdGhpcy5zdGF0ZS5pc0VkaXRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc0VkaXRpbmc6IGZhbHNlIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IG1zZywgYXV0aG9yLCBhdXRob3JEaXNwbGF5TmFtZSwgY3JlYXRpb25EYXRlLCBjdXJyZW50VXNlcklkLCBsYXN0TW9kaWZpZWQsIHVzZXJQaWN0dXJlUmVzb2x2ZXIsIHRleHRzLCBzaG93QXZhdGFyLCB0aW1lRGlzcGxheSwgZGF0ZVRpbWVGb3JtYXQsIGNhbkRlbGV0ZSwgLi4ub3RoZXJQcm9wcyB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgeyBkaXNwYXRjaCwgYXBpUm9vdFVybCwgY29uY2VwdCwgY29uY2VwdElkLCB1dWlkIH0gPSBvdGhlclByb3BzO1xuXG4gICAgICAgIGNvbnN0IHsgaXNFZGl0aW5nIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBpc01pbmUgPSBjdXJyZW50VXNlcklkID09PSBhdXRob3I7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0nY29tbWVudCcgZGF0YS1lZGl0aW5nPXtpc0VkaXRpbmd9PlxuICAgICAgICAgICAgICAgIHtzaG93QXZhdGFyICYmXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0nYXZhdGFyJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT0nbWF0ZXJpYWwtaWNvbnMnPmFjY291bnRfY2lyY2xlPC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e3VzZXJQaWN0dXJlUmVzb2x2ZXIoYXV0aG9yKX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0nY29udGVudCc+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0naGVhZCc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J25hbWUnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxiPnthdXRob3JEaXNwbGF5TmFtZX08L2I+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtpc01pbmUgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0nYWN0aW9ucyc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGRhdGEtZm9jdXM9J3RvZ2dsZScgb25DbGljaz17KCkgPT4geyB0aGlzLnNldFN0YXRlKHsgaXNFZGl0aW5nOiAhdGhpcy5zdGF0ZS5pc0VkaXRpbmcgfSkgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXNFZGl0aW5nID8gdGV4dHMuY2FuY2VsIDogdGV4dHMuZWRpdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y2FuRGVsZXRlICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGRhdGEtZm9jdXM9J3RvZ2dsZScgb25DbGljaz17KCkgPT4gZGlzcGF0Y2goZGVsZXRlQ29tbWVudChjb25jZXB0LCBjb25jZXB0SWQsIHV1aWQsIGFwaVJvb3RVcmwpKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RleHRzLmRlbGV0ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2RhdGUnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aW1lRGlzcGxheSA9PT0gJ2FnbycgJiYgbW9tZW50KGNyZWF0aW9uRGF0ZSkuZnJvbU5vdygpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aW1lRGlzcGxheSA9PT0gJ2RhdGVUaW1lJyAmJiBtb21lbnQoY3JlYXRpb25EYXRlKS5mb3JtYXQoZGF0ZVRpbWVGb3JtYXQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2JvZHknPlxuICAgICAgICAgICAgICAgICAgICAgICAge2lzTWluZSAmJiBpc0VkaXRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICg8SW5wdXQgaW5wdXRUeXBlPSd1cGRhdGUnIHRleHRzPXt7IC4uLnRleHRzLCBwbGFjZWhvbGRlcjogJycgfX0gey4uLnsgYXV0aG9yLCBhdXRob3JEaXNwbGF5TmFtZSwgY3JlYXRpb25EYXRlLCAuLi5vdGhlclByb3BzIH19IHJlZj0nZWRpdCcgdmFsdWU9e21zZ30gLz4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAoPGRpdiBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IG1zZy5yZXBsYWNlKC9cXG4vZywgJzxicj4nKSB9fT48L2Rpdj4pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc2VwYXJhdG9yJz48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuQ29tbWVudC5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG5Db21tZW50LmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcblxuZXhwb3J0IGRlZmF1bHQgQ29tbWVudDtcbiJdfQ==