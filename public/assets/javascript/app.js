$(document).ready(function () {
    database = firebase.database();

    $('#populate').on("click", function listUpcomingEvents() {
        gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        }).then(function (response) {
            var events = response.result.items;
            console.log(events);
            if (events.length > 0) {
                for (i = 0; i < events.length; i++) {
                    var event = events[i];
                    eventId = event.id;
                    /**Taking the ISO 8601 format provided by the calendar API and converting to UNIX for use with weather API */
                    var normalStart = event.start.dateTime;
                    var normalEnd = event.end.dateTime;
                    var eventStartUnix = moment(normalStart).format('x');
                    var eventEndUnix = moment(normalEnd).format('x');
                    database.ref('Users/' + auth + '/events/' + eventId).set({
                        event: event,
                        start: eventStartUnix,
                        end: eventEndUnix,
                        location: event.location,
                        summary: event.summary,
                        lat: 0,
                        lng: 0
                    })
                };
            } else {
                appendPre('No upcoming events found.');
            }
        });
    })});