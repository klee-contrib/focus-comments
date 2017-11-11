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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInByb3BUeXBlcyIsInZhbHVlIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsImlucHV0VHlwZSIsIm9uZU9mIiwibWVzc2FnZVNlbnRDYWxsYmFjayIsImZ1bmMiLCJkZWZhdWx0UHJvcHMiLCJJbnB1dCIsInByb3BzIiwic3RhdGUiLCJjb21wb25lbnREaWRNb3VudCIsImZpbHRlciIsImV2ZW50IiwidGFnTmFtZSIsInRhcmdldCIsInNyY0VsZW1lbnQiLCJfaGFuZGxlS2V5c3Ryb2tlIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsImlzTG9hZGluZyIsInNldFN0YXRlIiwic2Nyb2xsVG9Cb3R0b20iLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInVuYmluZCIsImZpbmRET01Ob2RlIiwicmVmcyIsInRleHRhcmVhIiwiX3NlbmRDbGlja0hhbmRsZXIiLCJfaW5wdXRDaGFuZ2VIYW5kbGVyIiwiZGlzcGF0Y2giLCJhcGlSb290VXJsIiwiY29uY2VwdCIsImNvbmNlcHRJZCIsInV1aWQiLCJhdXRob3IiLCJjcmVhdGlvbkRhdGUiLCJsYXN0TW9kaWZpZWQiLCJhdXRob3JEaXNwbGF5TmFtZSIsInJlbmRlciIsInRleHRzIiwicGxhY2Vob2xkZXIiLCJzZW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsWUFBWTtBQUNkQyxXQUFPLGlCQUFVQyxNQUFWLENBQWlCQyxVQURWO0FBRWRDLGVBQVcsaUJBQVVDLEtBQVYsQ0FBZ0IsQ0FBQyxVQUFELEVBQWEsUUFBYixDQUFoQixFQUF3Q0YsVUFGckM7QUFHZEcseUJBQXFCLGlCQUFVQztBQUhqQixDQUFsQjs7QUFNQSxJQUFNQyxlQUFlO0FBQ2pCSixlQUFXLFVBRE07QUFFakJILFdBQU87QUFGVSxDQUFyQjs7SUFLTVEsSzs7O0FBQ0YsbUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7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QUdMLGVBQ0k7QUFBQTtBQUFBLGNBQUssY0FBVyxlQUFoQjtBQUNJLHdEQUFVLE1BQUssTUFBZixFQUFzQixVQUFZLEtBQUtTLG1CQUFqQixNQUFZLElBQVosQ0FBdEIsRUFBNEQsYUFBYVksV0FBekUsRUFBc0YsTUFBSyxHQUEzRixFQUErRixPQUFPeEMsS0FBdEcsRUFBNkcsS0FBSSxVQUFqSCxHQURKO0FBRUE7QUFBQTtBQUFBLGtCQUFRLFdBQVUsZ0VBQWxCLEVBQW1GLFVBQVVtQixTQUE3RixFQUF3RyxTQUFXLEtBQUtRLGlCQUFoQixNQUFXLElBQVgsQ0FBeEc7QUFDTWM7QUFETjtBQUZBLFNBREo7QUFRSCxLOzs7OztBQUdMakMsTUFBTUQsWUFBTixHQUFxQkEsWUFBckI7QUFDQUMsTUFBTVQsU0FBTixHQUFrQkEsU0FBbEI7O2tCQUVlUyxLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgeyBhZGRDb21tZW50LCB1cGRhdGVDb21tZW50IH0gZnJvbSAnLi4vLi4vYWN0aW9ucyc7XG5pbXBvcnQga2V5IGZyb20gJ2tleW1hc3Rlcic7XG5pbXBvcnQgJy4vc3R5bGUuc2Nzcyc7XG5cbmNvbnN0IHByb3BUeXBlcyA9IHtcbiAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGlucHV0VHlwZTogUHJvcFR5cGVzLm9uZU9mKFsnY3JlYXRpb24nLCAndXBkYXRlJ10pLmlzUmVxdWlyZWQsXG4gICAgbWVzc2FnZVNlbnRDYWxsYmFjazogUHJvcFR5cGVzLmZ1bmNcbn1cblxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xuICAgIGlucHV0VHlwZTogJ2NyZWF0aW9uJyxcbiAgICB2YWx1ZTogJydcbn1cblxuY2xhc3MgSW5wdXQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHZhbHVlOiBwcm9wcy52YWx1ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGtleS5maWx0ZXIgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhZ05hbWUgPSAoZXZlbnQudGFyZ2V0IHx8IGV2ZW50LnNyY0VsZW1lbnQpLnRhZ05hbWU7XG4gICAgICAgICAgICByZXR1cm4gISh0YWdOYW1lID09PSAnSU5QVVQnIHx8IHRhZ05hbWUgPT09ICdTRUxFQ1QnKTtcbiAgICAgICAgfVxuICAgICAgICBrZXkoJ+KMmCtlbnRlciwgY3RybCtlbnRlcicsIDo6dGhpcy5faGFuZGxlS2V5c3Ryb2tlKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHsgaXNMb2FkaW5nIH0pIHtcbiAgICAgICAgaWYgKCFpc0xvYWRpbmcgJiYgdGhpcy5wcm9wcy5pc0xvYWRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHZhbHVlOiAnJ1xuICAgICAgICAgICAgfSwgdGhpcy5wcm9wcy5zY3JvbGxUb0JvdHRvbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAga2V5LnVuYmluZCgn4oyYK2VudGVyLCBjdHJsK2VudGVyJyk7XG4gICAgfVxuXG4gICAgX2hhbmRsZUtleXN0cm9rZSh7IHRhcmdldCB9KSB7XG4gICAgICAgIGlmICh0YXJnZXQgPT09IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy50ZXh0YXJlYSkpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbmRDbGlja0hhbmRsZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgX2lucHV0Q2hhbmdlSGFuZGxlcih7IHRhcmdldDogeyB2YWx1ZSB9IH0pIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbHVlIH0pO1xuICAgIH1cblxuICAgIF9zZW5kQ2xpY2tIYW5kbGVyKCkge1xuICAgICAgICBjb25zdCB7IGRpc3BhdGNoLCBhcGlSb290VXJsLCBjb25jZXB0LCBjb25jZXB0SWQsIGlucHV0VHlwZSwgdXVpZCwgYXV0aG9yLCBjcmVhdGlvbkRhdGUsIGxhc3RNb2RpZmllZCwgYXV0aG9yRGlzcGxheU5hbWUsIG1lc3NhZ2VTZW50Q2FsbGJhY2sgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIHN3aXRjaCAoaW5wdXRUeXBlKSB7XG4gICAgICAgICAgICBjYXNlICdjcmVhdGlvbic6XG4gICAgICAgICAgICAgICAgZGlzcGF0Y2goYWRkQ29tbWVudChjb25jZXB0LCBjb25jZXB0SWQsIHRoaXMuc3RhdGUudmFsdWUsIGFwaVJvb3RVcmwpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3VwZGF0ZSc6XG4gICAgICAgICAgICAgICAgZGlzcGF0Y2godXBkYXRlQ29tbWVudChjb25jZXB0LCBjb25jZXB0SWQsIHsgdXVpZCwgYXV0aG9yLCBjcmVhdGlvbkRhdGUsIGxhc3RNb2RpZmllZCwgYXV0aG9yRGlzcGxheU5hbWUgfSwgdGhpcy5zdGF0ZS52YWx1ZSwgYXBpUm9vdFVybCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtZXNzYWdlU2VudENhbGxiYWNrKSB7XG4gICAgICAgICAgICBtZXNzYWdlU2VudENhbGxiYWNrKGlucHV0VHlwZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgdmFsdWUgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHsgdGV4dHM6IHsgcGxhY2Vob2xkZXIsIHNlbmQgfSwgaXNMb2FkaW5nIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdjb21tZW50LWlucHV0Jz5cbiAgICAgICAgICAgICAgICA8dGV4dGFyZWEgdHlwZT0ndGV4dCcgb25DaGFuZ2U9ezo6dGhpcy5faW5wdXRDaGFuZ2VIYW5kbGVyfSBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9IHJvd3M9JzMnIHZhbHVlPXt2YWx1ZX0gcmVmPSd0ZXh0YXJlYSc+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdtZGwtYnV0dG9uIG1kbC1qcy1idXR0b24gbWRsLWJ1dHRvbi0tcmFpc2VkIG1kbC1idXR0b24tLXJhaXNlZCcgZGlzYWJsZWQ9e2lzTG9hZGluZ30gb25DbGljaz17Ojp0aGlzLl9zZW5kQ2xpY2tIYW5kbGVyfT5cbiAgICAgICAgICAgICAgICB7IHNlbmQgfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uID5cbiAgICAgICAgICAgIDwvZGl2ID5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuSW5wdXQuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuSW5wdXQucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xuXG5leHBvcnQgZGVmYXVsdCBJbnB1dDtcbiJdfQ==