//обновляет стор для вопросов
import {createReducer} from '@reduxjs/toolkit'
import {QuestionAnswerTypeList} from "../Components/QuestionAnswer/QuestionAnswerType";
import {fetchQuestionAnswer} from "../Components/QuestionAnswer/QuestionAnswerThunk";

const initialState : QuestionAnswerTypeList = []

export const questionAnswerReducer = createReducer(
    initialState,
    (builder) => {
        builder
            //санки action fulfilled для QuestionAnswer, и обновляет данные
            .addCase(fetchQuestionAnswer.fulfilled, (state, action) => {
                state = action.payload
                return state;
            })
    }
)