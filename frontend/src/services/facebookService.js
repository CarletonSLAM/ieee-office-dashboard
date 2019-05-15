import moment from 'moment'
import fetch from 'cross-fetch'
import AppConfig from '../App.config'
import { handleErrors } from '../helpers'

const postLimit = 10
const postFields = 'id,message,story, caption,description,name, full_picture, created_time'
export default {
    getAuth: async (access_token) => {
        const response = await fetch(`${AppConfig.serverURL}/api/credentials/facebook/`, { headers: { Authorization: `Bearer ${access_token}` } })
        const { token } = await handleErrors(response)
        return token
    },
    getData: async (access_token) => {
        const params = new URLSearchParams({ access_token: access_token, limit: postLimit })
        const response = await fetch('https://graph.facebook.com/v3.2/ieeecarleton/feed?' + params)
        const { data } = await handleErrors(response)
        return await Promise.all(data.map( async post => await fetch(`https://graph.facebook.com/v3.2/${post.id}`, { fields: postFields },)))
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
