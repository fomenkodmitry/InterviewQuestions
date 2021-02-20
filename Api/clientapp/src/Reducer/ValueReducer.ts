import { createAction, createReducer } from '@reduxjs/toolkit'
import {ValueType} from "../Type/ValueType";

export const changeTagIdsAction = createAction<string[] | undefined>('value/setTagIds')
export const getTagIdsAction = createAction('value/getTagIds')

export const changeSearchTextAction = createAction<string | undefined>('value/setSearchText')
export const getSearchTextAction = createAction('value/getSearchText')

const initialState = {} as ValueType

export const valueReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(changeTagIdsAction, (state, action) => {
            state.tagIds = action.payload
            return state;
        })
        .addCase(getTagIdsAction, (state) => {
            return state
        })
        .addCase(changeSearchTextAction, (state, action) => {
            state.searchText = action.payload
            return state;
        })
        .addCase(getSearchTextAction, (state) => {
            return state
        });
})