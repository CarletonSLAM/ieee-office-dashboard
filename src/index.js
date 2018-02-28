import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import 'typeface-roboto.css';
import './index.css';

const loggerMiddleware = createLogger();


const theme = createMuiTheme();

const store = createStore(
  rootReducer,
  { cards: {} },
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  ),
);

const wrapper = () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(wrapper(), document.getElementById('root'));
registerServiceWorker();
