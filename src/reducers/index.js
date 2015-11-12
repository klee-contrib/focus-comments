import {combineReducers} from 'redux';
import {ADD_COMMENT, UPDATE_COMMENT, RECEIVE_COMMENTS, REQUEST_COMMENTS, SET_ERROR, CLEAR_ERROR} from '../actions';

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
        case ADD_COMMENT:
            return true;
        case UPDATE_COMMENT:
            return true;
        case REQUEST_COMMENTS:
            return true;
        case RECEIVE_COMMENTS:
            return false;
        case SET_ERROR:
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

const error = (state = null, action) => {
    switch (action.type) {
        case SET_ERROR:
            return action.error;
        case CLEAR_ERROR:
            return null;
        default:
            return state;
    }
}

export default combineReducers({
    isLoading,
    lastUpdate,
    comments,
    error
});
