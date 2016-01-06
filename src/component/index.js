import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import List from './list';
import Input from './input';
import './style.scss';
import 'font-awesome/css/font-awesome.css';
import 'material-design-icons-iconfont/dist/material-design-icons.scss';
import {getComments, clearComments} from '../actions';
import moment from 'moment';

const propTypes = {
    apiRootUrl: PropTypes.string.isRequired,
    concept: PropTypes.string.isRequired,
    conceptId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    userPictureResolver: PropTypes.func.isRequired,
    texts: PropTypes.shape({
        placeholder: PropTypes.string.isRequired,
        send: PropTypes.string.isRequired,
        edit: PropTypes.string.isRequired,
        cancel: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        singleComment: PropTypes.string.isRequired,
        comments: PropTypes.string.isRequired,
        lastUpdate: PropTypes.string.isRequired,
        loading: PropTypes.string.isRequired,
        empty: PropTypes.string.isRequired
    }).isRequired,
    locale: PropTypes.string.isRequired
}

const defaultProps = {
    userPictureResolver: userId => `./x/account/api/accounts/${userId}/photo`,
    texts: {
        placeholder: 'Leave a comment...',
        send: 'Send',
        edit: 'Edit',
        cancel: 'Cancel',
        title: 'Comments',
        singleComment: 'comment',
        comments: 'comments',
        lastUpdate: 'Last update',
        loading: 'Loading...',
        empty: 'Be the first to leave your comment below !'
    },
    locale: 'en'
}

class Container extends Component {
    _refreshComments() {
        const {dispatch, concept, conceptId, apiRootUrl} = this.props;
        dispatch(getComments(concept, conceptId, apiRootUrl));
    }

    componentWillMount() {
        moment.locale(this.props.locale);
        const {dispatch, apiRootUrl, concept, conceptId} = this.props;
        dispatch(getComments(concept, conceptId, apiRootUrl));
    }

    componentDidMount() {
        // Set an interval to refresh the moment() computed dates.
        this.refreshInterval = setInterval(() => {
            this.setState({});
        }, 60000);
    }

    componentWillUnmount() {
        this.props.dispatch(clearComments());
        clearInterval(this.refreshInterval);
    }

    render() {
        const {comments, dispatch, isLoading, lastUpdate, error, ...otherProps} = this.props;
        return (
            <div data-focus='comments-extension'>
                <div data-focus='header'>
                    <div data-focus='title'>{this.props.texts.title}</div>
                    <div data-focus='last-update'>{isLoading ? this.props.texts.loading : `${this.props.texts.lastUpdate} ${moment(lastUpdate).fromNow()}`}</div>
                    <div data-focus='refresh'>
                        <button className='mdl-button mdl-js-button mdl-button--fab mdl-button--colored mdl-button--raised' onClick={this._refreshComments.bind(this)}>
                            {isLoading ?
                                <i className="fa fa-circle-o-notch fa-spin"></i>
                                :
                                <i className='material-icons'>refresh</i>
                            }
                        </button>
                    </div>
                </div>
                <div data-focus='body'>
                    <div data-focus='count'>{`${comments.length} ${comments.length > 1 ? this.props.texts.comments : this.props.texts.singleComment}`}</div>
                    {error &&
                        <div data-focus='comments-error'>
                            <i className='material-icons'>cloud_off</i>
                            <div>{error}</div>
                        </div>
                    }
                    <div className='separator'></div>
                    {comments.length === 0 ?
                        <div data-focus='empty-list'>
                            <div>
                                <i className='material-icons'>forum</i>
                                <div>{this.props.texts.empty}</div>
                            </div>
                        </div>
                        :
                        <List comments={comments} dispatch={dispatch} isLoading={isLoading} {...otherProps} ref='list'/>
                    }
                </div>
                <div data-focus='input'>
                    <i className='material-icons'>insert_comment</i>
                    <Input dispatch={dispatch} isLoading={isLoading} scrollToBottom={() => {if (this.refs.list) this.refs.list.scrollToBottom()}} {...otherProps}/>
                </div>
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
