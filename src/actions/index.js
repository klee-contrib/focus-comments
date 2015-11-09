import fetch from 'isomorphic-fetch';

// TODO : replace the configuration
const CONFIGURATION = {
    host: 'http://localhost:9090/x/comment'
}

// Single comment actions
export const SEND_COMMENT = 'SEND_COMMENT';
export const RECEIVE_COMMENT_CONFIRMATION = 'RECEIVE_COMMENT_CONFIRMATION';

const sendComment = () => {
    return {
        type: SEND_COMMENT
    }
}
const receiveCommentConfirmation = () => {
    return {
        type: RECEIVE_COMMENT_CONFIRMATION
    }
}
export const addComment = (concept, conceptId, message) => {
    return dispatch => {
        dispatch(sendComment());
        const comment = {
            msg: message,
            creationDate: new Date(),
            lastModified: new Date()
        }
        return fetch(`${CONFIGURATION.host}/api/comments?concept=${concept}&id=${conceptId}`, {method: 'POST', body: comment})
        .then(() => dispatch(receiveCommentConfirmation()));
    }
}
export const updateComment = (comment, message) => {
    return dispatch => {
        dispatch(sendComment());
        const newComment = {
            ...comment,
            msg: message,
            lastModified: new Date()
        }
        return fetch(`${CONFIGURATION.host}/api/comments/${comment.uuid}`, {method: 'PUT', body: comment})
        .then(() => dispatch(receiveCommentConfirmation()));
    }
}

// Multiple comments actions
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';

const requestComments = () => {
    return {
        type: REQUEST_COMMENTS
    }
}
const receiveComments = (comments, lastUpdate) => {
    return {
        type: RECEIVE_COMMENTS,
        comments, lastUpdate
    }
}
export const getComments = (concept, conceptId) => {
    return dispatch => {
        dispatch(requestComments());
        return fetch(`${CONFIGURATION.host}/api/comments?concept=${concept}&id=${conceptId}`)
        .then(response => response.json())
        .then(comments => dispatch(receiveComments(comments, new Date())));
    }
}
