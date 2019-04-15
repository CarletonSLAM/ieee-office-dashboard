import React, { Component } from 'react'
import withStyles from 'react-jss'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { getDataIfNeeded, setDataStale } from './actions'
import configureStore from './configureStore'


import Grid from './components/Grid'
import { body } from './styles'
import AppConfig from './App.config'

const styles = { body }

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            storeCreated: false,
            store: null
        }
    }

    componentDidMount() {
        configureStore().then(({ persistor, store }) => this.setState({ persistor, store, storeCreated: true }))
    }

    componentWillUnmount() {
        this.intervals.forEach(i => clearInterval(i))
    }

    onDashboardLoad() {
        setTimeout(() => {
            this.intervals = AppConfig.services.map(({ name, timeout }) => {
                this.fetchDatasource(name)
                return setInterval(() => this.fetchDatasource(name), timeout)
            })
        }, 1000)
    }

    fetchDatasource(name) {
        const { store } = this.state
        store.dispatch(setDataStale(name))
        store.dispatch(getDataIfNeeded(name))
    }

    render() {
        const { storeCreated } = this.state
        if (!storeCreated) return null
        return (
            <Provider store={this.state.store}>
                <PersistGate loading={null} persistor={this.state.persistor}>
                    <div className={this.props.classes.body}>
                        <Grid onLoad={this.onDashboardLoad.bind(this)} layout={AppConfig.layout} />
                    </div>
                </PersistGate>
            </Provider>
        )
    }
}

const AppWithStyles = withStyles(styles)(App)
export default (() => <AppWithStyles />)
