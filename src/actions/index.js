import fetch from 'isomorphic-fetch';

// Single comment actions
export const SEND_COMMENT = 'SEND_COMMENT';

const sendComment = () => {
    return {
        type: SEND_COMMENT
    }
}
export const addComment = (concept, conceptId, message, host, date = new Date()) => {
    return dispatch => {
        dispatch(sendComment());
        const comment = {
            msg: message,
            creationDate: new Date(),
            lastModified: new Date()
        }
        return fetch(`${host}/api/comments?concept=${concept}&id=${conceptId}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        })
        .then(() => dispatch(getComments(concept, conceptId, host, date)));
    }
}
export const updateComment = (concept, conceptId, comment, message, host, date = new Date()) => {
    return dispatch => {
        dispatch(sendComment());
        const newComment = {
            ...comment,
            msg: message,
            lastModified: new Date()
        }
        return fetch(`${host}/api/comments/${comment.uuid}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        })
        .then(() => dispatch(getComments(concept, conceptId, host, date)));
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
        comments,
        lastUpdate
    }
}
export const getComments = (concept, conceptId, host, date = new Date()) => {
    return dispatch => {
        dispatch(requestComments());
        return fetch(`${host}/api/comments?concept=${concept}&id=${conceptId}`)
        .then(response => response.json())
        .then(comments => dispatch(receiveComments(comments, date)));
    }
}
