import { createAsyncThunk } from '@reduxjs/toolkit'
import {ProgrammingLanguageTypeList} from "../Type/ProgrammingLanguageType";
//просто запрос асинхронный
export const fetchProgrammingLanguageThunk = createAsyncThunk(
    'ProgrammingLanguage',
    async () => {
        const response = await fetch(`https://localhost:5001/api/ProgrammingLanguage`)
        return (await response.json()) as ProgrammingLanguageTypeList
    }
)