import {Route, Switch} from "react-router-dom";
import QuestionCreate from "../QuestionAnswer/Create/QuestionCreate";
import React from "react";
import QuestionAnswer from "../QuestionAnswer/QuestionAnswer";

export function Pages() {
    return (
        <Switch>
            <Route exact path="/">
                <QuestionAnswer/>
            </Route>
            <Route path="/question-create">
                <QuestionCreate/>
            </Route>
        </Switch>
    )
}