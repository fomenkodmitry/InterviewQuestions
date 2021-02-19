import { createAsyncThunk } from '@reduxjs/toolkit'
import {QuestionAnswerTypeList, QuestionFilterType} from "../Type/QuestionAnswerType";
//просто запрос асинхронный
export const fetchQuestionAnswerThunk = createAsyncThunk(
    'QuestionAnswer',
    async (filter? : QuestionFilterType) => {

        const serialize = function(obj? : QuestionFilterType) {
            if(obj == undefined)
                return "";
            
            const searchParams = new URLSearchParams();
            Object.keys(obj).forEach(key => {
                // @ts-ignore
                if(obj[key] != undefined)
                {
                    console.log(obj)
                    // @ts-ignore
                    searchParams.append(key, obj[key])
                }
            })
            return searchParams.toString()
        }
        
        const response = await fetch(`https://localhost:5001/api/QuestionAnswer?${serialize(filter)}`)
        return (await response.json()) as QuestionAnswerTypeList
    }
)
