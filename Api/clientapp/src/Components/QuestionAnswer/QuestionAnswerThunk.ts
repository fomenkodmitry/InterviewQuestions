import { createAsyncThunk } from '@reduxjs/toolkit'
import {QuestionAnswerTypeList} from "./QuestionAnswerType";

export const fetchQuestionAnswer = createAsyncThunk(
    'QuestionAnswer',
    async (programmingLanguage : string) => {
        const response = await fetch(`https://localhost:5001/api/QuestionAnswer?programmingLanguage=${programmingLanguage}`)
        return (await response.json()) as QuestionAnswerTypeList
    }
)