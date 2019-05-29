import fetch from 'cross-fetch'
import AppConfig from '../App.config'
import { handleErrors } from '../helpers'

export default {
    login: async (username, password) => {
        const response = await fetch(`${AppConfig.serverURL}/api/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        const userData = await handleErrors(response)
        return userData
    },
    loginRefresh: async (refresh) => {
        const response = await fetch(`${AppConfig.serverURL}/api/token/refresh/`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({refresh})
        })
        const { access } = await handleErrors(response)
        return access
    }
}
