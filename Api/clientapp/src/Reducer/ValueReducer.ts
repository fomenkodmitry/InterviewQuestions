import { createReducer } from '@reduxjs/toolkit'
import {ValueType} from "../Type/ValueType";
import {
    setIsAuthAction,
    setSearchTextAction,
    setTagIdsAction, getIsAuthAction,
    getSearchTextAction,
    getTagIdsAction
} from "../Action/ValueAction";

const initialState = {
    isAuth: (localStorage.token != null)
} as ValueType

export const valueReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setTagIdsAction, (state, action) => {
            state.tagIds = action.payload
            return state;
        })
        .addCase(setIsAuthAction, (state, action) => {
            state.isAuth = action.payload
            return state;
        })
        .addCase(getIsAuthAction, (state, action) => {
            return state;
        })
        .addCase(getTagIdsAction, (state) => {
            return state
        })
        .addCase(setSearchTextAction, (state, action) => {
            state.searchText = action.payload
            return state;
        })
        .addCase(getSearchTextAction, (state) => {
            return state
        });
})