import {combineReducers} from 'redux';
import {SEND_COMMENT, RECEIVE_COMMENTS, REQUEST_COMMENTS, RECEIVE_COMMENT_CONFIRMATION} from '../actions';

const comments = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_COMMENTS:
            return action.comments;
        default:
            return state;
    }
}

const isLoading = (state = false, action) => {
    switch (action.type) {
        case REQUEST_COMMENTS:
            return true;
        case RECEIVE_COMMENTS:
            return false;
        default:
            return state;
    }
}

const isPosting = (state = false, action) => {
    switch (action.type) {
        case SEND_COMMENT:
            return true;
        case RECEIVE_COMMENT_CONFIRMATION:
            return false;
        default:
            return state;
    }
}

const lastUpdate = (state = null, action) => {
    switch(action.type) {
        case RECEIVE_COMMENTS:
            return action.lastUpdate;
        default:
            return state;
    }
}

export default combineReducers({
    isLoading,
    isPosting,
    lastUpdate,
    comments
});
