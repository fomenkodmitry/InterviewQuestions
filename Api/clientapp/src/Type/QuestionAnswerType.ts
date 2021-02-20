//типы
export interface QuestionAnswerType {
    id: string
    question: string
    answer: string
    tagsId: string[]
}

export type QuestionAnswerTypeList = QuestionAnswerType[]


export interface QuestionCreateType
{
    question: string
    answer: string
    tagsId: string[]
}

export interface QuestionFilterType
{
    tagsId?: string[]
    searchText?: string
}