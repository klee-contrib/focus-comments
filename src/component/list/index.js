import React, {Component, PropTypes} from 'react';
import Comment from '../comment';
import {getComments} from '../../actions';

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

class List extends Component {
    componentWillMount() {
        const {dispatch, concept, conceptId} = this.props;
        dispatch(getComments(concept, conceptId));
    }

    render() {
        const {comments} = this.props;
        return (
            <div data-focus='comments-list'>
                {comments.map(comment => <Comment key={comment.uuid} {...comment}/>)}
            </div>
        );
    }
}

List.propTypes = propTypes;

export default List;
