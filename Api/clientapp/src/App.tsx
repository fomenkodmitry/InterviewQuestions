import React from 'react';
import './App.css';
import {CssBaseline, Grid} from "@material-ui/core";
//if export default, then not use brackets
import {Provider} from "react-redux";
import {store} from "./Store/Store";
import {Pages} from "./Components/Route/Pages";

function App() {
    return (
        <Provider store={store}>
            <React.Fragment>
                <CssBaseline/>
                <Pages/>
            </React.Fragment>
        </Provider>
    );
}

export default App;
