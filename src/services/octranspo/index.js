
import credentials from '../../credentials'
import moment from 'moment'


const aggregateTrips = (Trips = []) => {
    if (!(Trips instanceof Array)) {
        Trips = [Trips]
    }
    return Trips.map(trip => {
        return {
            dest: trip.TripDestination,
            time: moment(moment(Date.now()).add(trip.AdjustedScheduleTime, 'm')).format('LT')
        }
    })
}
export default {
    getData: () => {

        return Promise.all([5813, 3062].map(stopNo => {
            return fetch(`http://localhost:8000/transpo?stopNo=${stopNo}`).then(
                response => {if (response.ok) { return response.json()}},
                error => {console.error(error); return error }
              )

        }))

    },
    transformResponse: (responses) => {
        const routearrays = responses.map((response) => {
            const routesinStops = response.GetRouteSummaryForStopResult.Routes.Route.filter((route) => route.RouteNo !== 750);
            return routesinStops.map((route) => {
                return {
                    routeNo: route.RouteNo,
                    heading: route.Direction,
                    trips: aggregateTrips(route.Trips)
                }
            })
        })
        return [].concat.apply([], routearrays)
    }
}
