import React, { Component } from 'react'
import withStyles from 'react-jss'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { performLogin, getDataIfNeeded, setDataStale } from './actions'
import configureStore from './configureStore'


import Grid from './components/Grid'
import Login from './components/Login'
import { body } from './styles'
import AppConfig from './App.config'

const styles = { body }

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            storeCreated: false,
            store: null,
            persistor: null
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

    userLogin({username, password}) {
        const { store } = this.state
        store.dispatch(performLogin({username, password}))
    }

    render() {
        const { storeCreated, persistor, store } = this.state
        if (!storeCreated) return null
        const { account } =  store.getState()
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    { !account || !account.success ?
                        <Login onSubmit={this.userLogin.bind(this)}/>:
                        <div className={this.props.classes.body}>
                            <Grid onLoad={this.onDashboardLoad.bind(this)} layout={AppConfig.layout} />
                        </div>
                    }
                </PersistGate>
            </Provider>
        )
    }
}

const AppWithStyles = withStyles(styles)(App)
export default (() => <AppWithStyles />)
