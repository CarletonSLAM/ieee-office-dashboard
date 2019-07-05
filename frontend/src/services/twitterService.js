import moment from 'moment'
import fetch from 'cross-fetch'
import AppConfig from '../App.config'
import { handleErrors } from '../helpers'

const TWEET_COUNT = 10
const TWITTER_NAME = 'ieeecu'
export default {
    getAuth: async (access_token) => {
        const response = await fetch(`${AppConfig.serverURL}/api/credentials/twitter/`, { headers: { Authorization: `Bearer ${access_token}` } })
        const { token } = await handleErrors(response)
        const response2 = await fetch(`https://api.twitter.com/oauth2/token?grant_type=client_credentials`, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                Authorization: `Basic ${token}`
            }
        })
        const { access_token } = await handleErrors(response2)
        return access_token
    },
    getData: async (access_token) => {
        const params = new URLSearchParams({ screen_name: TWITTER_NAME, count: TWEET_COUNT })
        const response = await fetch('https://api.twitter.com/1.1/statuses/user_timeline.json?' + params, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        const data = await handleErrors(response)
        console.log("TWITTERRR", data)
        return data
    },
    transformResponse: response => ((response && response[0] && response[0].id)
        ? response.map(({
            id, story, name, message, full_picture: src, created_time: time
        }) => (
                {
                    id, story, name, message, src, time: moment(time).calendar()
                }
            )) : response)
}
