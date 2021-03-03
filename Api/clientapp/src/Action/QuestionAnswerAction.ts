//обнуление стейта с помощью экшена, да-да
import {createAction} from "@reduxjs/toolkit";

export const questionAnswerClearState = createAction('fetchQuestionAnswerThunk/clearState')