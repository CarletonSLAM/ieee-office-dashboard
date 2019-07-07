import moment from 'moment'
import fetch from 'cross-fetch'
import AppConfig from '../App.config'
import { handleErrors } from '../helpers'

const TWEET_COUNT = 10
const TWITTER_NAME = 'ieeecu'
const SERVICE_URL = `${AppConfig.serverURL}/api/services/twitter/?`
export default {
    getAuth: async (access_token) => {
        return access_token
    },
    getData: async (access_token) => {
        const params = new URLSearchParams({ screen_name: TWITTER_NAME, count: TWEET_COUNT })
        const response = await fetch(SERVICE_URL + params,{
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        })
        const { data } = await handleErrors(response)
        console.log(typeof data)
        return data
    },
    transformResponse: response => (( response && response[0])
        ? response.map(({id, text, created_at: time }) => {
            return {
                id,
                message: text,
                time: moment(time, 'ddd MMM DD HH:mm:ss Z YYYY').calendar(),
            }
        }) : response)
}
