//Update store for Quest.Ans.
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
            .addCase(fetchQuestionAnswer.fulfilled, (state, action) => {
                state = action.payload
                return state;
            })
    }
)