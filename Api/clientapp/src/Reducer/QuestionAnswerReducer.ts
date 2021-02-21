//обновляет стор для вопросов
import {createReducer} from '@reduxjs/toolkit'
import {QuestionAnswerTypeList} from "../Type/QuestionAnswerType";
import {fetchQuestionAnswerThunk} from "../Thunk/QuestionAnswerThunk";
import {createQuestionThunk} from "../Thunk/CreateQuestionThunk";

const initialState : QuestionAnswerTypeList = {items: []}

export const questionAnswerReducer = createReducer(
    initialState,
    (builder) => {
        builder
            //санки action fulfilled для QuestionAnswer, и обновляет данные
            .addCase(fetchQuestionAnswerThunk.fulfilled, (state, action) => {
                state = action.payload
                return state;
            })
            .addCase(createQuestionThunk.fulfilled, (state, action) => {
                state.items.concat(action.payload)
                return state;
            })
    }
)