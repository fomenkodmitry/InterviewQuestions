import {Route, Switch} from "react-router-dom";
import {Header} from "../Header/Header";
import QuestionAnswer from "../QuestionAnswer/QuestionAnswerComponent";
import {QuestionCreate} from "../QuestionAnswer/Create/QuestionCreate";
import React from "react";

export function Pages() {
    return (
        <Switch>
            <Route exact path="/">
                <Header/>
                <QuestionAnswer/>
            </Route>
            <Route path="/question-create">
                <Header/>
                <QuestionCreate/>
            </Route>
        </Switch>
    )
}