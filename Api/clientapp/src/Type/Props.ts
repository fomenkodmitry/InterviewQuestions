import {ProgrammingLanguageTypeList} from "./ProgrammingLanguageType";
import {QuestionAnswerTypeList} from "./QuestionAnswerType";
import {ValueType} from "./ValueType";

export interface StoreProps {
    programmingLanguages?: ProgrammingLanguageTypeList
    questionAnswers?: QuestionAnswerTypeList
    values?: ValueType
}
