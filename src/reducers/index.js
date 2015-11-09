import {combineReducers} from 'redux';
import {RECEIVE_COMMENTS, REQUEST_COMMENTS} from '../actions';

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
        default:
            return state;
    }
}

export default combineReducers({
    isLoading,
    comments
});
