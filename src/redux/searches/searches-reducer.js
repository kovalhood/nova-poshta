import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import actions from './searches-actions';

const items = createReducer([], {
    [actions.addSearch]: (state, action) => [action.payload, ...state],
    [actions.deleteSearchById]: (state, action) => state.filter(search => search.id !== action.payload),
    [actions.deleteSearchByName]: (state, action) => state.filter(search => search.number !== action.payload),
    [actions.deleteAll]: (state, action) => []
})

export default combineReducers({
    items
})