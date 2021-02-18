import {ProgrammingLanguageTypeList} from "./ProgrammingLanguageType";
import {QuestionAnswerTypeList} from "./QuestionAnswerType";

export interface QuestionAndProgrammingProps {
    programmingLanguages?: ProgrammingLanguageTypeList
    questionAnswers?: QuestionAnswerTypeList
}

export interface ProgrammingLanguageProps {
    programmingLanguages?: ProgrammingLanguageTypeList
}