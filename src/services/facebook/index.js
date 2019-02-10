/* global FB atob */

import moment from 'moment'
import fetch from 'cross-fetch'
import AppConfig from '../../App.config'
import { generateHeaders, handleErrors } from '../helpers'

const postLimit = 10
const postFields = 'id,message,story, caption,description,name, full_picture, created_time'
export default {
    getAuth: () => {
        return fetch(`${AppConfig.server}/facebook`, { headers: generateHeaders() })
        .then(handleErrors)
        .then(serverResonse => JSON.parse(atob(serverResonse.data)))
        .then(creds => {
            return new Promise((resolve, reject) => {
                FB.init({
                    appId            : creds.client,
                    autoLogAppEvents : true,
                    xfbml            : true,
                    cookie           : true,
                    version          : 'v3.2'
                });
                FB.getLoginStatus(function(responseLS) {
                    if (responseLS.authResponse) {
                        resolve(responseLS);
                    } else {
                        FB.login(function(response) {
                            if (response.status === 'connected') {
                                resolve(response);
                              // Logged into your app and Facebook.
                            } else {
                                console.error(response);
                                reject(response);
                              // The person is not logged into this app or we are unable to tell.
                            }
                        });
                    }
                });
            })
        })

    },
    getData: () => {
        return new Promise((resolve, reject) => {
            FB.api('/ieeecarleton/feed', {limit: postLimit }, (respfeed) => Array.isArray(respfeed.data) ? resolve(respfeed.data) : reject(respfeed))
        })
        .then(data =>
            Promise.all(
                data.map( post =>
                    new Promise((resolve) =>
                        FB.api(`/${post.id}`, {fields: postFields }, (response) => resolve(response))
                    )
            ))
        )
    },
    transformResponse: response => ((response && response[0] && response[0].id) ?
        response.map(({
            id, story, name, message, full_picture: src, created_time: time
        }) => (
            {
                id, story, name, message, src, time: moment(time).calendar()
            }
        )) : response)
}
