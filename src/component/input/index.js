import React, {Component, PropTypes} from 'react';
import {addComment, updateComment} from '../../actions';
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

    componentWillReceiveProps({isPosting}) {
        if (isPosting !== this.props.isPosting) {
            this.setState({
                value: null
            });
        }
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
                <div className='mdl-textfield mdl-js-textfield' data-focus='input' ref='textarea'>
                    <textarea className='mdl-textfield__input' type='text' onChange={this._inputChangeHandler.bind(this)} rows='3' value={value}></textarea>
                    <label className='mdl-textfield__label'>{placeholder}</label>
                </div>
                <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' disabled={isLoading} onClick={this._sendClickHandler.bind(this)}>
                    {send}
                </button>
            </div>
        )
    }
}

Input.defaultProps = defaultProps;
Input.propTypes = propTypes;

export default Input;
