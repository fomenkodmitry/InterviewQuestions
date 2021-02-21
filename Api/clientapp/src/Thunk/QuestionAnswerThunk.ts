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
        if(obj?.paging?.pageNumber) {
            stringArray.push(`paging.pageNumber=${obj.paging.pageNumber}`)
        }
        if(obj?.paging?.pageSize) {
            stringArray.push(`paging.pageSize=${obj.paging.pageSize}`)
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


