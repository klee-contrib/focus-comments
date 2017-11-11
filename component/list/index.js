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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIlRSQU5TSVRJT05fVElNRU9VVCIsInByb3BUeXBlcyIsImNvbW1lbnRzIiwiYXJyYXlPZiIsInNoYXBlIiwidXVpZCIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJhdXRob3IiLCJvbmVPZlR5cGUiLCJudW1iZXIiLCJtc2ciLCJjcmVhdGlvbkRhdGUiLCJsYXN0TW9kaWZpZWQiLCJhdXRob3JEaXNwbGF5TmFtZSIsImRlZmF1bHRQcm9wcyIsImxvY2FsZSIsIkxpc3QiLCJzY3JvbGxUb0JvdHRvbSIsImxpc3QiLCJmaW5kRE9NTm9kZSIsInJlZnMiLCJzY3JvbGxUb3AiLCJzY3JvbGxIZWlnaHQiLCJyZW5kZXIiLCJwcm9wcyIsIm90aGVyUHJvcHMiLCJtYXAiLCJjb21tZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEscUJBQXFCLElBQTNCOztBQUVBLElBQU1DLFlBQVk7QUFDZEMsY0FBVSxpQkFBVUMsT0FBVixDQUFrQixpQkFBVUMsS0FBVixDQUFnQjtBQUN4Q0MsY0FBTSxpQkFBVUMsTUFBVixDQUFpQkMsVUFEaUI7QUFFeENDLGdCQUFRLGlCQUFVQyxTQUFWLENBQW9CLENBQUMsaUJBQVVILE1BQVgsRUFBbUIsaUJBQVVJLE1BQTdCLENBQXBCLEVBQTBESCxVQUYxQjtBQUd4Q0ksYUFBSyxpQkFBVUwsTUFBVixDQUFpQkMsVUFIa0I7QUFJeENLLHNCQUFjLGlCQUFVTixNQUFWLENBQWlCQyxVQUpTO0FBS3hDTSxzQkFBYyxpQkFBVVAsTUFBVixDQUFpQkMsVUFMUztBQU14Q08sMkJBQW1CLGlCQUFVUixNQUFWLENBQWlCQztBQU5JLEtBQWhCLENBQWxCLEVBT05BO0FBUlUsQ0FBbEI7O0FBV0EsSUFBTVEsZUFBZTtBQUNqQkMsWUFBUTtBQURTLENBQXJCOztJQUlNQyxJOzs7Ozs7Ozs7bUJBQ0ZDLGMsNkJBQWlCO0FBQ2IsWUFBTUMsT0FBTyxtQkFBU0MsV0FBVCxDQUFxQixLQUFLQyxJQUFMLENBQVVGLElBQS9CLENBQWI7QUFDQSxZQUFJQSxJQUFKLEVBQVU7QUFDTkEsaUJBQUtHLFNBQUwsR0FBaUJILEtBQUtJLFlBQXRCO0FBQ0g7QUFDSixLOzttQkFFREMsTSxxQkFBUztBQUFBLHFCQUMrQixLQUFLQyxLQURwQztBQUFBLFlBQ0d2QixRQURILFVBQ0dBLFFBREg7QUFBQSxZQUNnQndCLFVBRGhCOztBQUVMLGVBQ0k7QUFBQTtBQUFBLGNBQUssY0FBVyxlQUFoQixFQUFnQyxLQUFJLE1BQXBDO0FBQ0k7QUFBQTtBQUFBLGtCQUFvQixnQkFBZSxTQUFuQyxFQUE2Qyx3QkFBd0IxQixrQkFBckUsRUFBeUYsd0JBQXdCQSxrQkFBakg7QUFDS0UseUJBQVN5QixHQUFULENBQWE7QUFBQSwyQkFBVyw0REFBUyxLQUFLQyxRQUFRdkIsSUFBdEIsSUFBZ0N1QixPQUFoQyxFQUE2Q0YsVUFBN0MsRUFBWDtBQUFBLGlCQUFiO0FBREw7QUFESixTQURKO0FBT0gsSzs7Ozs7QUFHTFQsS0FBS2hCLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0FnQixLQUFLRixZQUFMLEdBQW9CQSxZQUFwQjs7a0JBRWVFLEkiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBDU1NUcmFuc2l0aW9uR3JvdXAgZnJvbSAncmVhY3QtYWRkb25zLWNzcy10cmFuc2l0aW9uLWdyb3VwJztcbmltcG9ydCBDb21tZW50IGZyb20gJy4uL2NvbW1lbnQnO1xuaW1wb3J0IHsgZ2V0Q29tbWVudHMgfSBmcm9tICcuLi8uLi9hY3Rpb25zJztcbmltcG9ydCAnYW5pbWF0ZS5jc3Mvc291cmNlL2ZhZGluZ19lbnRyYW5jZXMvZmFkZUluUmlnaHQuY3NzJztcbmltcG9ydCAnLi9zdHlsZS5zY3NzJztcblxuY29uc3QgVFJBTlNJVElPTl9USU1FT1VUID0gNTAwMDtcblxuY29uc3QgcHJvcFR5cGVzID0ge1xuICAgIGNvbW1lbnRzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICB1dWlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgIGF1dGhvcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm51bWJlcl0pLmlzUmVxdWlyZWQsXG4gICAgICAgIG1zZzogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICBjcmVhdGlvbkRhdGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgbGFzdE1vZGlmaWVkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgIGF1dGhvckRpc3BsYXlOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcbiAgICB9KSkuaXNSZXF1aXJlZFxufVxuXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XG4gICAgbG9jYWxlOiAnZW4nXG59XG5cbmNsYXNzIExpc3QgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHNjcm9sbFRvQm90dG9tKCkge1xuICAgICAgICBjb25zdCBsaXN0ID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLmxpc3QpO1xuICAgICAgICBpZiAobGlzdCkge1xuICAgICAgICAgICAgbGlzdC5zY3JvbGxUb3AgPSBsaXN0LnNjcm9sbEhlaWdodDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBjb21tZW50cywgLi4ub3RoZXJQcm9wcyB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0nY29tbWVudHMtbGlzdCcgcmVmPSdsaXN0Jz5cbiAgICAgICAgICAgICAgICA8Q1NTVHJhbnNpdGlvbkdyb3VwIHRyYW5zaXRpb25OYW1lPSdjb21tZW50JyB0cmFuc2l0aW9uRW50ZXJUaW1lb3V0PXtUUkFOU0lUSU9OX1RJTUVPVVR9IHRyYW5zaXRpb25MZWF2ZVRpbWVvdXQ9e1RSQU5TSVRJT05fVElNRU9VVH0+XG4gICAgICAgICAgICAgICAgICAgIHtjb21tZW50cy5tYXAoY29tbWVudCA9PiA8Q29tbWVudCBrZXk9e2NvbW1lbnQudXVpZH0gey4uLmNvbW1lbnR9IHsuLi5vdGhlclByb3BzfSAvPil9XG4gICAgICAgICAgICAgICAgPC9DU1NUcmFuc2l0aW9uR3JvdXA+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkxpc3QucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xuTGlzdC5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG5cbmV4cG9ydCBkZWZhdWx0IExpc3Q7XG4iXX0=