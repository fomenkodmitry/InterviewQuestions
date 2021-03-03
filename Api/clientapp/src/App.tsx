import React from 'react';
import './App.css';
import {CssBaseline, Grid} from "@material-ui/core";
//if export default, then not use brackets
import {Provider} from "react-redux";
import {store} from "./Store/Store";
import {Pages} from "./Components/Route/Pages";
import {SnackbarProvider} from "notistack";
import Header from "./Components/Header/Header";

function App() {
    return (
        <Provider store={store}>
            <SnackbarProvider maxSnack={3}>
                <React.Fragment>
                    <CssBaseline/>
                    <Header/>
                    <Pages/>
                </React.Fragment>
            </SnackbarProvider>
        </Provider>
    );
}

export default App;
