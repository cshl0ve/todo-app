import * as types from '../constants/ActionTypes';
import { combineReducers } from 'redux';

const createList = (filter) => {
    const handleToggle = (state, action) => {
        const { result: toggledId, entities } = action.response;
        const { completed } = entities.todos[toggledId];
        const shouldRemove = (
            (completed && filter === 'active') ||
            (!completed && filter === 'completed')
        );
        return shouldRemove ?
            state.filter(id => id !== toggledId) :
            state;
    }

    const ids = (state = [], action) => {
        switch(action.type) {
            case types.FETCH_TODOS_SUCCESS :
                return filter === action.filter ?
                    action.response.result :
                    state;
            case types.ADD_TODO_SUCCESS :
                return filter !== 'completed' ?
                    [...state, action.response.result] :
                    state;
            case types.TOGGLE_TODO_SUCCESS :
                return handleToggle(state, action);
            default :
                return state;
        }
    };

    const isFetching = (state = false, action) => {
        if(action.filter !== filter) {
            return state;
        }
        switch(action.type) {
            case types.FETCH_TODOS_REQUEST :
                return true;
            case types.FETCH_TODOS_SUCCESS :
            case types.FETCH_TODOS_FAILURE :
                return false;
            default :
                return state;

        }
    };

    const errorMessage = (state = null, action) => {
        if(filter !== action.filter) {
            return state;
        }
        switch(action.type) {
            case types.FETCH_TODOS_FAILURE :
                return action.message;
            case types.FETCH_TODOS_REQUEST :
            case types.FETCH_TODOS_SUCCESS :
                return null;
            default :
                return state;
        }
    } 

    return combineReducers({
        ids,
        isFetching,
        errorMessage
    });
}

export default createList;

export const getIds = (state) => {
    return state.ids;
}

export const getIsFetching = (state) => {
    return state.isFetching;
}

export const getErrorMessage = (state) => {
    return state.errorMessage;
}