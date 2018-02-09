
/* global gapi */

import credentials from '../../credentials'
import moment from 'moment'

const calculateEventDuration = (start, end) =>{

    if(start.format('l') === end.format('l')) {
        return start.format('dddd, MMM Do[:] h:mm A [-] ') + end.format('h:mm A')
    }
    else {
        return start.format('dddd, MMM Do[:] h:mm A [-] ') + end.format('dddd, MMM Do[:] h:mm A')
    }
}

export default {
    getData: () => {
        return new Promise(function (resolve, reject) {
            gapi.load('client', () => {
                gapi.client.init({
                    'apiKey': 'AIzaSyDCEydekH6zpR_LAALHb2QYvLrnoLZ6jIY',
                    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
                  }).then(function() {
                    return gapi.client.calendar.events.list({
                      'calendarId': 'ieee.carleton.ca_0oehshcagcul0e8pe5e9fie70s@group.calendar.google.com',
                      'timeMin': (new Date()).toISOString(),
                      'showDeleted': false,
                      'singleEvents': true,
                      'maxResults': 10,
                      'orderBy': 'startTime'
                  })
                  }).then( resposne => resolve(resposne.result),
                      reason => reject(reason.result.error.message)
                  );
            });
        })
    },
    transformResponse: (response) => {
        return response.items.map(({summary, start, end, description, location}) => {
            // debugger;
            return {
                summary, 
                duration: calculateEventDuration(moment(start.dateTime), moment(end.dateTime)),
                description, 
                location
            }
        })
    }
}
