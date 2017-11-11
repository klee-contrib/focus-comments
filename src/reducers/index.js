import { combineReducers } from 'redux';
import { ADD_COMMENT, UPDATE_COMMENT, DELETE_COMMENT, RECEIVE_COMMENTS, REQUEST_COMMENTS, CLEAR_COMMENTS, SET_ERROR, CLEAR_ERROR } from '../actions';

const comments = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_COMMENTS:
            return action.comments;
        case CLEAR_COMMENTS:
            return [];
        default:
            return state;
    }
}

const isLoading = (state = false, action) => {
    switch (action.type) {
        case ADD_COMMENT:
        case UPDATE_COMMENT:
        case DELETE_COMMENT:
        case REQUEST_COMMENTS:
            return true;
        case RECEIVE_COMMENTS:
        case SET_ERROR:
            return false;
        default:
            return state;
    }
}

const lastUpdate = (state = new Date(), action) => {
    switch (action.type) {
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
