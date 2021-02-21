//обновляет стор для вопросов
import {createAction, createReducer} from '@reduxjs/toolkit'
import {QuestionAnswerTypeList} from "../Type/QuestionAnswerType";
import {fetchQuestionAnswerThunk} from "../Thunk/QuestionAnswerThunk";
import {createQuestionThunk} from "../Thunk/CreateQuestionThunk";


export const questionAnswerClearState = createAction<string | undefined>('fetchQuestionAnswerThunk/clearState')

const initialState : QuestionAnswerTypeList = {paging: {itemsCount: 0, pagesCount: 0, currentPage : 1}, items: []}

export const questionAnswerReducer = createReducer(
    initialState,
    (builder) => {
        builder
            //санки action fulfilled для QuestionAnswer, и обновляет данные
            .addCase(fetchQuestionAnswerThunk.fulfilled, (state, action) => {
                if(state.items.length == 0) {
                    state.items = action.payload.items
                    state.paging = action.payload.paging
                    return state;
                }
                if(state.items.length > 0) {
                    state.paging = action.payload.paging
                    state.items = [...state.items, ...action.payload.items]
                    return state;
                }
            })
            .addCase(createQuestionThunk.fulfilled, (state, action) => {
                state.items.concat(action.payload)
                return state;
            })
            .addCase(questionAnswerClearState, (state, action) => {
                state = initialState
                return state;
            })
    }
)