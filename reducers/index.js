'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _actions = require('../actions');

var comments = function comments() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];

    switch (action.type) {
        case _actions.RECEIVE_COMMENTS:
            return action.comments;
        case _actions.CLEAR_COMMENTS:
            return [];
        default:
            return state;
    }
};

var isLoading = function isLoading() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var action = arguments[1];

    switch (action.type) {
        case _actions.ADD_COMMENT:
            return true;
        case _actions.UPDATE_COMMENT:
            return true;
        case _actions.REQUEST_COMMENTS:
            return true;
        case _actions.RECEIVE_COMMENTS:
            return false;
        case _actions.SET_ERROR:
            return false;
        default:
            return state;
    }
};

var lastUpdate = function lastUpdate() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
    var action = arguments[1];

    switch (action.type) {
        case _actions.RECEIVE_COMMENTS:
            return action.lastUpdate;
        default:
            return state;
    }
};

var error = function error() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var action = arguments[1];

    switch (action.type) {
        case _actions.SET_ERROR:
            return action.error;
        case _actions.CLEAR_ERROR:
            return null;
        default:
            return state;
    }
};

exports.default = (0, _redux.combineReducers)({
    isLoading: isLoading,
    lastUpdate: lastUpdate,
    comments: comments,
    error: error
});
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImNvbW1lbnRzIiwic3RhdGUiLCJhY3Rpb24iLCJ0eXBlIiwiaXNMb2FkaW5nIiwibGFzdFVwZGF0ZSIsIkRhdGUiLCJlcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBQ0E7O0FBRUEsSUFBTUEsV0FBVyxTQUFYQSxRQUFXLEdBQXdCO0FBQUEsUUFBdkJDLEtBQXVCLHVFQUFmLEVBQWU7QUFBQSxRQUFYQyxNQUFXOztBQUNyQyxZQUFRQSxPQUFPQyxJQUFmO0FBQ0k7QUFDSSxtQkFBT0QsT0FBT0YsUUFBZDtBQUNKO0FBQ0ksbUJBQU8sRUFBUDtBQUNKO0FBQ0ksbUJBQU9DLEtBQVA7QUFOUjtBQVFILENBVEQ7O0FBV0EsSUFBTUcsWUFBWSxTQUFaQSxTQUFZLEdBQTJCO0FBQUEsUUFBMUJILEtBQTBCLHVFQUFsQixLQUFrQjtBQUFBLFFBQVhDLE1BQVc7O0FBQ3pDLFlBQVFBLE9BQU9DLElBQWY7QUFDSTtBQUNJLG1CQUFPLElBQVA7QUFDSjtBQUNJLG1CQUFPLElBQVA7QUFDSjtBQUNJLG1CQUFPLElBQVA7QUFDSjtBQUNJLG1CQUFPLEtBQVA7QUFDSjtBQUNJLG1CQUFPLEtBQVA7QUFDSjtBQUNJLG1CQUFPRixLQUFQO0FBWlI7QUFjSCxDQWZEOztBQWlCQSxJQUFNSSxhQUFhLFNBQWJBLFVBQWEsR0FBZ0M7QUFBQSxRQUEvQkosS0FBK0IsdUVBQXZCLElBQUlLLElBQUosRUFBdUI7QUFBQSxRQUFYSixNQUFXOztBQUMvQyxZQUFPQSxPQUFPQyxJQUFkO0FBQ0k7QUFDSSxtQkFBT0QsT0FBT0csVUFBZDtBQUNKO0FBQ0ksbUJBQU9KLEtBQVA7QUFKUjtBQU1ILENBUEQ7O0FBU0EsSUFBTU0sUUFBUSxTQUFSQSxLQUFRLEdBQTBCO0FBQUEsUUFBekJOLEtBQXlCLHVFQUFqQixJQUFpQjtBQUFBLFFBQVhDLE1BQVc7O0FBQ3BDLFlBQVFBLE9BQU9DLElBQWY7QUFDSTtBQUNJLG1CQUFPRCxPQUFPSyxLQUFkO0FBQ0o7QUFDSSxtQkFBTyxJQUFQO0FBQ0o7QUFDSSxtQkFBT04sS0FBUDtBQU5SO0FBUUgsQ0FURDs7a0JBV2UsNEJBQWdCO0FBQzNCRyx3QkFEMkI7QUFFM0JDLDBCQUYyQjtBQUczQkwsc0JBSDJCO0FBSTNCTztBQUoyQixDQUFoQixDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtjb21iaW5lUmVkdWNlcnN9IGZyb20gJ3JlZHV4JztcclxuaW1wb3J0IHtBRERfQ09NTUVOVCwgVVBEQVRFX0NPTU1FTlQsIFJFQ0VJVkVfQ09NTUVOVFMsIFJFUVVFU1RfQ09NTUVOVFMsIENMRUFSX0NPTU1FTlRTLCBTRVRfRVJST1IsIENMRUFSX0VSUk9SfSBmcm9tICcuLi9hY3Rpb25zJztcclxuXHJcbmNvbnN0IGNvbW1lbnRzID0gKHN0YXRlID0gW10sIGFjdGlvbikgPT4ge1xyXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgICAgIGNhc2UgUkVDRUlWRV9DT01NRU5UUzpcclxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbi5jb21tZW50cztcclxuICAgICAgICBjYXNlIENMRUFSX0NPTU1FTlRTOlxyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBpc0xvYWRpbmcgPSAoc3RhdGUgPSBmYWxzZSwgYWN0aW9uKSA9PiB7XHJcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSBBRERfQ09NTUVOVDpcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgY2FzZSBVUERBVEVfQ09NTUVOVDpcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgY2FzZSBSRVFVRVNUX0NPTU1FTlRTOlxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBjYXNlIFJFQ0VJVkVfQ09NTUVOVFM6XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICBjYXNlIFNFVF9FUlJPUjpcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbGFzdFVwZGF0ZSA9IChzdGF0ZSA9IG5ldyBEYXRlKCksIGFjdGlvbikgPT4ge1xyXG4gICAgc3dpdGNoKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSBSRUNFSVZFX0NPTU1FTlRTOlxyXG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uLmxhc3RVcGRhdGU7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBlcnJvciA9IChzdGF0ZSA9IG51bGwsIGFjdGlvbikgPT4ge1xyXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgICAgIGNhc2UgU0VUX0VSUk9SOlxyXG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uLmVycm9yO1xyXG4gICAgICAgIGNhc2UgQ0xFQVJfRVJST1I6XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29tYmluZVJlZHVjZXJzKHtcclxuICAgIGlzTG9hZGluZyxcclxuICAgIGxhc3RVcGRhdGUsXHJcbiAgICBjb21tZW50cyxcclxuICAgIGVycm9yXHJcbn0pO1xyXG4iXX0=