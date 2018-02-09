import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux'
import configureStore from './configureStore'

import 'typeface-roboto';
import './index.css';


const theme = createMuiTheme();

let store = configureStore({cards: {}})

const wrapper = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
                <App />
            </Provider>,
        </MuiThemeProvider>
    )
}

ReactDOM.render(wrapper(), document.getElementById('root'));
registerServiceWorker();
