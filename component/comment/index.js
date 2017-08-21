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
            otherProps = _objectWithoutProperties(_props, ['msg', 'author', 'authorDisplayName', 'creationDate', 'currentUserId', 'lastModified', 'userPictureResolver', 'texts', 'showAvatar', 'timeDisplay', 'dateTimeFormat']);

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
                        { 'data-focus': 'edit' },
                        _react2.default.createElement(
                            'a',
                            { 'data-focus': 'toggle', onClick: function onClick() {
                                    _this2.setState({ isEditing: !_this2.state.isEditing });
                                } },
                            isEditing ? texts.cancel : texts.edit
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInByb3BUeXBlcyIsInV1aWQiLCJzdHJpbmciLCJpc1JlcXVpcmVkIiwiYXV0aG9yIiwib25lT2ZUeXBlIiwibnVtYmVyIiwibXNnIiwiY3JlYXRpb25EYXRlIiwibGFzdE1vZGlmaWVkIiwiYXV0aG9yRGlzcGxheU5hbWUiLCJ1c2VyUGljdHVyZVJlc29sdmVyIiwiZnVuYyIsImN1cnJlbnRVc2VySWQiLCJzaG93QXZhdGFyIiwiYm9vbCIsInRpbWVEaXNwbGF5Iiwib25lT2YiLCJkYXRlVGltZUZvcm1hdCIsImRlZmF1bHRQcm9wcyIsIkNvbW1lbnQiLCJwcm9wcyIsInN0YXRlIiwiaXNFZGl0aW5nIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsImlzTG9hZGluZyIsInNldFN0YXRlIiwicmVuZGVyIiwidGV4dHMiLCJvdGhlclByb3BzIiwiaXNNaW5lIiwiY2FuY2VsIiwiZWRpdCIsImZyb21Ob3ciLCJmb3JtYXQiLCJwbGFjZWhvbGRlciIsIl9faHRtbCIsInJlcGxhY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxZQUFZO0FBQ2RDLFVBQU0saUJBQVVDLE1BQVYsQ0FBaUJDLFVBRFQ7QUFFZEMsWUFBUSxpQkFBVUMsU0FBVixDQUFvQixDQUFDLGlCQUFVSCxNQUFYLEVBQW1CLGlCQUFVSSxNQUE3QixDQUFwQixFQUEwREgsVUFGcEQ7QUFHZEksU0FBSyxpQkFBVUwsTUFBVixDQUFpQkMsVUFIUjtBQUlkSyxrQkFBYyxpQkFBVU4sTUFBVixDQUFpQkMsVUFKakI7QUFLZE0sa0JBQWMsaUJBQVVQLE1BQVYsQ0FBaUJDLFVBTGpCO0FBTWRPLHVCQUFtQixpQkFBVVIsTUFBVixDQUFpQkMsVUFOdEI7QUFPZFEseUJBQXFCLGlCQUFVQyxJQUFWLENBQWVULFVBUHRCO0FBUWRVLG1CQUFlLGlCQUFVUixTQUFW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U0FBVixHQUFzQiwwREFBTyxXQUFVLFFBQWpCLEVBQTBCLG9CQUFZSyxLQUFaLElBQW1CTyxhQUFhLEVBQWhDLEdBQTFCLGVBQXNFL0IsY0FBdEUsRUFBOEVNLG9DQUE5RSxFQUFpR0YsMEJBQWpHLElBQWtIcUIsVUFBbEgsS0FBZ0ksS0FBSSxNQUFwSSxFQUEySSxPQUFPdEIsR0FBbEosSUFBdEIsR0FBa0wsdUNBQUsseUJBQXlCLEVBQUU2QixRQUFRN0IsSUFBSThCLE9BQUosQ0FBWSxLQUFaLEVBQW1CLE1BQW5CLENBQVYsRUFBOUI7QUFEdkwsaUJBakJKO0FBb0JJLHVEQUFLLFdBQVUsV0FBZjtBQXBCSjtBQVBKLFNBREo7QUFnQ0gsSzs7Ozs7QUFHTGpCLFFBQVFwQixTQUFSLEdBQW9CQSxTQUFwQjtBQUNBb0IsUUFBUUQsWUFBUixHQUF1QkEsWUFBdkI7O2tCQUVlQyxPIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0ICcuL3N0eWxlLnNjc3MnO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcbmltcG9ydCBJbnB1dCBmcm9tICcuLi9pbnB1dCc7XHJcblxyXG5jb25zdCBwcm9wVHlwZXMgPSB7XHJcbiAgICB1dWlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICBhdXRob3I6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5udW1iZXJdKS5pc1JlcXVpcmVkLFxyXG4gICAgbXNnOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICBjcmVhdGlvbkRhdGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgIGxhc3RNb2RpZmllZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgYXV0aG9yRGlzcGxheU5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgIHVzZXJQaWN0dXJlUmVzb2x2ZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICBjdXJyZW50VXNlcklkOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubnVtYmVyXSksXHJcbiAgICBzaG93QXZhdGFyOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIHRpbWVEaXNwbGF5OiBQcm9wVHlwZXMub25lT2YoWydhZ28nLCAnZGF0ZVRpbWUnXSkuaXNSZXF1aXJlZCxcclxuICAgIGRhdGVUaW1lRm9ybWF0OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcclxufVxyXG5cclxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgc2hvd0F2YXRhcjogdHJ1ZVxyXG59XHJcblxyXG5jbGFzcyBDb21tZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGlzRWRpdGluZzogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoeyBpc0xvYWRpbmcgfSkge1xyXG4gICAgICAgIGlmIChpc0xvYWRpbmcgPT09IGZhbHNlICYmIHRoaXMucHJvcHMuaXNMb2FkaW5nID09PSB0cnVlICYmIHRoaXMuc3RhdGUuaXNFZGl0aW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc0VkaXRpbmc6IGZhbHNlIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgeyBtc2csIGF1dGhvciwgYXV0aG9yRGlzcGxheU5hbWUsIGNyZWF0aW9uRGF0ZSwgY3VycmVudFVzZXJJZCwgbGFzdE1vZGlmaWVkLCB1c2VyUGljdHVyZVJlc29sdmVyLCB0ZXh0cywgc2hvd0F2YXRhciwgdGltZURpc3BsYXksIGRhdGVUaW1lRm9ybWF0LCAuLi5vdGhlclByb3BzIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHsgaXNFZGl0aW5nIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IGlzTWluZSA9IGN1cnJlbnRVc2VySWQgPT09IGF1dGhvcjtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2NvbW1lbnQnIGRhdGEtZWRpdGluZz17aXNFZGl0aW5nfT5cclxuICAgICAgICAgICAgICAgIHtzaG93QXZhdGFyICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdhdmF0YXInPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9J21hdGVyaWFsLWljb25zJz5hY2NvdW50X2NpcmNsZTwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e3VzZXJQaWN0dXJlUmVzb2x2ZXIoYXV0aG9yKX0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0nY29udGVudCc+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdoZWFkJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSduYW1lJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxiPnthdXRob3JEaXNwbGF5TmFtZX08L2I+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7aXNNaW5lICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2VkaXQnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGRhdGEtZm9jdXM9J3RvZ2dsZScgb25DbGljaz17KCkgPT4geyB0aGlzLnNldFN0YXRlKHsgaXNFZGl0aW5nOiAhdGhpcy5zdGF0ZS5pc0VkaXRpbmcgfSkgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpc0VkaXRpbmcgPyB0ZXh0cy5jYW5jZWwgOiB0ZXh0cy5lZGl0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0nZGF0ZSc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGltZURpc3BsYXkgPT09ICdhZ28nICYmIG1vbWVudChjcmVhdGlvbkRhdGUpLmZyb21Ob3coKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aW1lRGlzcGxheSA9PT0gJ2RhdGVUaW1lJyAmJiBtb21lbnQoY3JlYXRpb25EYXRlKS5mb3JtYXQoZGF0ZVRpbWVGb3JtYXQpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2JvZHknPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7aXNNaW5lICYmIGlzRWRpdGluZyA/IDxJbnB1dCBpbnB1dFR5cGU9J3VwZGF0ZScgdGV4dHM9e3sgLi4udGV4dHMsIHBsYWNlaG9sZGVyOiAnJyB9fSB7Li4ueyBhdXRob3IsIGF1dGhvckRpc3BsYXlOYW1lLCBjcmVhdGlvbkRhdGUsIC4uLm90aGVyUHJvcHMgfX0gcmVmPSdlZGl0JyB2YWx1ZT17bXNnfSAvPiA6IDxkaXYgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiBtc2cucmVwbGFjZSgvXFxuL2csICc8YnI+JykgfX0+PC9kaXY+fVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzZXBhcmF0b3InPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkNvbW1lbnQucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xyXG5Db21tZW50LmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbW1lbnQ7XHJcbiJdfQ==