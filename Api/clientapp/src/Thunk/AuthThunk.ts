import {createAsyncThunk} from '@reduxjs/toolkit'
import {BASE_URL} from "../Const/Const";
import {LoginType, TokenType} from "../Type/AuthType";

export const authThunk = createAsyncThunk(
    'Auth',
    async (data: LoginType, {rejectWithValue}) => {
        const response = await fetch(`${BASE_URL}/Auth/Login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if(response.status != 200) {
            return rejectWithValue(response.status)
        }
        return (await response.json()) as TokenType
    }
)