import fetch from 'cross-fetch'
import moment from 'moment'
import { generateHeaders, handleErrors } from '../helpers'
import AppConfig from '../App.config'

export default {
    getData: () => fetch(`${AppConfig.server}/weather`, { headers: generateHeaders() }).then(handleErrors),
    transformResponse: (response) => {
        if (response.forecast) {
            return response.forecast.simpleforecast.forecastday.map(cast => ({
                date: moment(cast.date.epoch * 1000).format('dddd'),
                high: cast.high.celsius,
                low: cast.low.celsius,
                condition: cast.conditions,
                icon: cast.icon_url.replace('http://', 'https://'),
                wind: cast.avewind.kph
            }))
        }
        return [{ status: response.status, msg: response.error }]
    }
}
