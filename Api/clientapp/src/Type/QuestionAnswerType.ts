//типы
export interface QuestionAnswerType {
    id: string
    question: string
    answer: string
    programmingLanguageId: string
}

export type QuestionAnswerTypeList = QuestionAnswerType[]


export interface QuestionCreateType
{
    question: string
    answer: string
    programmingLanguageId: string
}

export interface QuestionFilterType
{
    programmingLanguageId?: string
    searchText?: string
}