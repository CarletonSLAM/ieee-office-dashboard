
import credentials from '../../credentials'
import moment from 'moment'
const OCTranspoStops = { otrain: '3062', mackenzie: '5813' }

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

        return Promise.all(Object.values(OCTranspoStops).map(stopNo => {
            return fetch(`http://localhost:8000/transpo?stopNo=${stopNo}`).then(
                response => {if (response.ok) { return response.json()}},
                error => {console.error(error); return error }
              )

        }))

    },
    transformResponse: (responses) => {
        console.log(responses);
        const routearrays = responses.map((response) => {
            let stop = response.GetRouteSummaryForStopResult
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
            const routesinStops = stop.Routes.Route.filter((route) => route.RouteNo !== 750);
            return routesinStops.map((route) => {
                return {
                    routeNo: route.RouteNo,
                    heading: route.RouteHeading,
                    trips: aggregateTrips(route.Trips)
                }
            })
        })
        return [].concat.apply([], routearrays)
    }
}
