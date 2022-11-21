import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider} from "@material-ui/core";
import { createTheme } from '@material-ui/core/styles';
import {pink} from "@material-ui/core/colors";
import AppWithReducer from "./AppWithReducer";
import {Provider} from "react-redux";
import {store} from "./store/store";
import AppWithRedux from "./AppWithRedux";


const theme = createTheme({
    palette: {
        primary: {
            main: pink["A700"],
        },
        secondary: {
            main: '#ff4081',
        },
        error: {
            main: '#f44336'
        },
        type: "dark"
    }
})

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <AppWithRedux/>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
