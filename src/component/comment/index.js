import React, {Component, PropTypes} from 'react';

const propTypes = {
    uuid: PropTypes.string.isRequired,
    author: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    msg: PropTypes.string.isRequired,
    creationDate: PropTypes.string.isRequired,
    lastModified: PropTypes.string.isRequired,
    authorDisplayName: PropTypes.string.isRequired
}

class Comment extends Component {
    render() {
        const {msg} = this.props;
        return (
            <div data-focus='comment'>
                {msg}
            </div>
        );
    }
}

Comment.propTypes = propTypes;

export default Comment;
