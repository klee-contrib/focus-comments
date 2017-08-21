'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _actions = require('../../actions');

var _keymaster = require('keymaster');

var _keymaster2 = _interopRequireDefault(_keymaster);

require('./style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
    value: _react.PropTypes.string.isRequired,
    inputType: _react.PropTypes.oneOf(['creation', 'update']).isRequired,
    messageSentCallback: _react.PropTypes.func
};

var defaultProps = {
    inputType: 'creation',
    value: ''
};

var Input = function (_Component) {
    _inherits(Input, _Component);

    function Input(props) {
        _classCallCheck(this, Input);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.state = {
            value: props.value
        };
        return _this;
    }

    Input.prototype.componentDidMount = function componentDidMount() {
        _keymaster2.default.filter = function (event) {
            var tagName = (event.target || event.srcElement).tagName;
            return !(tagName === 'INPUT' || tagName === 'SELECT');
        };
        (0, _keymaster2.default)('⌘+enter, ctrl+enter', this._handleKeystroke.bind(this));
    };

    Input.prototype.componentWillReceiveProps = function componentWillReceiveProps(_ref) {
        var isLoading = _ref.isLoading;

        if (!isLoading && this.props.isLoading) {
            this.setState({
                value: ''
            }, this.props.scrollToBottom);
        }
    };

    Input.prototype.componentWillUnmount = function componentWillUnmount() {
        _keymaster2.default.unbind('⌘+enter, ctrl+enter');
    };

    Input.prototype._handleKeystroke = function _handleKeystroke(_ref2) {
        var target = _ref2.target;

        if (target === _reactDom2.default.findDOMNode(this.refs.textarea)) {
            this._sendClickHandler();
        }
        return false;
    };

    Input.prototype._inputChangeHandler = function _inputChangeHandler(_ref3) {
        var value = _ref3.target.value;

        this.setState({ value: value });
    };

    Input.prototype._sendClickHandler = function _sendClickHandler() {
        var _props = this.props,
            dispatch = _props.dispatch,
            apiRootUrl = _props.apiRootUrl,
            concept = _props.concept,
            conceptId = _props.conceptId,
            inputType = _props.inputType,
            uuid = _props.uuid,
            author = _props.author,
            creationDate = _props.creationDate,
            lastModified = _props.lastModified,
            authorDisplayName = _props.authorDisplayName,
            messageSentCallback = _props.messageSentCallback;

        switch (inputType) {
            case 'creation':
                dispatch((0, _actions.addComment)(concept, conceptId, this.state.value, apiRootUrl));
                break;
            case 'update':
                dispatch((0, _actions.updateComment)(concept, conceptId, { uuid: uuid, author: author, creationDate: creationDate, lastModified: lastModified, authorDisplayName: authorDisplayName }, this.state.value, apiRootUrl));
                break;
            default:
                break;
        }

        if (messageSentCallback) {
            messageSentCallback(inputType);
        }
    };

    Input.prototype.render = function render() {
        var value = this.state.value;
        var _props2 = this.props,
            _props2$texts = _props2.texts,
            placeholder = _props2$texts.placeholder,
            send = _props2$texts.send,
            isLoading = _props2.isLoading;

        return _react2.default.createElement(
            'div',
            { 'data-focus': 'comment-input' },
            _react2.default.createElement('textarea', { type: 'text', onChange: this._inputChangeHandler.bind(this), placeholder: placeholder, rows: '3', value: value, ref: 'textarea' }),
            _react2.default.createElement(
                'button',
                { className: 'mdl-button mdl-js-button mdl-button--raised mdl-button--raised', disabled: isLoading, onClick: this._sendClickHandler.bind(this) },
                send
            )
        );
    };

    return Input;
}(_react.Component);

Input.defaultProps = defaultProps;
Input.propTypes = propTypes;

