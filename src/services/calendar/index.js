
/* global gapi */

import moment from 'moment'
import { google } from '../../App.creds'

const calculateEventDuration = (start, end) => {
    if (start.format('l') === end.format('l')) {
        return start.format('dddd, MMM Do[:] h:mm A [-] ') + end.format('h:mm A')
    }
    return start.format('dddd, MMM Do[:] h:mm A [-] ') + end.format('dddd, MMM Do[:] h:mm A')
}

export default {
    getData: () => new Promise(((resolve, reject) => {
        gapi.load('client', () => {
            gapi.client.init(google.client).then(() => gapi.client.calendar.events.list({
                calendarId: google.calID,
                timeMin: (new Date()).toISOString(),
                showDeleted: false,
                singleEvents: true,
                maxResults: 15,
                orderBy: 'startTime'
            })).then(
                res => resolve(res.result),
                res => reject(res.result.error.message),
            )
        })
    })),
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
