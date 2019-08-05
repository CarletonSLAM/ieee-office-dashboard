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
        const response = await fetch(`${AppConfig.serverURL}/api/credentials/google/`, {headers: { Authorization: `Bearer ${access_token}` } })
        const { token } = await handleErrors(response)
        return token
    },
    getAuthRefresh: async (access_token) => {
        const response = await fetch(`${AppConfig.serverURL}/api/credentials/google/refresh/`, { method: "post", headers: { Authorization: `Bearer ${access_token}` } })
        const { token } = await handleErrors(response)
        return token
    },
    getData: async (access_token, serviceConfig) => {
        const CAL_ID = serviceConfig.calID || `ieee.carleton.ca_0oehshcagcul0e8pe5e9fie70s@group.calendar.google.com`
        const URL = `https://www.googleapis.com/calendar/v3/calendars/${CAL_ID}/events`
        const params = new URLSearchParams({
            orderBy: 'startTime',
            timeMin: (new Date()).toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: 15,
        })
        const response = await fetch(`${URL}?${params}`,{
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        })
        const json =  await handleErrors(response)
        return json
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
