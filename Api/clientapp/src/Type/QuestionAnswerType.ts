//типы
export interface QuestionAnswerType {
    id: string
    question: string
    answer: string
    tagIds: string[]
}

export type QuestionAnswerTypeList = QuestionAnswerType[]


export interface QuestionCreateType
{
    question: string
    answer: string
    tagIds: string[]
}

export interface QuestionFilterType
{
    tagIds?: string[]
    searchText?: string
}