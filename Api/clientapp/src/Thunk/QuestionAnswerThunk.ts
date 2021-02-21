import { createAsyncThunk } from '@reduxjs/toolkit'
import {QuestionAnswerTypeList, QuestionFilterType} from "../Type/QuestionAnswerType";
import {BASE_URL} from "../Const/Const";
//просто запрос асинхронный

const serialize = function(obj? : QuestionFilterType) {
    let stringArray : string[] = []
    if(obj?.tagIds) {
        obj.tagIds.forEach(item => stringArray.push(`tagIds=${item}`))
    }
    if(obj?.searchText) {
        stringArray.push(`searchText=${obj.searchText}`)        
    }
    if(obj?.paging) {
        if(obj?.paging?.itemsCount) {
            stringArray.push(`paging.itemsCount=${obj.paging.itemsCount}`)
        }
        if(obj?.paging?.pagesCount) {
            stringArray.push(`paging.pagesCount=${obj.paging.pagesCount}`)
        }
    }
    return stringArray.join("&")
}

export const fetchQuestionAnswerThunk = createAsyncThunk(
    'QuestionAnswer',
    async (filter? : QuestionFilterType) => {
        const response = await fetch(`${BASE_URL}/QuestionAnswer?${serialize(filter)}`)
        return (await response.json()) as QuestionAnswerTypeList
    }
)
