//Update store for QuestionAnswer
import {
    createAction,
    createReducer,
} from '@reduxjs/toolkit'
import {QuestionAnswerTypeList} from "../Components/QuestionAnswer/QuestionAnswerType";
import {fetchQuestionAnswer} from "../Components/QuestionAnswer/QuestionAnswerThunk";

const initialState : QuestionAnswerTypeList = []

export const questionAnswerReducer = createReducer(
    initialState,
    (builder) => {
        builder
            //thunk action fulfilled for QuestionAnswer, update
            .addCase(fetchQuestionAnswer.fulfilled, (state, action) => {
                state = action.payload
                return state;
            })
    }
)