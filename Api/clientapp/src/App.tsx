import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {CssBaseline, Grid} from "@material-ui/core";
import {QuestionAnswer} from "./Components/QuestionAnswer/QuestionAnswer";

function App() {
    return (
        <React.Fragment>
            <CssBaseline />
            <Header/>             
            <QuestionAnswer/>
            
        </React.Fragment>
    );
}

export default App;
