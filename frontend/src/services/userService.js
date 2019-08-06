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
    },
    convertConfigTimeoutToMS: (toStr) => {
        let timeout = parseInt(toStr.slice(0,toStr.length-1))
        parseInt(toStr.slice(0,toStr.length-1))
        const unit = toStr[toStr.length-1]
        switch(unit) {
        case 'H':
            timeout *= 60 /*eslint-disable-line no-fallthrough */
        case 'M':
            timeout *= 60 /*eslint-disable-line no-fallthrough */
        case 'S':
            timeout *= 1000
            break;
        default:
            console.error('Unknown timeout unit')
        }
        return timeout
    },
    getConfig: async (access) => {
        const response = await fetch(`${AppConfig.serverURL}/api/config/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            },
            method: 'GET',
        })
        const { config } = await handleErrors(response)
        return Object.values(JSON.parse(config))
    }
}
