import React, {Component, PropTypes} from 'react';
import './style.scss';
import moment from 'moment';

const propTypes = {
    uuid: PropTypes.string.isRequired,
    author: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    msg: PropTypes.string.isRequired,
    creationDate: PropTypes.string.isRequired,
    lastModified: PropTypes.string.isRequired,
    authorDisplayName: PropTypes.string.isRequired,
    userPictureResolver: PropTypes.func.isRequired,
    currentUserId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

function Comment({msg, author, authorDisplayName, creationDate, currentUserId, lastModified, userPictureResolver}) {
    const isMine = currentUserId === author;
    return (
        <div data-focus='comment'>
            <img data-focus='avatar' src={userPictureResolver(author)}/>
            <div data-focus='content'>
                <div data-focus='head'>
                    <div data-focus='name'>
                        {authorDisplayName}
                    </div>
                    <div data-focus='date'>
                        {moment(creationDate).fromNow()}
                    </div>
                </div>
                <div data-focus='body'>
                    {msg}
                </div>
            </div>
        </div>
    );
}

Comment.propTypes = propTypes;

export default Comment;
