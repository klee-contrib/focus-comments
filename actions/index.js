'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CLEAR_ERROR = exports.SET_ERROR = exports.clearComments = exports.getComments = exports.CLEAR_COMMENTS = exports.RECEIVE_COMMENTS = exports.REQUEST_COMMENTS = exports.deleteComment = exports.updateComment = exports.addComment = exports.DELETE_COMMENT = exports.UPDATE_COMMENT = exports.ADD_COMMENT = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Single comment actions
var ADD_COMMENT = exports.ADD_COMMENT = 'ADD_COMMENT';
var UPDATE_COMMENT = exports.UPDATE_COMMENT = 'UPDATE_COMMENT';
var DELETE_COMMENT = exports.DELETE_COMMENT = 'DELETE_COMMENT';

/**
 * Adding a comment.
 * @param {string} message Message.
 * @return {object} Action.
 */
var commentAdding = function commentAdding(message) {
    return {
        type: ADD_COMMENT,
        message: message
    };
};

/**
 * Updating a comment.
 * @param {string} comment Comment.
 * @return {object} Action.
 */
var commentUpdating = function commentUpdating(comment) {
    return {
        type: UPDATE_COMMENT,
        comment: comment
    };
};

/**
 * Deleting a comment.
 * @param {string} commentId Comment's Id.
 * @return {object} Action.
 */
var commentDeleting = function commentDeleting(commentId) {
    return {
        type: DELETE_COMMENT,
        commentId: commentId
    };
};

/**
 * Add a commment.
 * @param {string} concept Concept linked.
 * @param {string} conceptId Concept's Id.
 * @param {string} message Message
 * @param {string} host Host URL.
 * @param {Date} date Datetime.
 * @return {func} Thunk.
 */
var addComment = exports.addComment = function addComment(concept, conceptId, message, host) {
    var date = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : new Date();

    return function (dispatch) {
        dispatch(clearError());
        dispatch(commentAdding(message));
        var comment = {
            msg: message,
            creationDate: new Date(),
            lastModified: new Date()
        };
        return (0, _isomorphicFetch2.default)(host + '/api/comments?concept=' + concept + '&id=' + conceptId, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment),
            credentials: 'include'
        }).then(function (_ref) {
            var status = _ref.status;

            if (status >= 400) {
                dispatch(setError('There was a problem adding your comment. The backend did not reply correctly.'));
            } else {
                dispatch(getComments(concept, conceptId, host, date));
            }
        });
    };
};

/**
 * Update a comment.
 * @param {string} concept Concept linked.
 * @param {string} conceptId Concept's Id.
 * @param {object} comment Comment.
 * @param {string} message Message.
 * @param {string} host Host URL.
 * @param {Date} date Datetime.
 * @return {func} Thunk.
 */
var updateComment = exports.updateComment = function updateComment(concept, conceptId, comment, message, host) {
    var date = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : new Date();

    return function (dispatch) {
        dispatch(clearError());
        var newComment = _extends({}, comment, {
            msg: message,
            lastModified: new Date()
        });
        dispatch(commentUpdating(newComment));
        return (0, _isomorphicFetch2.default)(host + '/api/comments/' + comment.uuid, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComment),
            credentials: 'include'
        }).then(function (_ref2) {
            var status = _ref2.status;

            if (status >= 400) {
                dispatch(setError('There was a problem updating your comment. The backend did not reply correctly.'));
            } else {
                dispatch(getComments(concept, conceptId, host, date));
            }
        });
    };
};

/**
 * Delete a comment.
 * @param {string} concept Concept linked. 
 * @param {string} conceptId Concept's Id.
 * @param {string} commentId Comment's Id.
 * @param {string} host Host URL.
 * @param {Date} date Datetime.
 * @return {func} Thunk.
 */
