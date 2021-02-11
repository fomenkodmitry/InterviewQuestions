import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {CssBaseline, Grid} from "@material-ui/core";
//if export default, then not use brackets
import QuestionAnswer from "./Components/QuestionAnswer/QuestionAnswerComponent";
import {Provider} from "react-redux";
import {store} from "./Store/Store";

function App() {
    return (
        <Provider store={store}>
            <React.Fragment>
                <CssBaseline/>
                <Header/>
                <QuestionAnswer/>
            </React.Fragment>
        </Provider>
    );
}

export default App;
