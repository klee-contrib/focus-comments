import {addComment, updateComment, getComments} from '../';
import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import nock from 'nock';
import {SEND_COMMENT, RECEIVE_COMMENT_CONFIRMATION, REQUEST_COMMENTS, RECEIVE_COMMENTS} from '../';

const middlewares = [thunk];
const HOST = 'http://localhost/x/comment';

/**
* Creates a mock of Redux store with middleware.
*/
function mockStore(getState, expectedActions, done) {
    if (!Array.isArray(expectedActions)) {
        throw new Error('expectedActions should be an array of expected actions.');
    }
    if (typeof done !== 'undefined' && typeof done !== 'function') {
        throw new Error('done should either be undefined or function.');
    }

    function mockStoreWithoutMiddleware() {
        return {
            getState() {
                return typeof getState === 'function' ?
                getState() :
                getState;
            },

            dispatch(action) {
                const expectedAction = expectedActions.shift();
                try {
                    expect(action).to.deep.equal(expectedAction);
                    if (done && !expectedActions.length) {
                        done();
                    }
                    return action;
                } catch (e) {
                    done(e);
                }
            }
        }
    }

    const mockStoreWithMiddleware = applyMiddleware(
        ...middlewares
    )(mockStoreWithoutMiddleware);

    return mockStoreWithMiddleware();
}

describe('Async actions', () => {
    afterEach(() => {
        nock.cleanAll()
    });
    const comments = ['mocked comment number 1', 'mocker comment number 2'];
    it('create SEND_COMMENT and RECEIVE_COMMENT_CONFIRMATION when adding a new comment', done => {
        nock(HOST)
        .post('/api/comments')
        .query({concept: 'concept', id: 'conceptId'})
        .reply(200);

        const expectedActions = [
            { type: SEND_COMMENT },
            { type: RECEIVE_COMMENT_CONFIRMATION}
        ]
        const store = mockStore({}, expectedActions, done);
        store.dispatch(addComment('concept', 'conceptId', 'message', HOST));
    });
    it('create SEND_COMMENT and RECEIVE_COMMENT_CONFIRMATION when updating a comment', done => {
        nock(HOST)
        .put('/api/comments/uuid')
        .reply(200);

        const expectedActions = [
            { type: SEND_COMMENT },
            { type: RECEIVE_COMMENT_CONFIRMATION}
        ]
        const store = mockStore({}, expectedActions, done);
        store.dispatch(updateComment({uuid: 'uuid'}, 'message', HOST));
    });
});
