//типы
import {ProgrammingLanguageTypeList} from "./ProgrammingLanguageType";

export interface QuestionAnswerType {
    id: string
    question: string
    answer: string
    programmingLanguageId: string
}

export type QuestionAnswerTypeList = QuestionAnswerType[]

export interface QuestionAnswerListProps {
    programmingLanguages?: ProgrammingLanguageTypeList
    questionAnswers?: QuestionAnswerTypeList
}