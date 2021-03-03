import {createAction} from "@reduxjs/toolkit";

export const setTagIdsAction = createAction<string[]>('value/setTagIds')
export const getTagIdsAction = createAction('value/getTagIds')

export const setSearchTextAction = createAction<string | undefined>('value/setSearchText')
export const getSearchTextAction = createAction('value/getSearchText')

export const setIsAuthAction = createAction<boolean | false>('value/setIsAuth')
export const getIsAuthAction = createAction('value/getIsAuth')
