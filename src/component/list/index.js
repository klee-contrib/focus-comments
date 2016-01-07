import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Comment from '../comment';
import {getComments} from '../../actions';
import 'animate.css/source/fading_entrances/fadeInRight.css';
import './style.scss';

const TRANSITION_TIMEOUT = 5000;

const propTypes = {
    comments: PropTypes.arrayOf(PropTypes.shape({
        uuid: PropTypes.string.isRequired,
        author: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        msg: PropTypes.string.isRequired,
        creationDate: PropTypes.string.isRequired,
        lastModified: PropTypes.string.isRequired,
        authorDisplayName: PropTypes.string.isRequired
    })).isRequired
}

const defaultProps = {
    locale: 'en'
}

class List extends Component {
    scrollToBottom() {
        const list = ReactDOM.findDOMNode(this.refs.list);
        if (list) {
            list.scrollTop = list.scrollHeight;
        }
    }

    render() {
        const {comments, ...otherProps} = this.props;
        return (
            <div data-focus='comments-list' ref='list'>
                <CSSTransitionGroup transitionName='comment' transitionEnterTimeout={TRANSITION_TIMEOUT} transitionLeaveTimeout={TRANSITION_TIMEOUT}>
                    {comments.map(comment => <Comment key={comment.uuid} {...comment} {...otherProps}/>)}
                </CSSTransitionGroup>
            </div>
        );
    }
}

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default List;
