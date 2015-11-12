import React, {Component, PropTypes} from 'react';
import {addComment} from '../../actions';
import './style.scss';

const propTypes = {

}

const defaultProps = {
    texts: {
        placeholder: 'Leave a comment...',
        send: 'Send'
    }
}

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
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
        const {dispatch, apiRootUrl, concept, conceptId} = this.props;
        dispatch(addComment(concept, conceptId, this.state.value, apiRootUrl))
    }

    render() {
        const {value} = this.state;
        const {texts: {placeholder, send}, isLoading} = this.props;
        return (
            <div data-focus='comment-input'>
                <div className='mdl-textfield mdl-js-textfield' data-focus='input'>
                    <textarea className='mdl-textfield__input' type='text' onChange={this._inputChangeHandler.bind(this)} rows='1' value={value}></textarea>
                    <label className='mdl-textfield__label'>{placeholder}</label>
                </div>
                <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' disabled={isLoading} onClick={this._sendClickHandler.bind(this)}>
                    {send}
                </button>
            </div>
        )
    }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
