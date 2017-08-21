'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CLEAR_ERROR = exports.SET_ERROR = exports.clearComments = exports.getComments = exports.CLEAR_COMMENTS = exports.RECEIVE_COMMENTS = exports.REQUEST_COMMENTS = exports.updateComment = exports.addComment = exports.UPDATE_COMMENT = exports.ADD_COMMENT = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Single comment actions
var ADD_COMMENT = exports.ADD_COMMENT = 'ADD_COMMENT';
var UPDATE_COMMENT = exports.UPDATE_COMMENT = 'UPDATE_COMMENT';

var commentAdding = function commentAdding(message) {
    return {
        type: ADD_COMMENT,
        message: message
    };
};
var commentUpdating = function commentUpdating(comment) {
    return {
        type: UPDATE_COMMENT,
        comment: comment
    };
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkFERF9DT01NRU5UIiwiVVBEQVRFX0NPTU1FTlQiLCJjb21tZW50QWRkaW5nIiwidHlwZSIsIm1lc3NhZ2UiLCJjb21tZW50VXBkYXRpbmciLCJjb21tZW50IiwiYWRkQ29tbWVudCIsImNvbmNlcHQiLCJjb25jZXB0SWQiLCJob3N0IiwiZGF0ZSIsIkRhdGUiLCJkaXNwYXRjaCIsImNsZWFyRXJyb3IiLCJtc2ciLCJjcmVhdGlvbkRhdGUiLCJsYXN0TW9kaWZpZWQiLCJtZXRob2QiLCJoZWFkZXJzIiwiQWNjZXB0IiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjcmVkZW50aWFscyIsInRoZW4iLCJzdGF0dXMiLCJzZXRFcnJvciIsImdldENvbW1lbnRzIiwidXBkYXRlQ29tbWVudCIsIm5ld0NvbW1lbnQiLCJ1dWlkIiwiUkVRVUVTVF9DT01NRU5UUyIsIlJFQ0VJVkVfQ09NTUVOVFMiLCJDTEVBUl9DT01NRU5UUyIsInJlcXVlc3RDb21tZW50cyIsInJlY2VpdmVDb21tZW50cyIsImNvbW1lbnRzIiwibGFzdFVwZGF0ZSIsInJlc3BvbnNlIiwianNvbiIsImNhdGNoIiwiY2xlYXJDb21tZW50cyIsIlNFVF9FUlJPUiIsIkNMRUFSX0VSUk9SIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFQTtBQUNPLElBQU1BLG9DQUFjLGFBQXBCO0FBQ0EsSUFBTUMsMENBQWlCLGdCQUF2Qjs7QUFFUCxJQUFNQyxnQkFBZ0IsU0FBaEJBLGFBQWdCLFVBQVc7QUFDN0IsV0FBTztBQUNIQyxjQUFNSCxXQURIO0FBRUhJO0FBRkcsS0FBUDtBQUlILENBTEQ7QUFNQSxJQUFNQyxrQkFBa0IsU0FBbEJBLGVBQWtCLFVBQVc7QUFDL0IsV0FBTztBQUNIRixjQUFNRixjQURIO0FBRUhLO0FBRkcsS0FBUDtBQUlILENBTEQ7O0FBT08sSUFBTUMsa0NBQWEsU0FBYkEsVUFBYSxDQUFDQyxPQUFELEVBQVVDLFNBQVYsRUFBcUJMLE9BQXJCLEVBQThCTSxJQUE5QixFQUEwRDtBQUFBLFFBQXRCQyxJQUFzQix1RUFBZixJQUFJQyxJQUFKLEVBQWU7O0FBQ2hGLFdBQU8sb0JBQVk7QUFDZkMsaUJBQVNDLFlBQVQ7QUFDQUQsaUJBQVNYLGNBQWNFLE9BQWQsQ0FBVDtBQUNBLFlBQU1FLFVBQVU7QUFDWlMsaUJBQUtYLE9BRE87QUFFWlksMEJBQWMsSUFBSUosSUFBSixFQUZGO0FBR1pLLDBCQUFjLElBQUlMLElBQUo7QUFIRixTQUFoQjtBQUtBLGVBQU8sK0JBQVNGLElBQVQsOEJBQXNDRixPQUF0QyxZQUFvREMsU0FBcEQsRUFBaUU7QUFDcEVTLG9CQUFRLE1BRDREO0FBRXBFQyxxQkFBUztBQUNMQyx3QkFBUSxrQkFESDtBQUVMLGdDQUFnQjtBQUZYLGFBRjJEO0FBTXBFQyxrQkFBTUMsS0FBS0MsU0FBTCxDQUFlakIsT0FBZixDQU44RDtBQU9wRWtCLHlCQUFhO0FBUHVELFNBQWpFLEVBU05DLElBVE0sQ0FTRCxnQkFBYztBQUFBLGdCQUFaQyxNQUFZLFFBQVpBLE1BQVk7O0FBQ2hCLGdCQUFJQSxVQUFVLEdBQWQsRUFBbUI7QUFDZmIseUJBQVNjLFNBQVMsK0VBQVQsQ0FBVDtBQUNILGFBRkQsTUFFTztBQUNIZCx5QkFBU2UsWUFBWXBCLE9BQVosRUFBcUJDLFNBQXJCLEVBQWdDQyxJQUFoQyxFQUFzQ0MsSUFBdEMsQ0FBVDtBQUNIO0FBQ0osU0FmTSxDQUFQO0FBZ0JILEtBeEJEO0FBeUJILENBMUJNO0FBMkJBLElBQU1rQix3Q0FBZ0IsU0FBaEJBLGFBQWdCLENBQUNyQixPQUFELEVBQVVDLFNBQVYsRUFBcUJILE9BQXJCLEVBQThCRixPQUE5QixFQUF1Q00sSUFBdkMsRUFBbUU7QUFBQSxRQUF0QkMsSUFBc0IsdUVBQWYsSUFBSUMsSUFBSixFQUFlOztBQUM1RixXQUFPLG9CQUFZO0FBQ2ZDLGlCQUFTQyxZQUFUO0FBQ0EsWUFBTWdCLDBCQUNDeEIsT0FERDtBQUVGUyxpQkFBS1gsT0FGSDtBQUdGYSwwQkFBYyxJQUFJTCxJQUFKO0FBSFosVUFBTjtBQUtBQyxpQkFBU1IsZ0JBQWdCeUIsVUFBaEIsQ0FBVDtBQUNBLGVBQU8sK0JBQVNwQixJQUFULHNCQUE4QkosUUFBUXlCLElBQXRDLEVBQThDO0FBQ2pEYixvQkFBUSxLQUR5QztBQUVqREMscUJBQVM7QUFDTEMsd0JBQVEsa0JBREg7QUFFTCxnQ0FBZ0I7QUFGWCxhQUZ3QztBQU1qREMsa0JBQU1DLEtBQUtDLFNBQUwsQ0FBZU8sVUFBZixDQU4yQztBQU9qRE4seUJBQWE7QUFQb0MsU0FBOUMsRUFTTkMsSUFUTSxDQVNELGlCQUFjO0FBQUEsZ0JBQVpDLE1BQVksU0FBWkEsTUFBWTs7QUFDaEIsZ0JBQUlBLFVBQVUsR0FBZCxFQUFtQjtBQUNmYix5QkFBU2MsU0FBUyxpRkFBVCxDQUFUO0FBQ0gsYUFGRCxNQUVPO0FBQ0hkLHlCQUFTZSxZQUFZcEIsT0FBWixFQUFxQkMsU0FBckIsRUFBZ0NDLElBQWhDLEVBQXNDQyxJQUF0QyxDQUFUO0FBQ0g7QUFDSixTQWZNLENBQVA7QUFnQkgsS0F4QkQ7QUF5QkgsQ0ExQk07O0FBNEJQO0FBQ08sSUFBTXFCLDhDQUFtQixrQkFBekI7QUFDQSxJQUFNQyw4Q0FBbUIsa0JBQXpCO0FBQ0EsSUFBTUMsMENBQWlCLGdCQUF2Qjs7QUFFUCxJQUFNQyxrQkFBa0IsU0FBbEJBLGVBQWtCLEdBQU07QUFDMUIsV0FBTztBQUNIaEMsY0FBTTZCO0FBREgsS0FBUDtBQUdILENBSkQ7QUFLQSxJQUFNSSxrQkFBa0IsU0FBbEJBLGVBQWtCLENBQUNDLFFBQUQsRUFBV0MsVUFBWCxFQUEwQjtBQUM5QyxXQUFPO0FBQ0huQyxjQUFNOEIsZ0JBREg7QUFFSEksMEJBRkc7QUFHSEM7QUFIRyxLQUFQO0FBS0gsQ0FORDtBQU9PLElBQU1WLG9DQUFjLFNBQWRBLFdBQWMsQ0FBQ3BCLE9BQUQsRUFBVUMsU0FBVixFQUFxQkMsSUFBckIsRUFBaUQ7QUFBQSxRQUF0QkMsSUFBc0IsdUVBQWYsSUFBSUMsSUFBSixFQUFlOztBQUN4RSxXQUFPLG9CQUFZO0FBQ2ZDLGlCQUFTQyxZQUFUO0FBQ0FELGlCQUFTc0IsaUJBQVQ7QUFDQSxlQUFPLCtCQUFTekIsSUFBVCw4QkFBc0NGLE9BQXRDLFlBQW9EQyxTQUFwRCxFQUFpRSxFQUFDZSxhQUFhLFNBQWQsRUFBakUsRUFDTkMsSUFETSxDQUNEO0FBQUEsbUJBQVljLFNBQVNDLElBQVQsRUFBWjtBQUFBLFNBREMsRUFFTmYsSUFGTSxDQUVEO0FBQUEsbUJBQVlaLFNBQVN1QixnQkFBZ0JDLFFBQWhCLEVBQTBCMUIsSUFBMUIsQ0FBVCxDQUFaO0FBQUEsU0FGQyxFQUdOOEIsS0FITSxDQUdBO0FBQUEsbUJBQU01QixTQUFTYyxTQUFTLGlGQUFULENBQVQsQ0FBTjtBQUFBLFNBSEEsQ0FBUDtBQUlILEtBUEQ7QUFRSCxDQVRNO0FBVUEsSUFBTWUsd0NBQWdCLFNBQWhCQSxhQUFnQjtBQUFBLFdBQU87QUFDaEN2QyxjQUFNK0I7QUFEMEIsS0FBUDtBQUFBLENBQXRCOztBQUlQOztBQUVPLElBQU1TLGdDQUFZLFdBQWxCO0FBQ0EsSUFBTUMsb0NBQWMsYUFBcEI7O0FBRVAsSUFBTWpCLFdBQVcsU0FBWEEsUUFBVyxRQUFTO0FBQ3RCLFdBQU87QUFDSHhCLGNBQU13QyxTQURIO0FBRUhFO0FBRkcsS0FBUDtBQUlILENBTEQ7O0FBT0EsSUFBTS9CLGFBQWEsU0FBYkEsVUFBYSxHQUFNO0FBQ3JCLFdBQU87QUFDSFgsY0FBTXlDO0FBREgsS0FBUDtBQUdILENBSkQiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZmV0Y2ggZnJvbSAnaXNvbW9ycGhpYy1mZXRjaCc7XHJcblxyXG4vLyBTaW5nbGUgY29tbWVudCBhY3Rpb25zXHJcbmV4cG9ydCBjb25zdCBBRERfQ09NTUVOVCA9ICdBRERfQ09NTUVOVCc7XHJcbmV4cG9ydCBjb25zdCBVUERBVEVfQ09NTUVOVCA9ICdVUERBVEVfQ09NTUVOVCc7XHJcblxyXG5jb25zdCBjb21tZW50QWRkaW5nID0gbWVzc2FnZSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHR5cGU6IEFERF9DT01NRU5ULFxyXG4gICAgICAgIG1lc3NhZ2VcclxuICAgIH1cclxufVxyXG5jb25zdCBjb21tZW50VXBkYXRpbmcgPSBjb21tZW50ID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdHlwZTogVVBEQVRFX0NPTU1FTlQsXHJcbiAgICAgICAgY29tbWVudFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgYWRkQ29tbWVudCA9IChjb25jZXB0LCBjb25jZXB0SWQsIG1lc3NhZ2UsIGhvc3QsIGRhdGUgPSBuZXcgRGF0ZSgpKSA9PiB7XHJcbiAgICByZXR1cm4gZGlzcGF0Y2ggPT4ge1xyXG4gICAgICAgIGRpc3BhdGNoKGNsZWFyRXJyb3IoKSk7XHJcbiAgICAgICAgZGlzcGF0Y2goY29tbWVudEFkZGluZyhtZXNzYWdlKSk7XHJcbiAgICAgICAgY29uc3QgY29tbWVudCA9IHtcclxuICAgICAgICAgICAgbXNnOiBtZXNzYWdlLFxyXG4gICAgICAgICAgICBjcmVhdGlvbkRhdGU6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgIGxhc3RNb2RpZmllZDogbmV3IERhdGUoKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmV0Y2goYCR7aG9zdH0vYXBpL2NvbW1lbnRzP2NvbmNlcHQ9JHtjb25jZXB0fSZpZD0ke2NvbmNlcHRJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY29tbWVudCksXHJcbiAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKCh7c3RhdHVzfSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc3RhdHVzID49IDQwMCkge1xyXG4gICAgICAgICAgICAgICAgZGlzcGF0Y2goc2V0RXJyb3IoJ1RoZXJlIHdhcyBhIHByb2JsZW0gYWRkaW5nIHlvdXIgY29tbWVudC4gVGhlIGJhY2tlbmQgZGlkIG5vdCByZXBseSBjb3JyZWN0bHkuJykpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGlzcGF0Y2goZ2V0Q29tbWVudHMoY29uY2VwdCwgY29uY2VwdElkLCBob3N0LCBkYXRlKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY29uc3QgdXBkYXRlQ29tbWVudCA9IChjb25jZXB0LCBjb25jZXB0SWQsIGNvbW1lbnQsIG1lc3NhZ2UsIGhvc3QsIGRhdGUgPSBuZXcgRGF0ZSgpKSA9PiB7XHJcbiAgICByZXR1cm4gZGlzcGF0Y2ggPT4ge1xyXG4gICAgICAgIGRpc3BhdGNoKGNsZWFyRXJyb3IoKSk7XHJcbiAgICAgICAgY29uc3QgbmV3Q29tbWVudCA9IHtcclxuICAgICAgICAgICAgLi4uY29tbWVudCxcclxuICAgICAgICAgICAgbXNnOiBtZXNzYWdlLFxyXG4gICAgICAgICAgICBsYXN0TW9kaWZpZWQ6IG5ldyBEYXRlKClcclxuICAgICAgICB9XHJcbiAgICAgICAgZGlzcGF0Y2goY29tbWVudFVwZGF0aW5nKG5ld0NvbW1lbnQpKTtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYCR7aG9zdH0vYXBpL2NvbW1lbnRzLyR7Y29tbWVudC51dWlkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld0NvbW1lbnQpLFxyXG4gICAgICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigoe3N0YXR1c30pID0+IHtcclxuICAgICAgICAgICAgaWYgKHN0YXR1cyA+PSA0MDApIHtcclxuICAgICAgICAgICAgICAgIGRpc3BhdGNoKHNldEVycm9yKCdUaGVyZSB3YXMgYSBwcm9ibGVtIHVwZGF0aW5nIHlvdXIgY29tbWVudC4gVGhlIGJhY2tlbmQgZGlkIG5vdCByZXBseSBjb3JyZWN0bHkuJykpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGlzcGF0Y2goZ2V0Q29tbWVudHMoY29uY2VwdCwgY29uY2VwdElkLCBob3N0LCBkYXRlKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gTXVsdGlwbGUgY29tbWVudHMgYWN0aW9uc1xyXG5leHBvcnQgY29uc3QgUkVRVUVTVF9DT01NRU5UUyA9ICdSRVFVRVNUX0NPTU1FTlRTJztcclxuZXhwb3J0IGNvbnN0IFJFQ0VJVkVfQ09NTUVOVFMgPSAnUkVDRUlWRV9DT01NRU5UUyc7XHJcbmV4cG9ydCBjb25zdCBDTEVBUl9DT01NRU5UUyA9ICdDTEVBUl9DT01NRU5UUyc7XHJcblxyXG5jb25zdCByZXF1ZXN0Q29tbWVudHMgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHR5cGU6IFJFUVVFU1RfQ09NTUVOVFNcclxuICAgIH1cclxufVxyXG5jb25zdCByZWNlaXZlQ29tbWVudHMgPSAoY29tbWVudHMsIGxhc3RVcGRhdGUpID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdHlwZTogUkVDRUlWRV9DT01NRU5UUyxcclxuICAgICAgICBjb21tZW50cyxcclxuICAgICAgICBsYXN0VXBkYXRlXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNvbnN0IGdldENvbW1lbnRzID0gKGNvbmNlcHQsIGNvbmNlcHRJZCwgaG9zdCwgZGF0ZSA9IG5ldyBEYXRlKCkpID0+IHtcclxuICAgIHJldHVybiBkaXNwYXRjaCA9PiB7XHJcbiAgICAgICAgZGlzcGF0Y2goY2xlYXJFcnJvcigpKTtcclxuICAgICAgICBkaXNwYXRjaChyZXF1ZXN0Q29tbWVudHMoKSk7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2hvc3R9L2FwaS9jb21tZW50cz9jb25jZXB0PSR7Y29uY2VwdH0maWQ9JHtjb25jZXB0SWR9YCwge2NyZWRlbnRpYWxzOiAnaW5jbHVkZSd9KVxyXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAudGhlbihjb21tZW50cyA9PiBkaXNwYXRjaChyZWNlaXZlQ29tbWVudHMoY29tbWVudHMsIGRhdGUpKSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4gZGlzcGF0Y2goc2V0RXJyb3IoJ1RoZXJlIHdhcyBhIHByb2JsZW0gZmV0Y2hpbmcgdGhlIGNvbW1lbnRzLiBUaGUgYmFja2VuZCBkaWQgbm90IHJlcGx5IGNvcnJlY3RseS4nKSkpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjb25zdCBjbGVhckNvbW1lbnRzID0gKCkgPT4gKHtcclxuICAgIHR5cGU6IENMRUFSX0NPTU1FTlRTXHJcbn0pO1xyXG5cclxuLy8gRXJyb3IgaGFuZGxpbmdcclxuXHJcbmV4cG9ydCBjb25zdCBTRVRfRVJST1IgPSAnU0VUX0VSUk9SJztcclxuZXhwb3J0IGNvbnN0IENMRUFSX0VSUk9SID0gJ0NMRUFSX0VSUk9SJztcclxuXHJcbmNvbnN0IHNldEVycm9yID0gZXJyb3IgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBTRVRfRVJST1IsXHJcbiAgICAgICAgZXJyb3JcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgY2xlYXJFcnJvciA9ICgpID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdHlwZTogQ0xFQVJfRVJST1JcclxuICAgIH1cclxufVxyXG4iXX0=