var deleteComment = exports.deleteComment = function deleteComment(concept, conceptId, commentId, host) {
    var date = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : new Date();

    return function (dispatch) {
        dispatch(clearError());
        dispatch(commentDeleting(commentId));
        return (0, _isomorphicFetch2.default)(host + '/api/comments/' + commentId, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(function (_ref3) {
            var status = _ref3.status;

            if (status >= 400) {
                dispatch(setError('There was a problem deleting your comment. The backend did not reply correctly.'));
            } else {
                dispatch(getComments(concept, conceptId, host, date));
            }
        });
    };
};

// Multiple comments actions
var REQUEST_COMMENTS = exports.REQUEST_COMMENTS = 'REQUEST_COMMENTS';
var RECEIVE_COMMENTS = exports.RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
var CLEAR_COMMENTS = exports.CLEAR_COMMENTS = 'CLEAR_COMMENTS';

var requestComments = function requestComments() {
    return {
        type: REQUEST_COMMENTS
    };
};
var receiveComments = function receiveComments(comments, lastUpdate) {
    return {
        type: RECEIVE_COMMENTS,
        comments: comments,
        lastUpdate: lastUpdate
    };
};
var getComments = exports.getComments = function getComments(concept, conceptId, host) {
    var date = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new Date();

    return function (dispatch) {
        dispatch(clearError());
        dispatch(requestComments());
        return (0, _isomorphicFetch2.default)(host + '/api/comments?concept=' + concept + '&id=' + conceptId, { credentials: 'include' }).then(function (response) {
            return response.json();
        }).then(function (comments) {
            return dispatch(receiveComments(comments, date));
        }).catch(function () {
            return dispatch(setError('There was a problem fetching the comments. The backend did not reply correctly.'));
        });
    };
};
var clearComments = exports.clearComments = function clearComments() {
    return {
        type: CLEAR_COMMENTS
    };
};

// Error handling

var SET_ERROR = exports.SET_ERROR = 'SET_ERROR';
var CLEAR_ERROR = exports.CLEAR_ERROR = 'CLEAR_ERROR';

var setError = function setError(error) {
    return {
        type: SET_ERROR,
        error: error
    };
};

var clearError = function clearError() {
    return {
        type: CLEAR_ERROR
    };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkFERF9DT01NRU5UIiwiVVBEQVRFX0NPTU1FTlQiLCJERUxFVEVfQ09NTUVOVCIsImNvbW1lbnRBZGRpbmciLCJ0eXBlIiwibWVzc2FnZSIsImNvbW1lbnRVcGRhdGluZyIsImNvbW1lbnQiLCJjb21tZW50RGVsZXRpbmciLCJjb21tZW50SWQiLCJhZGRDb21tZW50IiwiY29uY2VwdCIsImNvbmNlcHRJZCIsImhvc3QiLCJkYXRlIiwiRGF0ZSIsImRpc3BhdGNoIiwiY2xlYXJFcnJvciIsIm1zZyIsImNyZWF0aW9uRGF0ZSIsImxhc3RNb2RpZmllZCIsIm1ldGhvZCIsImhlYWRlcnMiLCJBY2NlcHQiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImNyZWRlbnRpYWxzIiwidGhlbiIsInN0YXR1cyIsInNldEVycm9yIiwiZ2V0Q29tbWVudHMiLCJ1cGRhdGVDb21tZW50IiwibmV3Q29tbWVudCIsInV1aWQiLCJkZWxldGVDb21tZW50IiwiUkVRVUVTVF9DT01NRU5UUyIsIlJFQ0VJVkVfQ09NTUVOVFMiLCJDTEVBUl9DT01NRU5UUyIsInJlcXVlc3RDb21tZW50cyIsInJlY2VpdmVDb21tZW50cyIsImNvbW1lbnRzIiwibGFzdFVwZGF0ZSIsInJlc3BvbnNlIiwianNvbiIsImNhdGNoIiwiY2xlYXJDb21tZW50cyIsIlNFVF9FUlJPUiIsIkNMRUFSX0VSUk9SIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFQTtBQUNPLElBQU1BLG9DQUFjLGFBQXBCO0FBQ0EsSUFBTUMsMENBQWlCLGdCQUF2QjtBQUNBLElBQU1DLDBDQUFpQixnQkFBdkI7O0FBRVA7Ozs7O0FBS0EsSUFBTUMsZ0JBQWdCLFNBQWhCQSxhQUFnQixVQUFXO0FBQzdCLFdBQU87QUFDSEMsY0FBTUosV0FESDtBQUVISztBQUZHLEtBQVA7QUFJSCxDQUxEOztBQU9BOzs7OztBQUtBLElBQU1DLGtCQUFrQixTQUFsQkEsZUFB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QUF0QyxZQUFvREMsU0FBcEQsRUFBaUUsRUFBRWUsYUFBYSxTQUFmLEVBQWpFLEVBQ0ZDLElBREUsQ0FDRztBQUFBLG1CQUFZZSxTQUFTQyxJQUFULEVBQVo7QUFBQSxTQURILEVBRUZoQixJQUZFLENBRUc7QUFBQSxtQkFBWVosU0FBU3dCLGdCQUFnQkMsUUFBaEIsRUFBMEIzQixJQUExQixDQUFULENBQVo7QUFBQSxTQUZILEVBR0YrQixLQUhFLENBR0k7QUFBQSxtQkFBTTdCLFNBQVNjLFNBQVMsaUZBQVQsQ0FBVCxDQUFOO0FBQUEsU0FISixDQUFQO0FBSUgsS0FQRDtBQVFILENBVE07QUFVQSxJQUFNZ0Isd0NBQWdCLFNBQWhCQSxhQUFnQjtBQUFBLFdBQU87QUFDaEMxQyxjQUFNa0M7QUFEMEIsS0FBUDtBQUFBLENBQXRCOztBQUlQOztBQUVPLElBQU1TLGdDQUFZLFdBQWxCO0FBQ0EsSUFBTUMsb0NBQWMsYUFBcEI7O0FBRVAsSUFBTWxCLFdBQVcsU0FBWEEsUUFBVyxRQUFTO0FBQ3RCLFdBQU87QUFDSDFCLGNBQU0yQyxTQURIO0FBRUhFO0FBRkcsS0FBUDtBQUlILENBTEQ7O0FBT0EsSUFBTWhDLGFBQWEsU0FBYkEsVUFBYSxHQUFNO0FBQ3JCLFdBQU87QUFDSGIsY0FBTTRDO0FBREgsS0FBUDtBQUdILENBSkQiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZmV0Y2ggZnJvbSAnaXNvbW9ycGhpYy1mZXRjaCc7XG5cbi8vIFNpbmdsZSBjb21tZW50IGFjdGlvbnNcbmV4cG9ydCBjb25zdCBBRERfQ09NTUVOVCA9ICdBRERfQ09NTUVOVCc7XG5leHBvcnQgY29uc3QgVVBEQVRFX0NPTU1FTlQgPSAnVVBEQVRFX0NPTU1FTlQnO1xuZXhwb3J0IGNvbnN0IERFTEVURV9DT01NRU5UID0gJ0RFTEVURV9DT01NRU5UJztcblxuLyoqXG4gKiBBZGRpbmcgYSBjb21tZW50LlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgTWVzc2FnZS5cbiAqIEByZXR1cm4ge29iamVjdH0gQWN0aW9uLlxuICovXG5jb25zdCBjb21tZW50QWRkaW5nID0gbWVzc2FnZSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogQUREX0NPTU1FTlQsXG4gICAgICAgIG1lc3NhZ2VcbiAgICB9XG59XG5cbi8qKlxuICogVXBkYXRpbmcgYSBjb21tZW50LlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbW1lbnQgQ29tbWVudC5cbiAqIEByZXR1cm4ge29iamVjdH0gQWN0aW9uLlxuICovXG5jb25zdCBjb21tZW50VXBkYXRpbmcgPSBjb21tZW50ID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBVUERBVEVfQ09NTUVOVCxcbiAgICAgICAgY29tbWVudFxuICAgIH1cbn1cblxuLyoqXG4gKiBEZWxldGluZyBhIGNvbW1lbnQuXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tbWVudElkIENvbW1lbnQncyBJZC5cbiAqIEByZXR1cm4ge29iamVjdH0gQWN0aW9uLlxuICovXG5jb25zdCBjb21tZW50RGVsZXRpbmcgPSBjb21tZW50SWQgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IERFTEVURV9DT01NRU5ULFxuICAgICAgICBjb21tZW50SWRcbiAgICB9XG59XG5cbi8qKlxuICogQWRkIGEgY29tbW1lbnQuXG4gKiBAcGFyYW0ge3N0cmluZ30gY29uY2VwdCBDb25jZXB0IGxpbmtlZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjb25jZXB0SWQgQ29uY2VwdCdzIElkLlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgTWVzc2FnZVxuICogQHBhcmFtIHtzdHJpbmd9IGhvc3QgSG9zdCBVUkwuXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgRGF0ZXRpbWUuXG4gKiBAcmV0dXJuIHtmdW5jfSBUaHVuay5cbiAqL1xuZXhwb3J0IGNvbnN0IGFkZENvbW1lbnQgPSAoY29uY2VwdCwgY29uY2VwdElkLCBtZXNzYWdlLCBob3N0LCBkYXRlID0gbmV3IERhdGUoKSkgPT4ge1xuICAgIHJldHVybiBkaXNwYXRjaCA9PiB7XG4gICAgICAgIGRpc3BhdGNoKGNsZWFyRXJyb3IoKSk7XG4gICAgICAgIGRpc3BhdGNoKGNvbW1lbnRBZGRpbmcobWVzc2FnZSkpO1xuICAgICAgICBjb25zdCBjb21tZW50ID0ge1xuICAgICAgICAgICAgbXNnOiBtZXNzYWdlLFxuICAgICAgICAgICAgY3JlYXRpb25EYXRlOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgbGFzdE1vZGlmaWVkOiBuZXcgRGF0ZSgpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2hvc3R9L2FwaS9jb21tZW50cz9jb25jZXB0PSR7Y29uY2VwdH0maWQ9JHtjb25jZXB0SWR9YCwge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNvbW1lbnQpLFxuICAgICAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKHsgc3RhdHVzIH0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID49IDQwMCkge1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChzZXRFcnJvcignVGhlcmUgd2FzIGEgcHJvYmxlbSBhZGRpbmcgeW91ciBjb21tZW50LiBUaGUgYmFja2VuZCBkaWQgbm90IHJlcGx5IGNvcnJlY3RseS4nKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goZ2V0Q29tbWVudHMoY29uY2VwdCwgY29uY2VwdElkLCBob3N0LCBkYXRlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxufVxuXG4vKipcbiAqIFVwZGF0ZSBhIGNvbW1lbnQuXG4gKiBAcGFyYW0ge3N0cmluZ30gY29uY2VwdCBDb25jZXB0IGxpbmtlZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjb25jZXB0SWQgQ29uY2VwdCdzIElkLlxuICogQHBhcmFtIHtvYmplY3R9IGNvbW1lbnQgQ29tbWVudC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIE1lc3NhZ2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gaG9zdCBIb3N0IFVSTC5cbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSBEYXRldGltZS5cbiAqIEByZXR1cm4ge2Z1bmN9IFRodW5rLlxuICovXG5leHBvcnQgY29uc3QgdXBkYXRlQ29tbWVudCA9IChjb25jZXB0LCBjb25jZXB0SWQsIGNvbW1lbnQsIG1lc3NhZ2UsIGhvc3QsIGRhdGUgPSBuZXcgRGF0ZSgpKSA9PiB7XG4gICAgcmV0dXJuIGRpc3BhdGNoID0+IHtcbiAgICAgICAgZGlzcGF0Y2goY2xlYXJFcnJvcigpKTtcbiAgICAgICAgY29uc3QgbmV3Q29tbWVudCA9IHtcbiAgICAgICAgICAgIC4uLmNvbW1lbnQsXG4gICAgICAgICAgICBtc2c6IG1lc3NhZ2UsXG4gICAgICAgICAgICBsYXN0TW9kaWZpZWQ6IG5ldyBEYXRlKClcbiAgICAgICAgfVxuICAgICAgICBkaXNwYXRjaChjb21tZW50VXBkYXRpbmcobmV3Q29tbWVudCkpO1xuICAgICAgICByZXR1cm4gZmV0Y2goYCR7aG9zdH0vYXBpL2NvbW1lbnRzLyR7Y29tbWVudC51dWlkfWAsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld0NvbW1lbnQpLFxuICAgICAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuICAgICAgICB9KS50aGVuKCh7IHN0YXR1cyB9KSA9PiB7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID49IDQwMCkge1xuICAgICAgICAgICAgICAgIGRpc3BhdGNoKHNldEVycm9yKCdUaGVyZSB3YXMgYSBwcm9ibGVtIHVwZGF0aW5nIHlvdXIgY29tbWVudC4gVGhlIGJhY2tlbmQgZGlkIG5vdCByZXBseSBjb3JyZWN0bHkuJykpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChnZXRDb21tZW50cyhjb25jZXB0LCBjb25jZXB0SWQsIGhvc3QsIGRhdGUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4vKipcbiAqIERlbGV0ZSBhIGNvbW1lbnQuXG4gKiBAcGFyYW0ge3N0cmluZ30gY29uY2VwdCBDb25jZXB0IGxpbmtlZC4gXG4gKiBAcGFyYW0ge3N0cmluZ30gY29uY2VwdElkIENvbmNlcHQncyBJZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjb21tZW50SWQgQ29tbWVudCdzIElkLlxuICogQHBhcmFtIHtzdHJpbmd9IGhvc3QgSG9zdCBVUkwuXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgRGF0ZXRpbWUuXG4gKiBAcmV0dXJuIHtmdW5jfSBUaHVuay5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlbGV0ZUNvbW1lbnQgPSAoY29uY2VwdCwgY29uY2VwdElkLCBjb21tZW50SWQsIGhvc3QsIGRhdGUgPSBuZXcgRGF0ZSgpKSA9PiB7XG4gICAgcmV0dXJuIGRpc3BhdGNoID0+IHtcbiAgICAgICAgZGlzcGF0Y2goY2xlYXJFcnJvcigpKTtcbiAgICAgICAgZGlzcGF0Y2goY29tbWVudERlbGV0aW5nKGNvbW1lbnRJZCkpO1xuICAgICAgICByZXR1cm4gZmV0Y2goYCR7aG9zdH0vYXBpL2NvbW1lbnRzLyR7Y29tbWVudElkfWAsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZSdcbiAgICAgICAgfSkudGhlbigoeyBzdGF0dXMgfSkgPT4ge1xuICAgICAgICAgICAgaWYgKHN0YXR1cyA+PSA0MDApIHtcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChzZXRFcnJvcignVGhlcmUgd2FzIGEgcHJvYmxlbSBkZWxldGluZyB5b3VyIGNvbW1lbnQuIFRoZSBiYWNrZW5kIGRpZCBub3QgcmVwbHkgY29ycmVjdGx5LicpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGlzcGF0Y2goZ2V0Q29tbWVudHMoY29uY2VwdCwgY29uY2VwdElkLCBob3N0LCBkYXRlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG4vLyBNdWx0aXBsZSBjb21tZW50cyBhY3Rpb25zXG5leHBvcnQgY29uc3QgUkVRVUVTVF9DT01NRU5UUyA9ICdSRVFVRVNUX0NPTU1FTlRTJztcbmV4cG9ydCBjb25zdCBSRUNFSVZFX0NPTU1FTlRTID0gJ1JFQ0VJVkVfQ09NTUVOVFMnO1xuZXhwb3J0IGNvbnN0IENMRUFSX0NPTU1FTlRTID0gJ0NMRUFSX0NPTU1FTlRTJztcblxuY29uc3QgcmVxdWVzdENvbW1lbnRzID0gKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFJFUVVFU1RfQ09NTUVOVFNcbiAgICB9XG59XG5jb25zdCByZWNlaXZlQ29tbWVudHMgPSAoY29tbWVudHMsIGxhc3RVcGRhdGUpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBSRUNFSVZFX0NPTU1FTlRTLFxuICAgICAgICBjb21tZW50cyxcbiAgICAgICAgbGFzdFVwZGF0ZVxuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBnZXRDb21tZW50cyA9IChjb25jZXB0LCBjb25jZXB0SWQsIGhvc3QsIGRhdGUgPSBuZXcgRGF0ZSgpKSA9PiB7XG4gICAgcmV0dXJuIGRpc3BhdGNoID0+IHtcbiAgICAgICAgZGlzcGF0Y2goY2xlYXJFcnJvcigpKTtcbiAgICAgICAgZGlzcGF0Y2gocmVxdWVzdENvbW1lbnRzKCkpO1xuICAgICAgICByZXR1cm4gZmV0Y2goYCR7aG9zdH0vYXBpL2NvbW1lbnRzP2NvbmNlcHQ9JHtjb25jZXB0fSZpZD0ke2NvbmNlcHRJZH1gLCB7IGNyZWRlbnRpYWxzOiAnaW5jbHVkZScgfSlcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgICAgIC50aGVuKGNvbW1lbnRzID0+IGRpc3BhdGNoKHJlY2VpdmVDb21tZW50cyhjb21tZW50cywgZGF0ZSkpKVxuICAgICAgICAgICAgLmNhdGNoKCgpID0+IGRpc3BhdGNoKHNldEVycm9yKCdUaGVyZSB3YXMgYSBwcm9ibGVtIGZldGNoaW5nIHRoZSBjb21tZW50cy4gVGhlIGJhY2tlbmQgZGlkIG5vdCByZXBseSBjb3JyZWN0bHkuJykpKTtcbiAgICB9XG59XG5leHBvcnQgY29uc3QgY2xlYXJDb21tZW50cyA9ICgpID0+ICh7XG4gICAgdHlwZTogQ0xFQVJfQ09NTUVOVFNcbn0pO1xuXG4vLyBFcnJvciBoYW5kbGluZ1xuXG5leHBvcnQgY29uc3QgU0VUX0VSUk9SID0gJ1NFVF9FUlJPUic7XG5leHBvcnQgY29uc3QgQ0xFQVJfRVJST1IgPSAnQ0xFQVJfRVJST1InO1xuXG5jb25zdCBzZXRFcnJvciA9IGVycm9yID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBTRVRfRVJST1IsXG4gICAgICAgIGVycm9yXG4gICAgfVxufVxuXG5jb25zdCBjbGVhckVycm9yID0gKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IENMRUFSX0VSUk9SXG4gICAgfVxufVxuIl19