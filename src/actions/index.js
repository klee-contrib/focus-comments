import fetch from 'isomorphic-fetch';

//ceci est un test

// Single comment actions
export const ADD_COMMENT = 'ADD_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';

const commentAdding = message => {
    return {
        type: ADD_COMMENT,
        message
    }
}
const commentUpdating = comment => {
    return {
        type: UPDATE_COMMENT,
        comment
    }
}

export const addComment = (concept, conceptId, message, host, date = new Date()) => {
    return dispatch => {
        dispatch(clearError());
        dispatch(commentAdding(message));
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
            body: JSON.stringify(comment),
            credentials: 'include'
        })
        .then(({status}) => {
            if (status >= 400) {
                dispatch(setError('There was a problem adding your comment. The backend did not reply correctly.'));
            } else {
                dispatch(getComments(concept, conceptId, host, date));
            }
        });
    }
}
export const updateComment = (concept, conceptId, comment, message, host, date = new Date()) => {
    return dispatch => {
        dispatch(clearError());
        const newComment = {
            ...comment,
            msg: message,
            lastModified: new Date()
        }
        dispatch(commentUpdating(newComment));
        return fetch(`${host}/api/comments/${comment.uuid}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComment),
            credentials: 'include'
        })
        .then(({status}) => {
            if (status >= 400) {
                dispatch(setError('There was a problem updating your comment. The backend did not reply correctly.'));
            } else {
                dispatch(getComments(concept, conceptId, host, date));
            }
        });
    }
}

// Multiple comments actions
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const CLEAR_COMMENTS = 'CLEAR_COMMENTS';

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
        dispatch(clearError());
        dispatch(requestComments());
        return fetch(`${host}/api/comments?concept=${concept}&id=${conceptId}`, {credentials: 'include'})
        .then(response => response.json())
        .then(comments => dispatch(receiveComments(comments, date)))
        .catch(() => dispatch(setError('There was a problem fetching the comments. The backend did not reply correctly.')));
    }
}
export const clearComments = () => ({
    type: CLEAR_COMMENTS
});

// Error handling

export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

const setError = error => {
    return {
        type: SET_ERROR,
        error
    }
}

const clearError = () => {
    return {
        type: CLEAR_ERROR
    }
}
