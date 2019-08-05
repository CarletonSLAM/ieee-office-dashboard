import React, { Component } from 'react'
import withStyles from 'react-jss'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './configureStore'


import Window from './components/Window'
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

    render() {
        const { storeCreated, persistor, store } = this.state
        if (!storeCreated) return null
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Window layout={AppConfig.layout} />
                </PersistGate>
            </Provider>
        )
    }
}

const AppWithStyles = withStyles(styles)(App)
export default (() => <AppWithStyles />) // eslint-disable-line
