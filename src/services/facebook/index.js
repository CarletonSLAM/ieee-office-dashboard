/* global atob */

import moment from 'moment'
import fetch from 'cross-fetch'
import AppConfig from '../../App.config'
import { generateHeaders, handleErrors } from '../helpers'

const postLimit = 10
const postFields = 'id,message,story, caption,description,name, full_picture, created_time'
export default {
    getData: () => fetch(`${AppConfig.server}/facebook`, { headers: generateHeaders() })
        .then(handleErrors)
        .then((serverResonse) => JSON.parse(atob(serverResonse.data)))
        .then((creds) => fetch(`https://graph.facebook.com/oauth/access_token?client_id=${creds.client}&client_secret=${creds.secret}&grant_type=client_credentials`))
        .then(handleErrors)
        .then(({access_token}) => {
            this.access_token = access_token
            return fetch(`https://graph.facebook.com/v2.9/ieeecarleton/feed?access_token=${access_token}&limit=${postLimit}`)
        })
        .then(handleErrors)
        .then(({ data }) => Promise.all(data.map(post => fetch(`https://graph.facebook.com/v2.9/${post.id}?access_token=${this.access_token}&fields=${postFields}`).then(handleErrors))))
    ,
    transformResponse: response => ((response && response[0] && response[0].id) ?
        response.map(({
            id, story, name, message, full_picture: src, created_time: time
        }) => (
            {
                id, story, name, message, src, time: moment(time).calendar()
            }
        )) : response)
}
