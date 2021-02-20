import {createReducer} from '@reduxjs/toolkit'
import {fetchTagsThunk} from "../Thunk/TagsThunk";
import {TagsTypeList} from "../Type/TagsType";

const initialState : TagsTypeList = []

export const tagReducer = createReducer(
    initialState,
    (builder) => {
        builder
            //санки action fulfilled для PL, и обновляет данные
            .addCase(fetchTagsThunk.fulfilled, (state, action) => {
                state = action.payload
                return state;
            })
    }
)