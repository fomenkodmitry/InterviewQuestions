import {createAsyncThunk} from '@reduxjs/toolkit'
import {QuestionAnswerType, QuestionCreateType} from "../Type/QuestionAnswerType";
import {BASE_URL} from "../Const/Const";
//просто запрос асинхронный
export const createQuestionThunk = createAsyncThunk(
    'CreateQuestion',
    async (data: QuestionCreateType) => {
        const response = await fetch(`${BASE_URL}/QuestionAnswer`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return (await response.json()) as QuestionAnswerType
    }
)