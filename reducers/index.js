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
        case _actions.UPDATE_COMMENT:
        case _actions.DELETE_COMMENT:
        case _actions.REQUEST_COMMENTS:
            return true;
        case _actions.RECEIVE_COMMENTS:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImNvbW1lbnRzIiwic3RhdGUiLCJhY3Rpb24iLCJ0eXBlIiwiaXNMb2FkaW5nIiwibGFzdFVwZGF0ZSIsIkRhdGUiLCJlcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBQ0E7O0FBRUEsSUFBTUEsV0FBVyxTQUFYQSxRQUFXLEdBQXdCO0FBQUEsUUFBdkJDLEtBQXVCLHVFQUFmLEVBQWU7QUFBQSxRQUFYQyxNQUFXOztBQUNyQyxZQUFRQSxPQUFPQyxJQUFmO0FBQ0k7QUFDSSxtQkFBT0QsT0FBT0YsUUFBZDtBQUNKO0FBQ0ksbUJBQU8sRUFBUDtBQUNKO0FBQ0ksbUJBQU9DLEtBQVA7QUFOUjtBQVFILENBVEQ7O0FBV0EsSUFBTUcsWUFBWSxTQUFaQSxTQUFZLEdBQTJCO0FBQUEsUUFBMUJILEtBQTBCLHVFQUFsQixLQUFrQjtBQUFBLFFBQVhDLE1BQVc7O0FBQ3pDLFlBQVFBLE9BQU9DLElBQWY7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNJLG1CQUFPLElBQVA7QUFDSjtBQUNBO0FBQ0ksbUJBQU8sS0FBUDtBQUNKO0FBQ0ksbUJBQU9GLEtBQVA7QUFWUjtBQVlILENBYkQ7O0FBZUEsSUFBTUksYUFBYSxTQUFiQSxVQUFhLEdBQWdDO0FBQUEsUUFBL0JKLEtBQStCLHVFQUF2QixJQUFJSyxJQUFKLEVBQXVCO0FBQUEsUUFBWEosTUFBVzs7QUFDL0MsWUFBUUEsT0FBT0MsSUFBZjtBQUNJO0FBQ0ksbUJBQU9ELE9BQU9HLFVBQWQ7QUFDSjtBQUNJLG1CQUFPSixLQUFQO0FBSlI7QUFNSCxDQVBEOztBQVNBLElBQU1NLFFBQVEsU0FBUkEsS0FBUSxHQUEwQjtBQUFBLFFBQXpCTixLQUF5Qix1RUFBakIsSUFBaUI7QUFBQSxRQUFYQyxNQUFXOztBQUNwQyxZQUFRQSxPQUFPQyxJQUFmO0FBQ0k7QUFDSSxtQkFBT0QsT0FBT0ssS0FBZDtBQUNKO0FBQ0ksbUJBQU8sSUFBUDtBQUNKO0FBQ0ksbUJBQU9OLEtBQVA7QUFOUjtBQVFILENBVEQ7O2tCQVdlLDRCQUFnQjtBQUMzQkcsd0JBRDJCO0FBRTNCQywwQkFGMkI7QUFHM0JMLHNCQUgyQjtBQUkzQk87QUFKMkIsQ0FBaEIsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycyB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IEFERF9DT01NRU5ULCBVUERBVEVfQ09NTUVOVCwgREVMRVRFX0NPTU1FTlQsIFJFQ0VJVkVfQ09NTUVOVFMsIFJFUVVFU1RfQ09NTUVOVFMsIENMRUFSX0NPTU1FTlRTLCBTRVRfRVJST1IsIENMRUFSX0VSUk9SIH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5cbmNvbnN0IGNvbW1lbnRzID0gKHN0YXRlID0gW10sIGFjdGlvbikgPT4ge1xuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBSRUNFSVZFX0NPTU1FTlRTOlxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbi5jb21tZW50cztcbiAgICAgICAgY2FzZSBDTEVBUl9DT01NRU5UUzpcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59XG5cbmNvbnN0IGlzTG9hZGluZyA9IChzdGF0ZSA9IGZhbHNlLCBhY3Rpb24pID0+IHtcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgQUREX0NPTU1FTlQ6XG4gICAgICAgIGNhc2UgVVBEQVRFX0NPTU1FTlQ6XG4gICAgICAgIGNhc2UgREVMRVRFX0NPTU1FTlQ6XG4gICAgICAgIGNhc2UgUkVRVUVTVF9DT01NRU5UUzpcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBjYXNlIFJFQ0VJVkVfQ09NTUVOVFM6XG4gICAgICAgIGNhc2UgU0VUX0VSUk9SOlxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn1cblxuY29uc3QgbGFzdFVwZGF0ZSA9IChzdGF0ZSA9IG5ldyBEYXRlKCksIGFjdGlvbikgPT4ge1xuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBSRUNFSVZFX0NPTU1FTlRTOlxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbi5sYXN0VXBkYXRlO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn1cblxuY29uc3QgZXJyb3IgPSAoc3RhdGUgPSBudWxsLCBhY3Rpb24pID0+IHtcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgU0VUX0VSUk9SOlxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbi5lcnJvcjtcbiAgICAgICAgY2FzZSBDTEVBUl9FUlJPUjpcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29tYmluZVJlZHVjZXJzKHtcbiAgICBpc0xvYWRpbmcsXG4gICAgbGFzdFVwZGF0ZSxcbiAgICBjb21tZW50cyxcbiAgICBlcnJvclxufSk7XG4iXX0=