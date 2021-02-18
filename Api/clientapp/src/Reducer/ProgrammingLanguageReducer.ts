import {createReducer} from '@reduxjs/toolkit'
import {ProgrammingLanguageTypeList} from "../Type/ProgrammingLanguageType";
import {fetchProgrammingLanguageThunk} from "../Thunk/ProgrammingLanguageThunk";

const initialState : ProgrammingLanguageTypeList = []

export const programmingLanguageReducer = createReducer(
    initialState,
    (builder) => {
        builder
            //санки action fulfilled для PL, и обновляет данные
            .addCase(fetchProgrammingLanguageThunk.fulfilled, (state, action) => {
                state = action.payload
                return state;
            })
    }
)