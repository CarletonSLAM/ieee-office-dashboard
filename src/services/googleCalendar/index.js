
/* global gapi */

import config from '../../config';
import moment from 'moment';

const calculateEventDuration = (start, end) => {
  if (start.format('l') === end.format('l')) {
    return start.format('dddd, MMM Do[:] h:mm A [-] ') + end.format('h:mm A');
  }

  return start.format('dddd, MMM Do[:] h:mm A [-] ') + end.format('dddd, MMM Do[:] h:mm A');
};

export default {
  getData: () => new Promise(((resolve, reject) => {
    gapi.load('client', () => {
      gapi.client.init(config.google.client).then(() => gapi.client.calendar.events.list({
        calendarId: config.google.calID,
        timeMin: (new Date()).toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime',
      })).then(
        resposne => resolve(resposne.result),
        reason => reject(reason.result.error.message),
      );
    });
  })),
  transformResponse: response => response.items.map(({
    summary, start, end, description, location,
  }) =>
    // debugger;
    ({
      summary,
      duration: calculateEventDuration(moment(start.dateTime), moment(end.dateTime)),
      description,
      location,
    })),
};
