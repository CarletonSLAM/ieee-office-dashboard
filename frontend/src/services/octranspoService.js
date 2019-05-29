import fetch from 'cross-fetch'
import moment from 'moment'
import { handleErrors } from '../helpers'
import AppConfig from '../App.config'

// const URL_BASE = 'https://api.octranspo1.com/v1.2/GetNextTripsForStopAllRoutes'
const URL_BASE = `${AppConfig.serverURL}/api/services/octranspo/`

const OCTranspoStops = { otrain: '3062', mackenzie: '5813' }

const aggregateTrips = (trips = []) => {
    const tripAggregate = !(trips instanceof Array) ? [trips] : trips
    return tripAggregate.map(trip => ({
        dest: trip.TripDestination,
        time: moment(moment(Date.now()).add(trip.AdjustedScheduleTime, 'm')).format('LT')
    }))
}
export default {
    getAuth: async (access_token) => {
        return {access_token}
    },
    getData: ({access_token}) => {
        return Promise.all(Object.values(OCTranspoStops).map( async (stopNo) => {
            const response = await fetch(`${URL_BASE}?stop=${stopNo}`,{
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                },
            })
            const json =  await handleErrors(response)
            return json
        }))
    },
    transformResponse: (responses) => {
        const routearrays = responses.map((response) => {
            const stop = response.GetRouteSummaryForStopResult
            if (!stop) return undefined
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
