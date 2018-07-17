import React, { Component } from 'react';

import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import withStyles from 'react-jss'

import { getDataIfNeeded, setDataStale } from './actions'
import rootReducer from './reducers'
import Grid from './components/Grid'
import { body } from './styles'
import AppConfig from './App.config'


const styles = { body }

// const loggerMiddleware = createLogger()


const store = createStore(
    rootReducer,
    { cards: {} },
    applyMiddleware(
        thunkMiddleware,
        // Enable for Debug State
        // loggerMiddleware, 
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
        store.dispatch(setDataStale(name))
        store.dispatch(getDataIfNeeded(name))
    }
    componentWillUnmount() {
        this.intervals.forEach( i => clearInterval(i) );
    }
  render() {
    return (
        <Provider store={store}>
          <div  className={this.props.classes.body}>
            <Grid onLoad={this.onDashboardLoad.bind(this)} layout={AppConfig.layout} />
          </div>
      </Provider>
    )
  }
}

const AppWithStyles = withStyles(styles)(App)
export default (() => <AppWithStyles/>);