exports.default = Input;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInByb3BUeXBlcyIsInZhbHVlIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsImlucHV0VHlwZSIsIm9uZU9mIiwibWVzc2FnZVNlbnRDYWxsYmFjayIsImZ1bmMiLCJkZWZhdWx0UHJvcHMiLCJJbnB1dCIsInByb3BzIiwic3RhdGUiLCJjb21wb25lbnREaWRNb3VudCIsImZpbHRlciIsImV2ZW50IiwidGFnTmFtZSIsInRhcmdldCIsInNyY0VsZW1lbnQiLCJfaGFuZGxlS2V5c3Ryb2tlIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsImlzTG9hZGluZyIsInNldFN0YXRlIiwic2Nyb2xsVG9Cb3R0b20iLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInVuYmluZCIsImZpbmRET01Ob2RlIiwicmVmcyIsInRleHRhcmVhIiwiX3NlbmRDbGlja0hhbmRsZXIiLCJfaW5wdXRDaGFuZ2VIYW5kbGVyIiwiZGlzcGF0Y2giLCJhcGlSb290VXJsIiwiY29uY2VwdCIsImNvbmNlcHRJZCIsInV1aWQiLCJhdXRob3IiLCJjcmVhdGlvbkRhdGUiLCJsYXN0TW9kaWZpZWQiLCJhdXRob3JEaXNwbGF5TmFtZSIsInJlbmRlciIsInRleHRzIiwicGxhY2Vob2xkZXIiLCJzZW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsWUFBWTtBQUNkQyxXQUFPLGlCQUFVQyxNQUFWLENBQWlCQyxVQURWO0FBRWRDLGVBQVcsaUJBQVVDLEtBQVYsQ0FBZ0IsQ0FBQyxVQUFELEVBQWEsUUFBYixDQUFoQixFQUF3Q0YsVUFGckM7QUFHZEcseUJBQXFCLGlCQUFVQztBQUhqQixDQUFsQjs7QUFNQSxJQUFNQyxlQUFlO0FBQ2pCSixlQUFXLFVBRE07QUFFakJILFdBQU87QUFGVSxDQUFyQjs7SUFLTVEsSzs7O0FBQ0YsbUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7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QUdMLGVBQ0k7QUFBQTtBQUFBLGNBQUssY0FBVyxlQUFoQjtBQUNJLHdEQUFVLE1BQUssTUFBZixFQUFzQixVQUFZLEtBQUtTLG1CQUFqQixNQUFZLElBQVosQ0FBdEIsRUFBNEQsYUFBYVksV0FBekUsRUFBc0YsTUFBSyxHQUEzRixFQUErRixPQUFPeEMsS0FBdEcsRUFBNkcsS0FBSSxVQUFqSCxHQURKO0FBRUE7QUFBQTtBQUFBLGtCQUFRLFdBQVUsZ0VBQWxCLEVBQW1GLFVBQVVtQixTQUE3RixFQUF3RyxTQUFXLEtBQUtRLGlCQUFoQixNQUFXLElBQVgsQ0FBeEc7QUFDTWM7QUFETjtBQUZBLFNBREo7QUFRSCxLOzs7OztBQUdMakMsTUFBTUQsWUFBTixHQUFxQkEsWUFBckI7QUFDQUMsTUFBTVQsU0FBTixHQUFrQkEsU0FBbEI7O2tCQUVlUyxLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IHsgYWRkQ29tbWVudCwgdXBkYXRlQ29tbWVudCB9IGZyb20gJy4uLy4uL2FjdGlvbnMnO1xyXG5pbXBvcnQga2V5IGZyb20gJ2tleW1hc3Rlcic7XHJcbmltcG9ydCAnLi9zdHlsZS5zY3NzJztcclxuXHJcbmNvbnN0IHByb3BUeXBlcyA9IHtcclxuICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICBpbnB1dFR5cGU6IFByb3BUeXBlcy5vbmVPZihbJ2NyZWF0aW9uJywgJ3VwZGF0ZSddKS5pc1JlcXVpcmVkLFxyXG4gICAgbWVzc2FnZVNlbnRDYWxsYmFjazogUHJvcFR5cGVzLmZ1bmNcclxufVxyXG5cclxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgaW5wdXRUeXBlOiAnY3JlYXRpb24nLFxyXG4gICAgdmFsdWU6ICcnXHJcbn1cclxuXHJcbmNsYXNzIElucHV0IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBwcm9wcy52YWx1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICBrZXkuZmlsdGVyID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhZ05hbWUgPSAoZXZlbnQudGFyZ2V0IHx8IGV2ZW50LnNyY0VsZW1lbnQpLnRhZ05hbWU7XHJcbiAgICAgICAgICAgIHJldHVybiAhKHRhZ05hbWUgPT09ICdJTlBVVCcgfHwgdGFnTmFtZSA9PT0gJ1NFTEVDVCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBrZXkoJ+KMmCtlbnRlciwgY3RybCtlbnRlcicsIDo6dGhpcy5faGFuZGxlS2V5c3Ryb2tlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHsgaXNMb2FkaW5nIH0pIHtcclxuICAgICAgICBpZiAoIWlzTG9hZGluZyAmJiB0aGlzLnByb3BzLmlzTG9hZGluZykge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAnJ1xyXG4gICAgICAgICAgICB9LCB0aGlzLnByb3BzLnNjcm9sbFRvQm90dG9tKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAga2V5LnVuYmluZCgn4oyYK2VudGVyLCBjdHJsK2VudGVyJyk7XHJcbiAgICB9XHJcblxyXG4gICAgX2hhbmRsZUtleXN0cm9rZSh7IHRhcmdldCB9KSB7XHJcbiAgICAgICAgaWYgKHRhcmdldCA9PT0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLnRleHRhcmVhKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zZW5kQ2xpY2tIYW5kbGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBfaW5wdXRDaGFuZ2VIYW5kbGVyKHsgdGFyZ2V0OiB7IHZhbHVlIH0gfSkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBfc2VuZENsaWNrSGFuZGxlcigpIHtcclxuICAgICAgICBjb25zdCB7IGRpc3BhdGNoLCBhcGlSb290VXJsLCBjb25jZXB0LCBjb25jZXB0SWQsIGlucHV0VHlwZSwgdXVpZCwgYXV0aG9yLCBjcmVhdGlvbkRhdGUsIGxhc3RNb2RpZmllZCwgYXV0aG9yRGlzcGxheU5hbWUsIG1lc3NhZ2VTZW50Q2FsbGJhY2sgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgc3dpdGNoIChpbnB1dFR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnY3JlYXRpb24nOlxyXG4gICAgICAgICAgICAgICAgZGlzcGF0Y2goYWRkQ29tbWVudChjb25jZXB0LCBjb25jZXB0SWQsIHRoaXMuc3RhdGUudmFsdWUsIGFwaVJvb3RVcmwpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd1cGRhdGUnOlxyXG4gICAgICAgICAgICAgICAgZGlzcGF0Y2godXBkYXRlQ29tbWVudChjb25jZXB0LCBjb25jZXB0SWQsIHsgdXVpZCwgYXV0aG9yLCBjcmVhdGlvbkRhdGUsIGxhc3RNb2RpZmllZCwgYXV0aG9yRGlzcGxheU5hbWUgfSwgdGhpcy5zdGF0ZS52YWx1ZSwgYXBpUm9vdFVybCkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChtZXNzYWdlU2VudENhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VTZW50Q2FsbGJhY2soaW5wdXRUeXBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHsgdmFsdWUgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3QgeyB0ZXh0czogeyBwbGFjZWhvbGRlciwgc2VuZCB9LCBpc0xvYWRpbmcgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdjb21tZW50LWlucHV0Jz5cclxuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSB0eXBlPSd0ZXh0JyBvbkNoYW5nZT17Ojp0aGlzLl9pbnB1dENoYW5nZUhhbmRsZXJ9IHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn0gcm93cz0nMycgdmFsdWU9e3ZhbHVlfSByZWY9J3RleHRhcmVhJz48L3RleHRhcmVhPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nbWRsLWJ1dHRvbiBtZGwtanMtYnV0dG9uIG1kbC1idXR0b24tLXJhaXNlZCBtZGwtYnV0dG9uLS1yYWlzZWQnIGRpc2FibGVkPXtpc0xvYWRpbmd9IG9uQ2xpY2s9ezo6dGhpcy5fc2VuZENsaWNrSGFuZGxlcn0+XHJcbiAgICAgICAgICAgICAgICB7IHNlbmQgfVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24gPlxyXG4gICAgICAgICAgICA8L2RpdiA+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5JbnB1dC5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XHJcbklucHV0LnByb3BUeXBlcyA9IHByb3BUeXBlcztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IElucHV0O1xyXG4iXX0=