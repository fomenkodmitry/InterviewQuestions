//типы
export interface QuestionAnswerType {
    id: string
    question: string
    answer: string
    tagIds: string[]
}

export type QuestionAnswerTypeList = {
    items: QuestionAnswerType[],
    paging: { itemsCount: number, pagesCount: number, currentPage: number}
}


export interface QuestionCreateType {
    question: string
    answer: string
    tagIds: string[]
}

export interface QuestionFilterType {
    tagIds?: string[]
    searchText?: string
    paging?: {
        pageNumber?: number,
        pageSize?: number
    },
}