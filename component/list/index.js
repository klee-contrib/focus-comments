'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _comment = require('../comment');

var _comment2 = _interopRequireDefault(_comment);

var _actions = require('../../actions');

require('animate.css/source/fading_entrances/fadeInRight.css');

require('./style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var TRANSITION_TIMEOUT = 5000;

var propTypes = {
    comments: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        uuid: _react.PropTypes.string.isRequired,
        author: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]).isRequired,
        msg: _react.PropTypes.string.isRequired,
        creationDate: _react.PropTypes.string.isRequired,
        lastModified: _react.PropTypes.string.isRequired,
        authorDisplayName: _react.PropTypes.string.isRequired
    })).isRequired
};

var defaultProps = {
    locale: 'en'
};

var List = function (_Component) {
    _inherits(List, _Component);

    function List() {
        _classCallCheck(this, List);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    List.prototype.scrollToBottom = function scrollToBottom() {
        var list = _reactDom2.default.findDOMNode(this.refs.list);
        if (list) {
            list.scrollTop = list.scrollHeight;
        }
    };

    List.prototype.render = function render() {
        var _props = this.props,
            comments = _props.comments,
            otherProps = _objectWithoutProperties(_props, ['comments']);

        return _react2.default.createElement(
            'div',
            { 'data-focus': 'comments-list', ref: 'list' },
            _react2.default.createElement(
                _reactAddonsCssTransitionGroup2.default,
                { transitionName: 'comment', transitionEnterTimeout: TRANSITION_TIMEOUT, transitionLeaveTimeout: TRANSITION_TIMEOUT },
                comments.map(function (comment) {
                    return _react2.default.createElement(_comment2.default, _extends({ key: comment.uuid }, comment, otherProps));
                })
            )
        );
    };

    return List;
}(_react.Component);

List.propTypes = propTypes;
List.defaultProps = defaultProps;

exports.default = List;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIlRSQU5TSVRJT05fVElNRU9VVCIsInByb3BUeXBlcyIsImNvbW1lbnRzIiwiYXJyYXlPZiIsInNoYXBlIiwidXVpZCIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJhdXRob3IiLCJvbmVPZlR5cGUiLCJudW1iZXIiLCJtc2ciLCJjcmVhdGlvbkRhdGUiLCJsYXN0TW9kaWZpZWQiLCJhdXRob3JEaXNwbGF5TmFtZSIsImRlZmF1bHRQcm9wcyIsImxvY2FsZSIsIkxpc3QiLCJzY3JvbGxUb0JvdHRvbSIsImxpc3QiLCJmaW5kRE9NTm9kZSIsInJlZnMiLCJzY3JvbGxUb3AiLCJzY3JvbGxIZWlnaHQiLCJyZW5kZXIiLCJwcm9wcyIsIm90aGVyUHJvcHMiLCJtYXAiLCJjb21tZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEscUJBQXFCLElBQTNCOztBQUVBLElBQU1DLFlBQVk7QUFDZEMsY0FBVSxpQkFBVUMsT0FBVixDQUFrQixpQkFBVUMsS0FBVixDQUFnQjtBQUN4Q0MsY0FBTSxpQkFBVUMsTUFBVixDQUFpQkMsVUFEaUI7QUFFeENDLGdCQUFRLGlCQUFVQyxTQUFWLENBQW9CLENBQUMsaUJBQVVILE1BQVgsRUFBbUIsaUJBQVVJLE1BQTdCLENBQXBCLEVBQTBESCxVQUYxQjtBQUd4Q0ksYUFBSyxpQkFBVUwsTUFBVixDQUFpQkMsVUFIa0I7QUFJeENLLHNCQUFjLGlCQUFVTixNQUFWLENBQWlCQyxVQUpTO0FBS3hDTSxzQkFBYyxpQkFBVVAsTUFBVixDQUFpQkMsVUFMUztBQU14Q08sMkJBQW1CLGlCQUFVUixNQUFWLENBQWlCQztBQU5JLEtBQWhCLENBQWxCLEVBT05BO0FBUlUsQ0FBbEI7O0FBV0EsSUFBTVEsZUFBZTtBQUNqQkMsWUFBUTtBQURTLENBQXJCOztJQUlNQyxJOzs7Ozs7Ozs7bUJBQ0ZDLGMsNkJBQWlCO0FBQ2IsWUFBTUMsT0FBTyxtQkFBU0MsV0FBVCxDQUFxQixLQUFLQyxJQUFMLENBQVVGLElBQS9CLENBQWI7QUFDQSxZQUFJQSxJQUFKLEVBQVU7QUFDTkEsaUJBQUtHLFNBQUwsR0FBaUJILEtBQUtJLFlBQXRCO0FBQ0g7QUFDSixLOzttQkFFREMsTSxxQkFBUztBQUFBLHFCQUM2QixLQUFLQyxLQURsQztBQUFBLFlBQ0V2QixRQURGLFVBQ0VBLFFBREY7QUFBQSxZQUNld0IsVUFEZjs7QUFFTCxlQUNJO0FBQUE7QUFBQSxjQUFLLGNBQVcsZUFBaEIsRUFBZ0MsS0FBSSxNQUFwQztBQUNJO0FBQUE7QUFBQSxrQkFBb0IsZ0JBQWUsU0FBbkMsRUFBNkMsd0JBQXdCMUIsa0JBQXJFLEVBQXlGLHdCQUF3QkEsa0JBQWpIO0FBQ0tFLHlCQUFTeUIsR0FBVCxDQUFhO0FBQUEsMkJBQVcsNERBQVMsS0FBS0MsUUFBUXZCLElBQXRCLElBQWdDdUIsT0FBaEMsRUFBNkNGLFVBQTdDLEVBQVg7QUFBQSxpQkFBYjtBQURMO0FBREosU0FESjtBQU9ILEs7Ozs7O0FBR0xULEtBQUtoQixTQUFMLEdBQWlCQSxTQUFqQjtBQUNBZ0IsS0FBS0YsWUFBTCxHQUFvQkEsWUFBcEI7O2tCQUVlRSxJIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCBDU1NUcmFuc2l0aW9uR3JvdXAgZnJvbSAncmVhY3QtYWRkb25zLWNzcy10cmFuc2l0aW9uLWdyb3VwJztcclxuaW1wb3J0IENvbW1lbnQgZnJvbSAnLi4vY29tbWVudCc7XHJcbmltcG9ydCB7Z2V0Q29tbWVudHN9IGZyb20gJy4uLy4uL2FjdGlvbnMnO1xyXG5pbXBvcnQgJ2FuaW1hdGUuY3NzL3NvdXJjZS9mYWRpbmdfZW50cmFuY2VzL2ZhZGVJblJpZ2h0LmNzcyc7XHJcbmltcG9ydCAnLi9zdHlsZS5zY3NzJztcclxuXHJcbmNvbnN0IFRSQU5TSVRJT05fVElNRU9VVCA9IDUwMDA7XHJcblxyXG5jb25zdCBwcm9wVHlwZXMgPSB7XHJcbiAgICBjb21tZW50czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcclxuICAgICAgICB1dWlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgYXV0aG9yOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubnVtYmVyXSkuaXNSZXF1aXJlZCxcclxuICAgICAgICBtc2c6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICBjcmVhdGlvbkRhdGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICBsYXN0TW9kaWZpZWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICBhdXRob3JEaXNwbGF5TmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkXHJcbiAgICB9KSkuaXNSZXF1aXJlZFxyXG59XHJcblxyXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBsb2NhbGU6ICdlbidcclxufVxyXG5cclxuY2xhc3MgTGlzdCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBzY3JvbGxUb0JvdHRvbSgpIHtcclxuICAgICAgICBjb25zdCBsaXN0ID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLmxpc3QpO1xyXG4gICAgICAgIGlmIChsaXN0KSB7XHJcbiAgICAgICAgICAgIGxpc3Quc2Nyb2xsVG9wID0gbGlzdC5zY3JvbGxIZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7Y29tbWVudHMsIC4uLm90aGVyUHJvcHN9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2NvbW1lbnRzLWxpc3QnIHJlZj0nbGlzdCc+XHJcbiAgICAgICAgICAgICAgICA8Q1NTVHJhbnNpdGlvbkdyb3VwIHRyYW5zaXRpb25OYW1lPSdjb21tZW50JyB0cmFuc2l0aW9uRW50ZXJUaW1lb3V0PXtUUkFOU0lUSU9OX1RJTUVPVVR9IHRyYW5zaXRpb25MZWF2ZVRpbWVvdXQ9e1RSQU5TSVRJT05fVElNRU9VVH0+XHJcbiAgICAgICAgICAgICAgICAgICAge2NvbW1lbnRzLm1hcChjb21tZW50ID0+IDxDb21tZW50IGtleT17Y29tbWVudC51dWlkfSB7Li4uY29tbWVudH0gey4uLm90aGVyUHJvcHN9Lz4pfVxyXG4gICAgICAgICAgICAgICAgPC9DU1NUcmFuc2l0aW9uR3JvdXA+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkxpc3QucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xyXG5MaXN0LmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpc3Q7XHJcbiJdfQ==