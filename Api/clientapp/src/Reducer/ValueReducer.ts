import { createAction, createReducer } from '@reduxjs/toolkit'
import {ValueType} from "../Type/ValueType";

export const changeProgrammingLanguageIdAction = createAction<string | undefined>('value/setProgrammingLanguageId')
export const getProgrammingLanguageIdAction = createAction('value/getProgrammingLanguageId')

export const changeSearchTextAction = createAction<string | undefined>('value/setSearchText')
export const getSearchTextAction = createAction('value/getSearchText')

const initialState = {} as ValueType

export const valueReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(changeProgrammingLanguageIdAction, (state, action) => {
            state.programmingLanguageId = action.payload
            return state;
        })
        .addCase(getProgrammingLanguageIdAction, (state) => {
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