import React from 'react'
import withStyles from 'react-jss'
import { card, flexAlign } from '../../../styles'


const styles = {
    root: {
        textAlign: 'center',
        margin: '1vh',
        padding: '1vh',
        display: 'flex',
        height: '9.5vh',
        flexDirection: 'row',
        ...card
    },
    leftSection: {
        flex: '1 25%',
        display: 'flex',
        flexDirection: 'column',
        ...flexAlign.centerHorVert
    },
    rightSection: {
        flex: '1 75%',
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'center',
        ...flexAlign.centerHorVert
    },
    routeNumber: {
        flex: '1 60%',
        fontSize: '5em',
        fontWeight: 'bold',
        color: '#b70101'
    },
    routeHeading: {
        flex: '1 40%',
        color: '#444',
        fontSize: '2em',
        fontWeight: 'bold'
    },
    trip: {
        flex: '1 33%',
        flexDirection: 'column'
    },
    tripTime: {
        flex: '1 50%',
        color: '#000',
        fontSize: '3em',
        fontWeight: 'bold',
        marginTop: '0vh'
    },
    tripDest: {
        padding: '0vh 1vh',
        flex: '1 50%',
        color: '#444',
        fontSize: '1.7em',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    tripNone: {
        color: '#444',
        fontSize: '2rem',
        fontWeight: 'bold'

    }
}

const ArrivalsSlide = ({
    classes, routeNo, trips, heading
}) => (
    <div className={classes.root}>
        <div className={classes.leftSection}>
            <div className={classes.routeNumber}>{(routeNo.length > 15) ? `${routeNo.substring(0, 12)}...` : routeNo}</div>
            <div className={classes.routeHeading}>{heading}</div>
        </div>
        <div className={classes.rightSection}>
            {(trips && trips.length)
                ? trips.map(({ dest, time }, ind) => (
                    <div key={`trip-${ind}`} className={classes.trip}>
                        <div className={classes.tripTime}>{ time }</div>
                        <div className={classes.tripDest}>{ (dest.length > 30) ? `${dest.substring(0, 27)}...` : dest }</div>
                    </div>
                ))
                : <div className={classes.tripNone}> No times scheduled </div>
            }
        </div>
    </div>
)

export default withStyles(styles)(ArrivalsSlide)
