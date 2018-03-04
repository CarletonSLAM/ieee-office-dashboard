import fetch from 'cross-fetch'
import moment from 'moment'

const OCTranspoStops = { otrain: '3062', mackenzie: '5813' }

const aggregateTrips = (trips = []) => {
    const tripAggregate = !(trips instanceof Array) ? [trips] : trips
    return tripAggregate.map(trip => ({
        dest: trip.TripDestination,
        time: moment(moment(Date.now()).add(trip.AdjustedScheduleTime, 'm')).format('LT')
    }))
}
export default {
    getData: () => Promise.all(Object.values(OCTranspoStops).map(stopNo => fetch(`http://localhost:8000/transpo?stopNo=${stopNo}`).then(
        response => response.json(),
        error => error,
    ))),
    transformResponse: (responses) => {
        const routearrays = responses.map((response) => {
            const stop = response.GetRouteSummaryForStopResult
            if (stop.StopNo === OCTranspoStops.otrain) {
                stop.Routes.Route = stop.Routes.Route || [
                    {
                        RouteHeading: 'Northbound',
                        RouteNo: 2,
                        Trips: []
                    },
                    {
                        RouteHeading: 'Southbound',
                        RouteNo: 2,
                        Trips: []
                    }
                ]
            }
            const routesinStops = stop.Routes.Route.filter(route => route.RouteNo !== 750)
            return routesinStops.map(route => ({
                routeNo: route.RouteNo === 2 ? 'OT' : route.RouteNo,
                heading: route.RouteHeading,
                trips: aggregateTrips(route.Trips)
            }))
        })
        return routearrays.reduce((acc, e) => acc.concat(e), [])
    }
}
