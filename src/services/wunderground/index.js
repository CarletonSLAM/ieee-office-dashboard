import fetch from 'cross-fetch'
import moment from 'moment'
import AppConfig from '../../App.config'

export default {
    getData: () => fetch(`${AppConfig.server}/weather`).then(
        response => response.json(),
        error => ({ status: 500, error }),
    ),
    transformResponse: (response) => {
        if (response.forecast) {
            return response.forecast.simpleforecast.forecastday.map(cast => ({
                date: moment(cast.date.epoch * 1000).format('dddd'),
                high: cast.high.celsius,
                low: cast.low.celsius,
                condition: cast.conditions,
                icon: cast.icon_url,
                wind: cast.avewind.kph
            }))
        }
        return [{ status: response.status, msg: response.error }]
    }
}
