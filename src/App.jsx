import React, { Component } from 'react';

import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles'

import { getDataIfNeeded, setDataStale } from './actions'
import rootReducer from './reducers'
import Grid from './components/Grid'
import { body } from './styles'
import AppConfig from './App.config'


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
    onDashboardLoad() {
        this.intervals = AppConfig.services.map(({name, timeout}) => {
            this.fetchDatasource(name);
            return setInterval( () => this.fetchDatasource(name), timeout);
        });
    }

    fetchDatasource(name) {
        console.log('getting', name);
        store.dispatch(setDataStale(name))
        store.dispatch(getDataIfNeeded(name))
    }
    componentWillUnmount() {
        this.intervals.forEach( i => clearInterval(i) );
    }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <div  className={this.props.classes.body}>
            <Grid onLoad={this.onDashboardLoad.bind(this)} layout={AppConfig.layout} />
          </div>
      </Provider>
    </MuiThemeProvider>
    )
  }
}

const AppWithStyles = withStyles(styles)(App)
export default (() => <AppWithStyles/>);
