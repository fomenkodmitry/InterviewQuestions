import { createAsyncThunk } from '@reduxjs/toolkit'
import {BASE_URL} from "../Const/Const";
import {TagsTypeList} from "../Type/TagsType";
//просто запрос асинхронный
export const fetchTagsThunk = createAsyncThunk(
    'Tags',
    async () => {
        const response = await fetch(`${BASE_URL}/Tag`)
        return (await response.json()) as TagsTypeList
    }
)