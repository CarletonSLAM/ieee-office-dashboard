import React, { Component } from 'react';

import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles'

import rootReducer from './reducers'
import GridTile from './components/Grid'
import { body } from './styles'


const styles = theme => ({
  body: {
    padding: '1vh',
    height: '98vh',
    overflow: 'none',
    ...body
  }
});

const loggerMiddleware = createLogger()


const theme = createMuiTheme()

const store = createStore(
    rootReducer,
    { cards: {} },
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
    )
)


class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <div  className={this.props.classes.body}>
            <GridTile />
          </div>
      </Provider>
    </MuiThemeProvider>
    )
  }
}

const AppWithStyles = withStyles(styles)(App)
export default (() => <AppWithStyles/>);
