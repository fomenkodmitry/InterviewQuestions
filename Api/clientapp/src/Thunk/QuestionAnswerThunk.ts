import { createAsyncThunk } from '@reduxjs/toolkit'
import {QuestionAnswerTypeList} from "../Type/QuestionAnswerType";
//просто запрос асинхронный
export const fetchQuestionAnswer = createAsyncThunk(
    'QuestionAnswer',
    async (programmingLanguageId? : string) => {
        let response;
        if(programmingLanguageId) {
             response = await fetch(`https://localhost:5001/api/QuestionAnswer?ProgrammingLanguageId=${programmingLanguageId}`)
        }
        else {
             response = await fetch(`https://localhost:5001/api/QuestionAnswer`)
        }
        return (await response.json()) as QuestionAnswerTypeList
    }
)