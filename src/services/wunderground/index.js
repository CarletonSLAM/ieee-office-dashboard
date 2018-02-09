
import credentials from '../../credentials'
import moment from 'moment'
export default {
    getData: () => fetch(`http://api.wunderground.com/api/${credentials.weather}/forecast/q/Canada/Ottawa.json`).then(
        response => {if (response.ok) { return response.json()}},
        error => {console.error(error); return { status: 500, error }}
      ),
    transformResponse: (response) => {
        if(response.forecast) {
            return response.forecast.simpleforecast.forecastday.map((cast, castIndex) => {
                return {
                    date: moment(cast.date.epoch * 1000).format('dddd'),
                    high: cast.high.celsius,
                    low: cast.low.celsius,
                    condition: cast.conditions,
                    icon: cast.icon_url,
                    wind: cast.avewind.kph
                }
            })
        }
        return [{status: response.status, msg: response.error}]
    }
}
