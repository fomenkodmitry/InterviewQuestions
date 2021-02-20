import { createAsyncThunk } from '@reduxjs/toolkit'
import {ProgrammingLanguageTypeList} from "../Type/ProgrammingLanguageType";
import {BASE_URL} from "../Const/Const";
//просто запрос асинхронный
export const fetchProgrammingLanguageThunk = createAsyncThunk(
    'ProgrammingLanguage',
    async () => {
        const response = await fetch(`${BASE_URL}/ProgrammingLanguage`)
        return (await response.json()) as ProgrammingLanguageTypeList
    }
)