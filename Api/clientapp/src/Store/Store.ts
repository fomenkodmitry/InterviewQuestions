// create and configure store
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import {useDispatch} from "react-redux";
import {questionAnswerReducer} from "../Reducer/QuestionAnswerReducer";
import { combineReducers } from 'redux'

const reducer = combineReducers({
    questionAnswers: questionAnswerReducer
})

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types