/* global gapi */

import moment from 'moment'
import fetch from 'cross-fetch'
import AppConfig from '../App.config'
import { handleErrors } from '../helpers'

const calculateEventDuration = (start, end) => {
    if (start.format('l') === end.format('l')) {
        return start.format('dddd, MMM Do[:] h:mm A [-] ') + end.format('h:mm A')
    }
    return start.format('dddd, MMM Do[:] h:mm A [-] ') + end.format('dddd, MMM Do[:] h:mm A')
}

export default {
    getAuth: async (access_token) => {
        const response = await fetch(`${AppConfig.DJserver}/api/credentials/google/`, { headers: { Authorization: `Bearer ${access_token}` } })
        const { token } = await handleErrors(response)
        return token
    },
    getData: async (access_token) => {
        try {
            await new Promise((resolve, reject) => gapi.load('client', () => resolve()))
            await gapi.client.setToken(access_token)
            await gapi.client.init({
                apiKey: 'AIzaSyAu0RSHg5eGs6eXLrEz9nwjd07xNMqxogo',
                clientId: '830252654788-m17pr6ci1q9n1cqls761qdte1oqslscl.apps.googleusercontent.com',
                discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
                scope: 'https://www.googleapis.com/auth/drive.metadata.readonly'
            })
            const { result } = await gapi.client.calendar.events.list({
                calendarId: 'ieee.carleton.ca_0oehshcagcul0e8pe5e9fie70s@group.calendar.google.com',
                timeMin: (new Date()).toISOString(),
                showDeleted: false,
                singleEvents: true,
                maxResults: 15,
                orderBy: 'startTime'
            })
            return result

        } catch (err) {
            Promise.reject(err.error)
        }
    },
    transformResponse: response => response.items.map(({
        summary, start, end, description, location
    }) => ({
        summary,
        start: start.dateTime,
        duration: calculateEventDuration(moment(start.dateTime), moment(end.dateTime)),
        description,
        location
    }))
}
