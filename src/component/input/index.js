import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {addComment, updateComment} from '../../actions';
import key from 'keymaster';
import './style.scss';

const propTypes = {
    value: PropTypes.string.isRequired,
    inputType: PropTypes.oneOf(['creation', 'update']).isRequired
}

const defaultProps = {
    inputType: 'creation',
    value: ''
}

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        }
    }

    componentDidMount() {
        key.filter = (event) => {
            const tagName = (event.target || event.srcElement).tagName;
            return !(tagName === 'INPUT' || tagName === 'SELECT');
        }
        key('⌘+enter, ctrl+enter', ::this._handleKeystroke);
    }

    componentWillReceiveProps({isLoading}) {
        if (!isLoading && this.props.isLoading) {
            this.setState({
                value: ''
            }, this.props.scrollToBottom);
        }
    }

    componentWillUnmount() {
        key.unbind('⌘+enter, ctrl+enter');
    }

    _handleKeystroke({target}) {
        if (target === ReactDOM.findDOMNode(this.refs.textarea)) {
            this._sendClickHandler();
        }
        return false;
    }

    _inputChangeHandler({target: {value}}) {
        this.setState({value});
    }

    _sendClickHandler() {
        const {dispatch, apiRootUrl, concept, conceptId, inputType, uuid, author, creationDate, lastModified, authorDisplayName} = this.props;
        switch (inputType) {
            case 'creation':
            dispatch(addComment(concept, conceptId, this.state.value, apiRootUrl));
            break;
            case 'update':
            dispatch(updateComment(concept, conceptId, {uuid, author, creationDate, lastModified, authorDisplayName}, this.state.value, apiRootUrl));
            break;
            default:
            break;
        }
    }

    render() {
        const {value} = this.state;
        const {texts: {placeholder, send}, isLoading} = this.props;
        return (
            <div data-focus='comment-input'>
                <textarea type='text' onChange={::this._inputChangeHandler} placeholder={placeholder} rows='3' value={value} ref='textarea'></textarea>
                <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--raised' disabled={isLoading} onClick={::this._sendClickHandler}>
                    {send}
                </button>
            </div>
        )
    }
}

Input.defaultProps = defaultProps;
Input.propTypes = propTypes;

export default Input;
