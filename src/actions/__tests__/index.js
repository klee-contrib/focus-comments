import {addComment, updateComment, getComments} from '../';
import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import nock from 'nock';
import {SEND_COMMENT, REQUEST_COMMENTS, RECEIVE_COMMENTS} from '../';

const middlewares = [thunk];
const HOST = 'http://localhost/x/comment';
const now = new Date();
const concept = 'concept';
const conceptId = 'conceptId';
const comments = ['mocked comment number 1', 'mocker comment number 2'];

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
    it('should create SEND_COMMENT, REQUEST_COMMENTS and RECEIVE_COMMENTS when adding a new comment', done => {
        nock(HOST)
        .post('/api/comments')
        .query({concept, id: conceptId})
        .reply(200)
        .get('/api/comments')
        .query({concept, id: conceptId})
        .reply(200, comments);

        const expectedActions = [
            {type: SEND_COMMENT},
            {type: REQUEST_COMMENTS},
            {type: RECEIVE_COMMENTS, comments, lastUpdate: now}
        ];
        const store = mockStore({}, expectedActions, done);
        store.dispatch(addComment(concept, conceptId, 'message', HOST, now));
    });
    it('should create SEND_COMMENT, REQUEST_COMMENTS and RECEIVE_COMMENTS when updating a comment', done => {
        nock(HOST)
        .put('/api/comments/uuid')
        .reply(200)
        .get('/api/comments')
        .query({concept, id: conceptId})
        .reply(200, comments);

        const expectedActions = [
            {type: SEND_COMMENT},
            {type: REQUEST_COMMENTS},
            {type: RECEIVE_COMMENTS, comments, lastUpdate: now}
        ]
        const store = mockStore({}, expectedActions, done);
        store.dispatch(updateComment(concept, conceptId, {uuid: 'uuid'}, 'message', HOST, now));
    });
    it('should create REQUEST_COMMENTS and RECEIVE_COMMENTS when getting the comments', done => {
        nock(HOST)
        .get('/api/comments')
        .query({concept, id: conceptId})
        .reply(200, comments);

        const expectedActions = [
            {type: REQUEST_COMMENTS},
            {type: RECEIVE_COMMENTS, comments, lastUpdate: now}
        ]
        const store = mockStore({}, expectedActions, done);
        store.dispatch(getComments(concept, conceptId, HOST, now));
    });
});
