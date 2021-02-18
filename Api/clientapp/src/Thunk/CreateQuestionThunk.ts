import {createAsyncThunk} from '@reduxjs/toolkit'
import {QuestionAnswerType, QuestionCreateType} from "../Type/QuestionAnswerType";
//просто запрос асинхронный
export const createQuestionThunk = createAsyncThunk(
    'CreateQuestion',
    async (data: QuestionCreateType) => {
        const response = await fetch(`https://localhost:5001/api/QuestionAnswer`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return (await response.json()) as QuestionAnswerType
    }
)