import {QuestionAnswerTypeList} from "./QuestionAnswerType";

export interface ProgrammingLanguageType {
    id: string
    name: string
}

export type ProgrammingLanguageTypeList = ProgrammingLanguageType[]

//можно получать уже готовые стейты
export interface ProgrammingLanguageListProps {
    programmingLanguages?: ProgrammingLanguageTypeList
    questionAnswers?: QuestionAnswerTypeList
}