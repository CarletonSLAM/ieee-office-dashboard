import fetch from 'cross-fetch'
import moment from 'moment'
import { handleErrors } from '../helpers'
import AppConfig from '../App.config'

const API_LOCATION = 'Ottawa,ca'
const UNITS = 'metric'
export default {
    getAuth: async (access_token) => {
        const response = await fetch(`${AppConfig.serverURL}/api/credentials/openweathermap/`, { headers: { Authorization: `Bearer ${access_token}` } })
        const {token} = await handleErrors(response)
        return token
    },
    getData: async (token) => {
        const params = new URLSearchParams({ appid: token, q: API_LOCATION, units: UNITS })
        const response = await fetch('https://api.openweathermap.org/data/2.5/forecast?' + params)
        const data = await handleErrors(response)
        return data
    },
    transformResponse: (response) => {
        if (response.list) {
            return response.list.map(forecast => ({
                date: moment(forecast.dt * 1000).format('dddd'),
                low: Math.round(forecast.main.temp_min),
                high: Math.round(forecast.main.temp_max),
                condition: forecast.weather[0].main,
                icon: `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`,
                wind: Math.round(forecast.wind.speed)
            }))
        }
        return [{ status: response.status, msg: response.error }]
    }
}
