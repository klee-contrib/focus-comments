import reducer from '../';
import {SEND_COMMENT, REQUEST_COMMENTS, RECEIVE_COMMENTS} from '../../actions';

const initialState = {
    isLoading: false,
    lastUpdate: null,
    comments: []
};

describe('The reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).to.deep.equal(initialState);
    });

    it('should handle SEND_COMMENT', () => {
        expect(reducer(initialState, {
            type: SEND_COMMENT
        })).to.deep.equal({...initialState, isLoading: true});
    });

    it('should handle REQUEST_COMMENTS', () => {
        expect(reducer(initialState, {
            type: REQUEST_COMMENTS
        })).to.deep.equal({...initialState, isLoading: true});
    });

    it('should handle RECEIVE_COMMENTS', () => {
        const newComments = ['mockedComment1', 'mockedComment2'];
        const now = new Date();
        expect(reducer({...initialState, isLoading: true}, {
            type: RECEIVE_COMMENTS,
            comments: newComments,
            lastUpdate: now
        })).to.deep.equal({...initialState, comments: newComments, lastUpdate: now});
    });
});
