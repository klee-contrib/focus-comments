import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import List from './list';
import Input from './input';
import './style.scss';
import {getComments} from '../actions';

const propTypes = {
    apiRootUrl: PropTypes.string.isRequired,
    concept: PropTypes.string.isRequired,
    conceptId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    userPictureResolver: PropTypes.func.isRequired,
    texts: PropTypes.shape({
        placeholder: PropTypes.string.isRequired,
        send: PropTypes.string.isRequired,
        edit: PropTypes.string.isRequired,
        cancel: PropTypes.string.isRequired
    }).isRequired
}

const defaultProps = {
    userPictureResolver: userId => `./x/account/api/accounts/${userId}/photo`,
    texts: {
        placeholder: 'Leave a comment...',
        send: 'Send',
        edit: 'Edit',
        cancel: 'Cancel',
        title: 'Comments',
        comments: 'comments'
    }
}

class Container extends Component {
    _refreshComments() {
        const {concept, conceptId, apiRootUrl} = this.props;
        getComments(concept, conceptId, apiRootUrl);
    }

    render() {
        const {comments, dispatch, isLoading, error, ...otherProps} = this.props;
        return (
            <div data-focus='comments-extension'>
                {error &&
                    <div data-focus='comments-error'>{error}</div>
                }
                <div data-focus='header'>
                    <div data-focus='title'>{this.props.texts.title}</div>
                    <div data-focus='count'>{`${comments.length} ${this.props.texts.comments}`}</div>
                    <div data-focus='refresh'>
                        <button className='mdl-button mdl-js-button mdl-button--icon' onClick={this._refreshComments.bind(this)}>
                            <i className='material-icons'>mood</i>
                        </button>
                    </div>
                </div>
                <List comments={comments} dispatch={dispatch} isLoading={isLoading} {...otherProps}/>
                <Input dispatch={dispatch} isLoading={isLoading} {...otherProps}/>
            </div>
        );
    }
}

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

const select = ({comments, isLoading, lastUpdate, error}) => {
    return {comments, isLoading, lastUpdate, error};
}

export default connect(select)(Container);
