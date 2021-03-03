import {QuestionAnswerTypeList} from "./QuestionAnswerType";
import {ValueType} from "./ValueType";
import {TagsTypeList} from "./TagsType";

export interface StoreProps {
    tags: TagsTypeList
    questionAnswers: QuestionAnswerTypeList
    values: ValueType
}
